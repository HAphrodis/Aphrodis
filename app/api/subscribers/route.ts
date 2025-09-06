import type { NextRequest } from "next/server";
import httpStatus from "http-status";
import {
  getSubscribers,
  getSubscriberStats,
} from "@/services/subscriber-service";
import type { SubscriberFilters } from "@/types/subscriber";
import { successResponse, errorResponse, ErrorCodes } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  const startTime = performance.now();

  try {
    const searchParams = req.nextUrl.searchParams;

    // Parse query parameters
    const filters: SubscriberFilters = {
      status:
        (searchParams.get("status") as SubscriberFilters["status"]) || "active",
      search: searchParams.get("search") || undefined,
      page: searchParams.has("page")
        ? Number.parseInt(searchParams.get("page") as string, 10)
        : 1,
      pageSize: searchParams.has("pageSize")
        ? Number.parseInt(searchParams.get("pageSize") as string, 10)
        : 10,
      sortBy:
        (searchParams.get("sortBy") as SubscriberFilters["sortBy"]) ||
        "timestamp",
      sortOrder:
        (searchParams.get("sortOrder") as SubscriberFilters["sortOrder"]) ||
        "desc",
    };

    // Get subscribers with filters
    const result = await getSubscribers(filters);

    // Get subscriber stats
    const stats = await getSubscriberStats();

    return successResponse(
      req,
      {
        subscribers: result.subscribers,
        stats,
      },
      {
        statusCode: httpStatus.OK,
        startTime,
        pagination: {
          page: result.page,
          pageSize: result.pageSize,
          totalItems: result.total,
          totalPages: result.totalPages,
          hasNextPage: result.page < result.totalPages,
          hasPreviousPage: result.page > 1,
        },
      },
    );
  } catch (error) {
    console.error("Error fetching subscribers:", error);

    return errorResponse(
      req,
      {
        code: ErrorCodes.INTERNAL_ERROR,
        message: "Failed to fetch subscribers",
      },
      {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        startTime,
      },
    );
  }
}
