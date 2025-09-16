import { rateLimit } from "@/lib/rateLimiter";
import type { NextRequest } from "next/server";
import { headers } from "next/headers";
import { generateIPHash } from "@/lib/utils";
import { Resend } from "resend";
import { messageSchema } from "@/lib/validations/message";
import httpStatus from "http-status";
import ContactConfirmationEmail from "@/emails/contact-confirmation";
import ContactNotificationEmail from "@/emails/contact-notification";
import { createMessage } from "@/services/message-service";
import { successResponse, errorResponse, ErrorCodes } from "@/lib/api-response";
import { createContactNotification } from "@/services/notification-service";

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY environment variable");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const startTime = performance.now();

  try {
    const json = await req.json();
    const result = messageSchema.safeParse(json);

    if (!result.success) {
      return errorResponse(
        req,
        {
          code: ErrorCodes.VALIDATION_ERROR,
          message: "Invalid input data",
          details: result.error.issues,
        },
        {
          statusCode: httpStatus.BAD_REQUEST,
          startTime,
        },
      );
    }

    // Extract schema fields
    const {
      name = "Portfolio Visitor",
      email,
      phone,
      subject,
      message,
    } = result.data;

    const headersList = headers();
    const ip = (await headersList).get("x-forwarded-for") ?? "unknown";
    const ipHash = await generateIPHash(ip);

    // Rate limit: 3 contact attempts per hour per IP
    const rateLimitResult = await rateLimit(`contact:${ipHash}`, 3, 3600);

    if (!rateLimitResult.success) {
      const resetDate = new Date(rateLimitResult.reset);
      const minutesUntilReset = Math.ceil(
        (resetDate.getTime() - Date.now()) / 60000,
      );

      return errorResponse(
        req,
        {
          code: ErrorCodes.RATE_LIMITED,
          message: `Too many message attempts. Please try again in ${minutesUntilReset} minutes.`,
          details: {
            rateLimited: true,
            reset: rateLimitResult.reset,
            retryAfter: minutesUntilReset,
          },
        },
        {
          statusCode: httpStatus.TOO_MANY_REQUESTS,
          startTime,
        },
      );
    }

    // Save message (now includes phone + subject if provided)
    const savedMessage = await createMessage({
      name,
      email,
      phone,
      subject,
      message,
      ipHash,
    });

    // Create notification for new contact message
    try {
      await createContactNotification(name, email, message, phone, subject);
    } catch (notificationError) {
      console.error("Failed to create contact notification:", notificationError);
      // Don't fail the submission if notification creation fails
    }

    // Send emails
    await Promise.all([
      // Confirmation email to the sender
      resend.emails.send({
        from: "Aphrodis's Portfolio <admin@aphrodis.online>",
        to: email,
        subject: "Thank you for your message",
        react: ContactConfirmationEmail({ name }),
      }),

      // Notification email to admin (now includes phone + subject)
      resend.emails.send({
        from: "Portfolio Contact <admin@aphrodis.online>",
        to: process.env.CONTACT_EMAIL!,
        replyTo: email,
        subject: `New Contact Message from ${name}`,
        react: ContactNotificationEmail({
          name,
          email,
          phone,
          subject,
          message,
        }),
      }),
    ]);

    return successResponse(
      req,
      {
        messageId: savedMessage.id,
        email,
        status: "sent",
      },
      {
        statusCode: httpStatus.CREATED,
        message: "Message sent successfully",
        startTime,
      },
    );
  } catch (error) {
    console.error("Error handling contact message:", error);

    return errorResponse(
      req,
      {
        code: ErrorCodes.INTERNAL_ERROR,
        message: "Failed to process your message",
      },
      {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        startTime,
      },
    );
  }
}
