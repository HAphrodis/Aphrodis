import type { NextRequest } from "next/server";
import httpStatus from "http-status";
import {
  getMessage,
  updateMessageStatus,
  deleteMessage,
} from "@/services/message-service";
import { z } from "zod";
import { successResponse, errorResponse, ErrorCodes } from "@/lib/api-response";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const startTime = performance.now();

  try {
    const params = await props.params;
    const id = params.id;

    const message = await getMessage(id);

    if (!message) {
      return errorResponse(
        req,
        {
          code: ErrorCodes.NOT_FOUND,
          message: "Message not found",
        },
        {
          statusCode: httpStatus.NOT_FOUND,
          startTime,
        },
      );
    }

    return successResponse(req, message, {
      statusCode: httpStatus.OK,
      startTime,
    });
  } catch (error) {
    console.error("Error fetching message:", error);

    return errorResponse(
      req,
      {
        code: ErrorCodes.INTERNAL_ERROR,
        message: "Failed to fetch message",
      },
      {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        startTime,
      },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const startTime = performance.now();

  try {
    const params = await props.params;
    const id = params.id;
    const data = await req.json();

    // Validate input
    const schema = z.object({
      status: z.enum(["unread", "read", "replied", "archived"]),
    });

    const result = schema.safeParse(data);

    if (!result.success) {
      return errorResponse(
        req,
        {
          code: ErrorCodes.VALIDATION_ERROR,
          message: "Invalid input",
          details: result.error.issues,
        },
        {
          statusCode: httpStatus.BAD_REQUEST,
          startTime,
        },
      );
    }

    const { status } = result.data;

    // Update message status
    const updatedMessage = await updateMessageStatus(id, status);

    if (!updatedMessage) {
      return errorResponse(
        req,
        {
          code: ErrorCodes.NOT_FOUND,
          message: "Message not found",
        },
        {
          statusCode: httpStatus.NOT_FOUND,
          startTime,
        },
      );
    }

    return successResponse(req, updatedMessage, {
      statusCode: httpStatus.OK,
      message: `Message status updated to ${status}`,
      startTime,
    });
  } catch (error) {
    console.error("Error updating message:", error);

    return errorResponse(
      req,
      {
        code: ErrorCodes.INTERNAL_ERROR,
        message: "Failed to update message",
      },
      {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        startTime,
      },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const startTime = performance.now();

  try {
    const params = await props.params;
    const id = params.id;
    const success = await deleteMessage(id);

    if (!success) {
      return errorResponse(
        req,
        {
          code: ErrorCodes.NOT_FOUND,
          message: "Message not found",
        },
        {
          statusCode: httpStatus.NOT_FOUND,
          startTime,
        },
      );
    }

    return successResponse(
      req,
      { id },
      {
        statusCode: httpStatus.OK,
        message: "Message deleted successfully",
        startTime,
      },
    );
  } catch (error) {
    console.error("Error deleting message:", error);

    return errorResponse(
      req,
      {
        code: ErrorCodes.INTERNAL_ERROR,
        message: "Failed to delete message",
      },
      {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        startTime,
      },
    );
  }
}
