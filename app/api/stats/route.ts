import { NextResponse } from "next/server";
import httpStatus from "http-status";
import { getMessageStats } from "@/services/message-service";
import { getSubscriberStats } from "@/services/subscriber-service";

export async function GET() {
  try {
    // Get stats from both services
    const [messageStats, subscriberStats] = await Promise.all([
      getMessageStats(),
      getSubscriberStats(),
    ]);

    return NextResponse.json(
      {
        messages: messageStats,
        subscribers: subscriberStats,
      },
      { status: httpStatus.OK },
    );
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: httpStatus.INTERNAL_SERVER_ERROR },
    );
  }
}
