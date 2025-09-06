import type { NextRequest } from "next/server";
import FeatureRequest from "@/models/FeatureRequest";
import httpStatus from "http-status";
import { errorResponse, successResponse } from "@/lib/api-response";

export async function PATCH(
  req: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const startTime = performance.now();

  try {
    const params = await props.params;
    const id = params.id;
    const body = await req.json();

    // Find feature request
    const featureRequest = await FeatureRequest.findById(id);
    if (!featureRequest) {
      return errorResponse(
        req,
        {
          code: "NOT_FOUND",
          message: "Feature request not found",
        },
        { statusCode: httpStatus.NOT_FOUND, startTime },
      );
    }

    // Update feature request
    const updatedRequest = await FeatureRequest.updateById(id, {
      ...body,
      updatedAt: new Date().toISOString(),
    });

    return successResponse(
      req,
      { featureRequest: updatedRequest },
      {
        message: "Feature request updated successfully",
        statusCode: httpStatus.OK,
        startTime,
      },
    );
  } catch (error) {
    console.error("Error updating feature request:", error);
    return errorResponse(
      req,
      {
        code: "INTERNAL_ERROR",
        message: "Failed to update feature request",
        details: String(error),
      },
      { statusCode: httpStatus.INTERNAL_SERVER_ERROR, startTime },
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

    // Find feature request
    const featureRequest = await FeatureRequest.findById(id);
    if (!featureRequest) {
      return errorResponse(
        req,
        {
          code: "NOT_FOUND",
          message: "Feature request not found",
        },
        { statusCode: httpStatus.NOT_FOUND, startTime },
      );
    }

    // Delete feature request
    await FeatureRequest.deleteById(id);

    return successResponse(
      req,
      { success: true },
      {
        message: "Feature request deleted successfully",
        statusCode: httpStatus.OK,
        startTime,
      },
    );
  } catch (error) {
    console.error("Error deleting feature request:", error);
    return errorResponse(
      req,
      {
        code: "INTERNAL_ERROR",
        message: "Failed to delete feature request",
        details: String(error),
      },
      { statusCode: httpStatus.INTERNAL_SERVER_ERROR, startTime },
    );
  }
}
