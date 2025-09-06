// app\api\notifications\route.ts
import type { NextRequest } from "next/server";
import Notification from "@/models/Notification";
import httpStatus from "http-status";
import { errorResponse, successResponse } from "@/lib/api-response";
import { auth } from "@/utils/auth";

export async function GET(request: NextRequest) {
  const startTime = performance.now();

  try {
    // Check authentication
    const session = await auth();
    if (!session || !session.user) {
      return errorResponse(
        request,
        {
          code: "UNAUTHORIZED",
          message: "You must be logged in to access notifications",
        },
        { statusCode: 401, startTime },
      );
    }

    // Parse query parameters
    const url = new URL(request.url);
    const page = Number.parseInt(url.searchParams.get("page") || "1", 10);
    const limit = Number.parseInt(url.searchParams.get("limit") || "10", 10);
    const offset = (page - 1) * limit;

    // Get notifications with pagination
    const { notifications, total } = await Notification.getAllSorted({
      limit,
      offset,
    });

    return successResponse(
      request,
      {
        notifications,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      {
        message: "Notifications retrieved successfully",
        statusCode: httpStatus.OK,
        startTime,
      },
    );
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    return errorResponse(
      request,
      {
        code: "INTERNAL_ERROR",
        message: "Failed to fetch notifications",
        details: String(error),
      },
      { statusCode: httpStatus.INTERNAL_SERVER_ERROR, startTime },
    );
  }
}

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
          message: "You must be logged in to update notifications",
        },
        { statusCode: 401, startTime },
      );
    }

    // Parse request body
    const body = await request.json();
    const { id, action } = body;

    if (!id || !action) {
      return errorResponse(
        request,
        {
          code: "BAD_REQUEST",
          message: "Missing required fields: id and action",
        },
        { statusCode: httpStatus.BAD_REQUEST, startTime },
      );
    }

    // Find notification
    const notification = await Notification.findById(id);
    if (!notification) {
      return errorResponse(
        request,
        {
          code: "NOT_FOUND",
          message: "Notification not found",
        },
        { statusCode: httpStatus.NOT_FOUND, startTime },
      );
    }

    let result;

    // Perform action
    switch (action) {
      case "markAsRead":
        result = await Notification.markAsRead(id);
        break;
      case "archive":
        result = await Notification.archive(id);
        break;
      case "delete":
        await Notification.deleteById(id);
        return successResponse(
          request,
          { success: true },
          {
            message: "Notification deleted successfully",
            statusCode: httpStatus.OK,
            startTime,
          },
        );
      default:
        return errorResponse(
          request,
          {
            code: "BAD_REQUEST",
            message: "Invalid action",
          },
          { statusCode: httpStatus.BAD_REQUEST, startTime },
        );
    }

    return successResponse(
      request,
      { notification: result },
      {
        message: "Notification updated successfully",
        statusCode: httpStatus.OK,
        startTime,
      },
    );
  } catch (error) {
    console.error("Failed to update notification:", error);
    return errorResponse(
      request,
      {
        code: "INTERNAL_ERROR",
        message: "Failed to update notification",
        details: String(error),
      },
      { statusCode: httpStatus.INTERNAL_SERVER_ERROR, startTime },
    );
  }
}
