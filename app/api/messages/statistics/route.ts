import type { NextRequest } from "next/server";
import httpStatus from "http-status";
import {
  getDetailedMessageStats,
  getMessageAnalytics,
} from "@/services/message-service";
import { successResponse, errorResponse, ErrorCodes } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  const startTime = performance.now();

  try {
    // Get detailed message statistics
    const detailedStats = await getDetailedMessageStats();

    // Get message analytics
    const analytics = await getMessageAnalytics();

    // Combine statistics and analytics
    const statistics = {
      counts: {
        total: detailedStats.totalMessages,
        unread: detailedStats.unreadMessages,
        read: detailedStats.readMessages,
        replied: detailedStats.repliedMessages,
        archived: detailedStats.archivedMessages,
      },
      trends: {
        messagesByDay: detailedStats.messagesByDay,
        averagePerDay: analytics.averageMessagesPerDay,
        mostActiveDay: analytics.mostActiveDay,
        growthRate: analytics.growthRate,
      },
      distribution: {
        status: analytics.statusDistribution,
      },
      lastUpdated: new Date().toISOString(),
    };

    return successResponse(req, statistics, {
      statusCode: httpStatus.OK,
      message: "Message statistics retrieved successfully",
      startTime,
    });
  } catch (error) {
    console.error("Error fetching message statistics:", error);

    return errorResponse(
      req,
      {
        code: ErrorCodes.INTERNAL_ERROR,
        message: "Failed to fetch message statistics",
        details: error instanceof Error ? error.message : undefined,
      },
      {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        startTime,
      },
    );
  }
}
