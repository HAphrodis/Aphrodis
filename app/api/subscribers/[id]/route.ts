import type { NextRequest } from "next/server";
import httpStatus from "http-status";
import {
  getSubscriber,
  updateSubscriber,
  deleteSubscriber,
} from "@/services/subscriber-service";
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

    const subscriber = await getSubscriber(id);

    if (!subscriber) {
      return errorResponse(
        req,
        {
          code: ErrorCodes.NOT_FOUND,
          message: "Subscriber not found",
        },
        {
          statusCode: httpStatus.NOT_FOUND,
          startTime,
        },
      );
    }

    return successResponse(req, subscriber, {
      statusCode: httpStatus.OK,
      startTime,
    });
  } catch (error) {
    console.error("Error fetching subscriber:", error);

    return errorResponse(
      req,
      {
        code: ErrorCodes.INTERNAL_ERROR,
        message: "Failed to fetch subscriber",
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
      name: z.string().optional(),
      email: z.string().email("Invalid email address").optional(),
      status: z.enum(["active", "unsubscribed"]).optional(),
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

    // Update subscriber
    const updatedSubscriber = await updateSubscriber(id, result.data);

    if (!updatedSubscriber) {
      return errorResponse(
        req,
        {
          code: ErrorCodes.NOT_FOUND,
          message: "Subscriber not found",
        },
        {
          statusCode: httpStatus.NOT_FOUND,
          startTime,
        },
      );
    }

    return successResponse(req, updatedSubscriber, {
      statusCode: httpStatus.OK,
      message: "Subscriber updated successfully",
      startTime,
    });
  } catch (error) {
    console.error("Error updating subscriber:", error);

    return errorResponse(
      req,
      {
        code: ErrorCodes.INTERNAL_ERROR,
        message: "Failed to update subscriber",
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
    const success = await deleteSubscriber(id);

    if (!success) {
      return errorResponse(
        req,
        {
          code: ErrorCodes.NOT_FOUND,
          message: "Subscriber not found",
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
        message: "Subscriber deleted successfully",
        startTime,
      },
    );
  } catch (error) {
    console.error("Error deleting subscriber:", error);

    return errorResponse(
      req,
      {
        code: ErrorCodes.INTERNAL_ERROR,
        message: "Failed to delete subscriber",
      },
      {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        startTime,
      },
    );
  }
}
