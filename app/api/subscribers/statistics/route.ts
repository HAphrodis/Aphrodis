import type { NextRequest } from "next/server";
import httpStatus from "http-status";
import {
  getSubscriberStats,
  getDetailedSubscriberStats,
  getSubscriberAnalytics,
} from "@/services/subscriber-service";
import { successResponse, errorResponse, ErrorCodes } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  const startTime = performance.now();

  try {
    // Get basic subscriber statistics
    const basicStats = await getSubscriberStats();

    // Get detailed subscriber statistics
    const detailedStats = await getDetailedSubscriberStats();

    // Get subscriber analytics
    const analytics = await getSubscriberAnalytics();

    // Combine statistics and analytics
    const statistics = {
      counts: {
        total: basicStats.total,
        active: basicStats.active,
        unsubscribed: basicStats.unsubscribed,
      },
      trends: {
        subscribersByDay: detailedStats.subscribersByDay,
        averagePerDay: analytics.averageSubscribersPerDay,
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
      message: "Subscriber statistics retrieved successfully",
      startTime,
    });
  } catch (error) {
    console.error("Error fetching subscriber statistics:", error);

    return errorResponse(
      req,
      {
        code: ErrorCodes.INTERNAL_ERROR,
        message: "Failed to fetch subscriber statistics",
        details: error instanceof Error ? error.message : undefined,
      },
      {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        startTime,
      },
    );
  }
}
