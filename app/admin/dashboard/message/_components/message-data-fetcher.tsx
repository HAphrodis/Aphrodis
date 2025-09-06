/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Message, MessagePagination, MessageStats } from "@/types/message";
import { apiService } from "@/lib/axios";

interface MessageFetchResult {
  messages: Message[];
  stats: MessageStats;
  pagination: MessagePagination;
}

interface ApiResponse {
  success: boolean;
  data: {
    messages: Message[];
    stats: MessageStats;
  };
  metadata: {
    pagination: MessagePagination;
  };
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export async function MessageDataFetcher(
  queryParams: Record<string, string | number | undefined>,
): Promise<MessageFetchResult> {
  try {
    // Use the apiService to make the request
    const result = await apiService.get<ApiResponse>("/messages", queryParams);

    // Handle API response format
    if (!result.success || !result.data) {
      throw new Error(result.error?.message || "Failed to fetch messages");
    }

    return {
      messages: result.data.messages,
      stats: result.data.stats,
      pagination: result.metadata.pagination,
    };
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
}
