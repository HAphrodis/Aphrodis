// app\api\subscribers\update-preferences\route.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { createNotification } from "@/services/notification-service";
import {
  getSubscriberByEmail,
  updateSubscriber,
} from "@/services/subscriber-service";
import { createUnsubscribeFeedback } from "@/app/services/feedback-service";
import FeedbackConfirmation from "@/emails/FeedbackConfirmation";
import AdminFeedbackNotification from "@/emails/AdminFeedbackNotification";

const resend = new Resend(process.env.RESEND_API_KEY);

const updatePreferencesSchema = z.object({
  email: z.string().email("Invalid email address"),
  feedback: z.string().optional(),
  reason: z.string().optional(),
});

function getMetadata(request: NextRequest) {
  return {
    serverTimeStamp: Date.now(),
    serverTimeZone: "Africa/Kigali",
    locale: process.env.LOCALE || "en_US",
    version: process.env.API_VERSION || 1,
    requestMethod: request.method,
    requestUrl: request.url,
    userAgent: request.headers.get("user-agent") || "Unknown",
  };
}

function createResponse(
  success: boolean,
  data: any,
  message: string,
  statusCode: number,
  request: NextRequest,
) {
  const metadata = getMetadata(request);
  return NextResponse.json(
    {
      data,
      metaData: metadata,
      message,
      errors: success ? null : data,
      status: success ? "success" : "error",
      statusCode,
      timestamp: new Date().toISOString(),
      path: new URL(request.url).pathname,
      duration: `${Date.now() - metadata.serverTimeStamp}ms`,
    },
    { status: statusCode },
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = updatePreferencesSchema.safeParse(body);

    if (!result.success) {
      return createResponse(
        false,
        { errors: result.error.flatten().fieldErrors },
        "Invalid data provided",
        400,
        request,
      );
    }

    const { email, feedback, reason } = result.data;

    console.log("Updating preferences for:", reason);

    const subscriber = await getSubscriberByEmail(email);

    if (!subscriber) {
      return createResponse(
        false,
        null,
        "Email not found in my subscribers list",
        404,
        request,
      );
    }

    await updateSubscriber(email, { status: "active" });

    if (feedback) {
      await createUnsubscribeFeedback({
        email,
        reason: reason || "Not specified",
        feedback: feedback,
        stayedSubscribed: true,
      });
    }

    await createNotification({
      title: "Subscriber Feedback",
      message: `${email} provided feedback on the newsletter.`,
      type: "info",
      timestamp: new Date().toISOString(),
      read: false,
      archived: false,
      link: `/admin/dashboard/subscribers`,
    });

    try {
      // Send confirmation email to subscriber
      const feedbackConfirmationContent = await FeedbackConfirmation({
        subscriberEmail: email,
        feedback,
        reason,
      });

      await resend.emails.send({
        from: `Aphrodis <${process.env.CONTACT_EMAIL}>`,
        to: email,
        replyTo: process.env.GMAIL_REPLY_TO_EMAIL,
        subject: "Thank you for your valuable feedback - Aphrodis",
        react: feedbackConfirmationContent,
      });

      // Send notification email to admin if feedback was provided
      if (feedback) {
        const adminEmailContent = await AdminFeedbackNotification({
          subscriberEmail: email,
          feedback,
          reason: reason || "Not specified",
          timestamp: new Date().toISOString(),
        });

        await resend.emails.send({
          from: `Aphrodis <${process.env.CONTACT_EMAIL}>`,
          to: process.env.GMAIL_REPLY_TO_EMAIL!,
          subject: "New Subscriber Feedback Received",
          react: adminEmailContent,
        });
      }
    } catch (error) {
      console.error("Failed to send feedback emails:", error);
    }

    return createResponse(
      true,
      { email },
      "Thank you for your feedback. Your preferences have been updated.",
      200,
      request,
    );
  } catch (error) {
    console.error("Failed to update preferences:", error);
    return createResponse(
      false,
      { error: "Internal server error" },
      "Failed to process your request. Please try again.",
      500,
      request,
    );
  }
}
