import type { NextRequest } from "next/server";
import { auth } from "@/utils/auth";
import AuditLog from "@/models/AuditLog";
import { auditLogQuerySchema } from "@/lib/schema/auditLog";
import { errorResponse, successResponse } from "@/lib/api-response";

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
          message: "You must be logged in to access audit logs",
        },
        { statusCode: 401, startTime },
      );
    }

    // Parse query parameters
    const url = new URL(request.url);

    // Handle both direct parameters and nested params format
    const searchTerm =
      url.searchParams.get("searchTerm") ||
      url.searchParams.get("params[searchTerm]") ||
      undefined;

    const filterAction =
      url.searchParams.get("filterAction") ||
      url.searchParams.get("params[filterAction]") ||
      undefined;

    const pageParam =
      url.searchParams.get("page") ||
      url.searchParams.get("params[page]") ||
      "1";

    const limitParam =
      url.searchParams.get("limit") ||
      url.searchParams.get("params[limit]") ||
      "10";

    const page = Number.parseInt(pageParam, 10);
    const limit = Number.parseInt(limitParam, 10);

    // console.log("Query parameters:", { searchTerm, filterAction, page, limit });

    // Validate parameters
    const validatedParams = auditLogQuerySchema.parse({
      searchTerm,
      filterAction,
      page,
      limit,
    });

    // Get all logs
    const allLogs = await AuditLog.getAll();

    // Filter out invalid logs
    const validLogs = allLogs.filter((log) => log && typeof log === "object");

    // console.log(
    //   `Found ${validLogs.length} valid logs out of ${allLogs.length} total logs`,
    // );

    // Filter logs based on search term and action
    let filteredLogs = [...validLogs];

    if (validatedParams.searchTerm) {
      const searchTermLower = validatedParams.searchTerm.toLowerCase();
      filteredLogs = filteredLogs.filter(
        (log) =>
          (log.user && log.user.toLowerCase().includes(searchTermLower)) ||
          (log.action && log.action.toLowerCase().includes(searchTermLower)) ||
          (log.details && log.details.toLowerCase().includes(searchTermLower)),
      );
      // console.log(`After search term filter: ${filteredLogs.length} logs`);
    }

    if (
      validatedParams.filterAction &&
      validatedParams.filterAction !== "all"
    ) {
      filteredLogs = filteredLogs.filter(
        (log) => log.action === validatedParams.filterAction,
      );
      // console.log(`After action filter: ${filteredLogs.length} logs`);
    }

    // Sort logs by timestamp (newest first)
    filteredLogs.sort((a, b) => {
      return (
        new Date(b.timestamp || b.createdAt || 0).getTime() -
        new Date(a.timestamp || a.createdAt || 0).getTime()
      );
    });

    // Get unique action types for filtering
    const actionTypes = Array.from(
      new Set(
        validLogs
          .filter((log) => log.action) // Filter out logs without action
          .map((log) => log.action),
      ),
    ).sort();

    // console.log(`Found ${actionTypes.length} unique action types`);

    // Calculate pagination
    const totalLogs = filteredLogs.length;
    const totalPages = Math.ceil(totalLogs / validatedParams.limit);
    const startIndex = (validatedParams.page - 1) * validatedParams.limit;
    const paginatedLogs = filteredLogs.slice(
      startIndex,
      startIndex + validatedParams.limit,
    );

    // Ensure all logs have required properties
    const sanitizedLogs = paginatedLogs.map((log) => ({
      id:
        log.id ||
        `log-${log.timestamp || log.createdAt}-${log.action || "unknown"}`,
      action: log.action || "Unknown Action",
      user: log.user || "Unknown User",
      timestamp: log.timestamp || log.createdAt || new Date().toISOString(),
      details: log.details || "",
      createdAt: log.createdAt || log.timestamp || new Date().toISOString(),
      updatedAt: log.updatedAt || log.timestamp || new Date().toISOString(),
    }));

    return successResponse(
      request,
      {
        logs: sanitizedLogs,
        totalLogs,
        totalPages,
        currentPage: validatedParams.page,
        actionTypes,
      },
      {
        message: "Audit logs retrieved successfully",
        statusCode: 200,
        startTime,
        pagination: {
          page: validatedParams.page,
          pageSize: validatedParams.limit,
          totalItems: totalLogs,
          totalPages,
          hasNextPage: validatedParams.page < totalPages,
          hasPreviousPage: validatedParams.page > 1,
        },
      },
    );
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    return errorResponse(
      request,
      {
        code: "INTERNAL_ERROR",
        message: "Failed to fetch audit logs",
        details: String(error),
      },
      { statusCode: 500, startTime },
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
          message: "You must be logged in to create audit logs",
        },
        { statusCode: 401, startTime },
      );
    }

    // Parse request body
    const body = await request.json();

    // Create audit log
    const auditLog = await AuditLog.create({
      action: body.action || "Unknown Action",
      user:
        typeof session.user.email === "string"
          ? session.user.email
          : "Unknown User",
      details: body.details || "",
      timestamp: new Date().toISOString(),
    });

    return successResponse(
      request,
      { auditLog },
      {
        message: "Audit log created successfully",
        statusCode: 201,
        startTime,
      },
    );
  } catch (error) {
    console.error("Error creating audit log:", error);
    return errorResponse(
      request,
      {
        code: "INTERNAL_ERROR",
        message: "Failed to create audit log",
        details: String(error),
      },
      { statusCode: 500, startTime },
    );
  }
}
