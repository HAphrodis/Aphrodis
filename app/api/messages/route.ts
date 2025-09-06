// app\api\messages\route.ts
import type { NextRequest } from "next/server";
import httpStatus from "http-status";
import { getMessages, getMessageStats } from "@/services/message-service";
import type { MessageFilters } from "@/models/Message";
import { successResponse, errorResponse, ErrorCodes } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  const startTime = performance.now();

  try {
    const searchParams = req.nextUrl.searchParams;

    // Parse query parameters
    const filters: MessageFilters = {
      status:
        (searchParams.get("status") as MessageFilters["status"]) || undefined,
      search: searchParams.get("search") || undefined,
      page: searchParams.has("page")
        ? Number.parseInt(searchParams.get("page") as string, 10)
        : 1,
      pageSize: searchParams.has("pageSize")
        ? Number.parseInt(searchParams.get("pageSize") as string, 10)
        : 10,
      sortBy:
        (searchParams.get("sortBy") as MessageFilters["sortBy"]) || "timestamp",
      sortOrder:
        (searchParams.get("sortOrder") as MessageFilters["sortOrder"]) ||
        "desc",
    };

    // Get messages with filters
    const result = await getMessages(filters);

    // Get message stats
    const stats = await getMessageStats();

    return successResponse(
      req,
      {
        messages: result.messages,
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
    console.error("Error fetching messages:", error);

    return errorResponse(
      req,
      {
        code: ErrorCodes.INTERNAL_ERROR,
        message: "Failed to fetch messages",
      },
      {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        startTime,
      },
    );
  }
}
