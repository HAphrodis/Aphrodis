import type {
  Subscriber,
  SubscriberPagination,
  SubscriberStats,
} from "@/types/subscriber";
import { apiService } from "@/lib/axios";

interface SubscriberFetchResult {
  subscribers: Subscriber[];
  stats: SubscriberStats;
  pagination: SubscriberPagination;
}

interface ApiResponse {
  success: boolean;
  data: {
    subscribers: Subscriber[];
    stats: SubscriberStats;
  };
  metadata: {
    pagination: SubscriberPagination;
  };
  error?: {
    code: string;
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details?: any;
  };
}

export async function SubscriberDataFetcher(
  queryParams: Record<string, string | number | undefined>,
): Promise<SubscriberFetchResult> {
  try {
    // Use the apiService to make the request
    const result = await apiService.get<ApiResponse>(
      "/subscribers",
      queryParams,
    );

    // Handle API response format
    if (!result.success || !result.data) {
      throw new Error(result.error?.message || "Failed to fetch subscribers");
    }

    return {
      subscribers: result.data.subscribers,
      stats: result.data.stats,
      pagination: result.metadata.pagination,
    };
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    throw error;
  }
}
