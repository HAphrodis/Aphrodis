import type { NextRequest } from "next/server";
import httpStatus from "http-status";
import { createSubscriber } from "@/services/subscriber-service";
import { z } from "zod";
import { successResponse, errorResponse, ErrorCodes } from "@/lib/api-response";
import { headers } from "next/headers";
import { generateIPHash } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const startTime = performance.now();

  try {
    const data = await req.json();

    // Validate input
    const schema = z.object({
      name: z.string().optional(),
      email: z.string().email("Invalid email address"),
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

    const { name, email } = result.data;

    // Get IP hash for tracking
    const headersList = headers();
    const ip = (await headersList).get("x-forwarded-for") ?? "unknown";
    const ipHash = await generateIPHash(ip);

    // Create subscriber
    const subscriber = await createSubscriber({
      name,
      email,
      ipHash,
    });

    return successResponse(req, subscriber, {
      statusCode: httpStatus.CREATED,
      message: "Subscriber created successfully",
      startTime,
    });
  } catch (error) {
    console.error("Error creating subscriber:", error);

    return errorResponse(
      req,
      {
        code: ErrorCodes.INTERNAL_ERROR,
        message: "Failed to create subscriber",
      },
      {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        startTime,
      },
    );
  }
}
