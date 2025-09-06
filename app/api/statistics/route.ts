import type { NextRequest } from "next/server";
import MessageModel from "@/models/Message";
import SubscriberModel from "@/models/Subscriber";
import httpStatus from "http-status";
import { errorResponse, successResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  const startTime = performance.now();

  try {
    // console.log("Fetching statistics...");

    // Count documents with error handling
    let totalMessages = 0;
    let unreadMessages = 0;
    let repliedMessages = 0;
    let archivedMessages = 0;
    let totalSubscribers = 0;

    try {
      totalMessages = await MessageModel.countDocuments();
      // console.log("Total messages:", totalMessages)
    } catch (error) {
      console.error("Error counting total messages:", error);
    }

    try {
      unreadMessages = await MessageModel.countDocuments({ status: "unread" });
      // console.log("Unread messages:", unreadMessages)
    } catch (error) {
      console.error("Error counting unread messages:", error);
    }

    try {
      repliedMessages = await MessageModel.countDocuments({
        status: "replied",
      });
      // console.log("Replied messages:", repliedMessages)
    } catch (error) {
      console.error("Error counting replied messages:", error);
    }

    try {
      archivedMessages = await MessageModel.countDocuments({
        status: "archived",
      });
      // console.log("Archived messages:", archivedMessages)
    } catch (error) {
      console.error("Error counting archived messages:", error);
    }

    try {
      totalSubscribers = await SubscriberModel.countDocuments({
        status: "active",
      });
      // console.log("Total subscribers:", totalSubscribers)
    } catch (error) {
      console.error("Error counting total subscribers:", error);
    }

    // Get data for the last 5 months
    const last5Months = new Date();
    last5Months.setMonth(last5Months.getMonth() - 4); // Change to 4 to include current month
    last5Months.setDate(1); // Set to first day of the month
    last5Months.setHours(0, 0, 0, 0); // Set to beginning of the day

    // Get messages and subscribers by month with error handling
    let messagesByMonth: Record<string, number> = {};
    let subscribersByMonth: Record<string, number> = {};

    try {
      messagesByMonth = await MessageModel.getMessagesByMonth(last5Months);
      // console.log("Messages by month:", messagesByMonth)
    } catch (error) {
      console.error("Error getting messages by month:", error);
    }

    try {
      subscribersByMonth =
        await SubscriberModel.getSubscribersByMonth(last5Months);
      // console.log("Subscribers by month:", subscribersByMonth)
    } catch (error) {
      console.error("Error getting subscribers by month:", error);
    }

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Generate an array of the last 5 months
    const last5MonthsArray = Array.from({ length: 5 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    }).reverse();

    const activityData = last5MonthsArray.map((monthKey) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [year, month] = monthKey.split("-");
      return {
        month: monthNames[Number.parseInt(month) - 1],
        messages: messagesByMonth[monthKey] || 0,
        subscribers: subscribersByMonth[monthKey] || 0,
      };
    });

    const statistics = {
      totalMessages,
      unreadMessages,
      starredMessages: repliedMessages, // Using replied as "starred" for compatibility
      archivedMessages,
      totalSubscribers,
      activityData,
    };

    // console.log("Statistics generated successfully");

    return successResponse(request, statistics, {
      message: "Statistics retrieved successfully",
      statusCode: httpStatus.OK,
      startTime,
    });
  } catch (error) {
    console.error("Failed to fetch statistics:", error);
    return errorResponse(
      request,
      {
        code: "INTERNAL_ERROR",
        message: "Failed to fetch statistics",
        details: String(error),
      },
      {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        startTime,
      },
    );
  }
}
