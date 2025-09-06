import type { NextRequest } from "next/server";
import { auth } from "@/utils/auth";
import { createNotification } from "@/services/notification-service";
import { successResponse, errorResponse } from "@/lib/api-response";
import httpStatus from "http-status";

export async function POST(request: NextRequest) {
  const startTime = performance.now();

  try {
    // Check authentication
    const session = await auth();
    if (!session || !session.user) {
      return errorResponse(
        request,
        {
          code: "UNAUTHORIZED",
          message: "You must be logged in to create notifications",
        },
        { statusCode: 401, startTime },
      );
    }

    // Parse request body
    const body = await request.json();
    const { title, message, type, link } = body;

    // Validate required fields
    if (!title || !message || !type) {
      return errorResponse(
        request,
        {
          code: "BAD_REQUEST",
          message: "Missing required fields: title, message, and type",
        },
        { statusCode: httpStatus.BAD_REQUEST, startTime },
      );
    }

    // Validate type
    if (!["error", "warning", "success", "info"].includes(type)) {
      return errorResponse(
        request,
        {
          code: "BAD_REQUEST",
          message:
            "Invalid notification type. Must be one of: error, warning, success, info",
        },
        { statusCode: httpStatus.BAD_REQUEST, startTime },
      );
    }

    // Create the notification
    const notification = await createNotification({
      title,
      message,
      type,
      link,
    });

    return successResponse(
      request,
      { notification },
      {
        message: "Notification created successfully",
        statusCode: httpStatus.CREATED,
        startTime,
      },
    );
  } catch (error) {
    console.error("Failed to create notification:", error);
    return errorResponse(
      request,
      {
        code: "INTERNAL_ERROR",
        message: "Failed to create notification",
        details: String(error),
      },
      { statusCode: httpStatus.INTERNAL_SERVER_ERROR, startTime },
    );
  }
}
