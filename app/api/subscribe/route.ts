// app\api\subscribe\route.ts
import { rateLimit } from "@/lib/rateLimiter";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { generateIPHash } from "@/lib/utils";
import { Resend } from "resend";
import { subscribeSchema } from "@/lib/validations/newsletter";
import httpStatus from "http-status";
import SubscribeConfirmationEmail from "@/emails/subscribe-confirmation";
import SubscribeAdminEmail from "@/emails/subscribe-admin";
import { createSubscriber,  getSubscriberByEmail,} from "@/services/subscriber-service";
import loops from "@/lib/loops";
import { createSubscriberNotification } from "@/services/notification-service";

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY environment variable");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const result = subscribeSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid input",
          issues: result.error.issues,
        },
        { status: httpStatus.BAD_REQUEST },
      );
    }

    const { email } = result.data;

    const headersList = headers();
    const ip = (await headersList).get("x-forwarded-for") ?? "unknown";
    const ipHash = await generateIPHash(ip);

    if (!ipHash) {
      return NextResponse.json(
        { error: "Unable to generate IP hash" },
        { status: httpStatus.INTERNAL_SERVER_ERROR },
      );
    }

    // Rate limit: 6 subscribe attempts per hour per IP
    const rateLimitResult = await rateLimit(`subscribe:${ipHash}`, 6, 3600);

    if (!rateLimitResult.success) {
      const resetDate = new Date(rateLimitResult.reset);
      const minutesUntilReset = Math.ceil(
        (resetDate.getTime() - Date.now()) / 60000,
      );

      return NextResponse.json(
        {
          error: `Too many subscription attempts. Please try again in ${minutesUntilReset} minutes.`,
          rateLimited: true,
          reset: rateLimitResult.reset,
        },
        { status: httpStatus.TOO_MANY_REQUESTS },
      );
    }

    // Check if email already exists
    const existingSubscriber = await getSubscriberByEmail(email);

    if (existingSubscriber) {
      if (existingSubscriber?.status === "active") {
        return NextResponse.json(
          { error: "This email is already subscribed to our newsletter." },
          { status: httpStatus.CONFLICT },
        );
      } else {
        // Re-subscribe the user
        // This would be handled by the unsubscribe endpoint
        return NextResponse.json(
          {
            error:
              "This email was previously unsubscribed. Please contact support to resubscribe.",
          },
          { status: httpStatus.CONFLICT },
        );
      }
    }

    // Store subscriber in Redis
    await createSubscriber({
      email,
      ipHash,
      status: "active",
    });

    // Create notification for new subscriber
    try {
      await createSubscriberNotification(email);
    } catch (notificationError) {
      console.error(
        "Failed to create subscriber notification:",
        notificationError,
      );
      // Don't fail the subscription if notification creation fails
    }

    // Send emails
    try {
      await Promise.all([
        // Send confirmation email to the subscriber
        resend.emails.send({
          from: "Aphrodis's Portfolio <admin@aphrodis.online>",
          to: email,
          subject: "Welcome to my newsletter!",
          react: SubscribeConfirmationEmail({ email }),
        }),
        // Send notification to admin
        resend.emails.send({
          from: "Portfolio Subscriptions <admin@aphrodis.online>",
          to: process.env.CONTACT_EMAIL!,
          subject: `New Newsletter Subscription: ${email}`,
          react: SubscribeAdminEmail({ email }),
        }),
      ]);
    } catch (emailError) {
      console.error("Failed to send emails:", emailError);
      // Continue with subscription even if email sending fails
    }

    // Subscribe the user to Loops if available
    let loopsId = null;
    if (loops) {
      try {
        const response = await loops.createContact(email);
        loopsId = "id" in response ? response.id : null;
      } catch (loopsError) {
        console.error("Failed to create contact in Loops:", loopsError);
        // Continue with subscription even if Loops integration fails
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Subscribed successfully",
        loopsId,
      },
      {
        status: httpStatus.CREATED,
      },
    );
  } catch (error) {
    console.error("Error handling subscription:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: httpStatus.INTERNAL_SERVER_ERROR },
    );
  }
}
