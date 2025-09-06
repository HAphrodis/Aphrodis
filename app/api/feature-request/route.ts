/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextRequest } from "next/server";
import FeatureRequest from "@/models/FeatureRequest";
import httpStatus from "http-status";
import { errorResponse, successResponse } from "@/lib/api-response";
import { featureRequestSchema } from "@/lib/schema/featureRequest";
import { Resend } from "resend";
import { render } from "@react-email/render";
import FeatureRequestNotification from "@/emails/FeatureRequestNotification";
import AdminFeatureRequestNotification from "@/emails/AdminFeatureRequestNotification";

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEmail = process.env.ADMIN_EMAIL;
const developerEmail = process.env.DEVELOPER_EMAIL;

export async function POST(request: NextRequest) {
  const startTime = performance.now();

  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = featureRequestSchema.parse(body);

    // Create feature request
    const featureRequest = await FeatureRequest.create(validatedData);

    // Send email to developer
    try {
      await resend.emails.send({
        from: `Portfolio <${adminEmail}>`,
        to: developerEmail!,
        subject: "New Feature Request",
        html: await render(
          FeatureRequestNotification({ featureRequest: featureRequest as any }),
        ),
      });
    } catch (emailError) {
      console.error("Failed to send email to developer:", emailError);
    }

    // Send email to requester
    try {
      await resend.emails.send({
        from: `Portfolio <${adminEmail}>`,
        to: validatedData.requestedBy,
        subject: "Feature Request Submitted",
        html: await render(
          AdminFeatureRequestNotification({
            featureRequest: featureRequest as any,
          }),
        ),
      });
    } catch (emailError) {
      console.error("Failed to send email to requester:", emailError);
    }

    return successResponse(
      request,
      { featureRequest },
      {
        message: "Feature request submitted successfully",
        statusCode: httpStatus.CREATED,
        startTime,
      },
    );
  } catch (error) {
    console.error("Failed to submit feature request:", error);
    return errorResponse(
      request,
      {
        code: "INTERNAL_ERROR",
        message: "Failed to submit feature request",
        details: String(error),
      },
      { statusCode: httpStatus.INTERNAL_SERVER_ERROR, startTime },
    );
  }
}

export async function GET(request: NextRequest) {
  const startTime = performance.now();

  try {
    // Parse query parameters
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const page = Number.parseInt(url.searchParams.get("page") || "1", 10);
    const limit = Number.parseInt(url.searchParams.get("limit") || "10", 10);
    const offset = (page - 1) * limit;
    const sortBy =
      (url.searchParams.get("sortBy") as
        | "createdAt"
        | "updatedAt"
        | "priority") || "createdAt";
    const sortOrder =
      (url.searchParams.get("sortOrder") as "asc" | "desc") || "desc";

    // If ID is provided, return single feature request
    if (id) {
      const featureRequest = await FeatureRequest.findById(id);
      if (!featureRequest) {
        return errorResponse(
          request,
          {
            code: "NOT_FOUND",
            message: "Feature request not found",
          },
          { statusCode: httpStatus.NOT_FOUND, startTime },
        );
      }
      return successResponse(
        request,
        { featureRequest },
        {
          message: "Feature request retrieved successfully",
          statusCode: httpStatus.OK,
          startTime,
        },
      );
    }

    // Otherwise, return paginated list
    const { featureRequests, total } = await FeatureRequest.getAllSorted({
      limit,
      offset,
      sortBy,
      sortOrder,
    });

    return successResponse(
      request,
      {
        total_requests: total,
        total_pages: Math.ceil(total / limit),
        page,
        limit,
        feature_requests: featureRequests,
      },
      {
        message: "Feature requests retrieved successfully",
        statusCode: httpStatus.OK,
        startTime,
      },
    );
  } catch (error) {
    console.error("Failed to fetch feature requests:", error);
    return errorResponse(
      request,
      {
        code: "INTERNAL_ERROR",
        message: "Failed to fetch feature requests",
        details: String(error),
      },
      { statusCode: httpStatus.INTERNAL_SERVER_ERROR, startTime },
    );
  }
}
