import type { NextRequest } from "next/server";
import httpStatus from "http-status";
import { getMessageAnalytics, getMessages } from "@/services/message-service";
import { successResponse, errorResponse, ErrorCodes } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  const startTime = performance.now();

  try {
    // Get all messages to analyze patterns
    const allMessages = await getMessages({ pageSize: 1000 }); // Get a large sample
    const messages = allMessages.messages;

    // Get analytics
    const analytics = await getMessageAnalytics();

    // Extract email domains for analysis
    const domains: Record<string, number> = {};
    messages.forEach((msg) => {
      const domain = msg.email.split("@")[1];
      if (domain) {
        domains[domain] = (domains[domain] || 0) + 1;
      }
    });

    // Sort domains by frequency
    const topDomains = Object.entries(domains)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([domain, count]) => ({ domain, count }));

    // Calculate time of day distribution
    const hourDistribution: Record<string, number> = {};
    messages.forEach((msg) => {
      const hour = new Date(msg.timestamp).getHours();
      const timeSlot = `${hour.toString().padStart(2, "0")}:00`;
      hourDistribution[timeSlot] = (hourDistribution[timeSlot] || 0) + 1;
    });

    // Format for response
    const formattedHourDistribution = Object.entries(hourDistribution)
      .map(([hour, count]) => ({ hour, count }))
      .sort((a, b) => a.hour.localeCompare(b.hour));

    // Prepare advanced analytics
    const advancedAnalytics = {
      overview: {
        totalMessages: messages.length,
        averagePerDay: analytics.averageMessagesPerDay,
        growthRate: analytics.growthRate,
      },
      patterns: {
        topEmailDomains: topDomains,
        hourlyDistribution: formattedHourDistribution,
        statusDistribution: analytics.statusDistribution,
      },
      trends: {
        mostActiveDay: analytics.mostActiveDay,
      },
      lastUpdated: new Date().toISOString(),
    };

    return successResponse(req, advancedAnalytics, {
      statusCode: httpStatus.OK,
      message: "Message analytics retrieved successfully",
      startTime,
    });
  } catch (error) {
    console.error("Error fetching message analytics:", error);

    return errorResponse(
      req,
      {
        code: ErrorCodes.INTERNAL_ERROR,
        message: "Failed to fetch message analytics",
        details: error instanceof Error ? error.message : undefined,
      },
      {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        startTime,
      },
    );
  }
}
