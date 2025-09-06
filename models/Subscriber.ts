import { RedisSchema, RedisIndex } from "@/lib/redis-schema";

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  status: "active" | "unsubscribed" | "inactive";
  timestamp: string;
  unsubscribedAt?: string;
  ipHash?: string;
}

export interface SubscriberListResponse {
  subscribers: Subscriber[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface SubscriberFilters {
  status?: "active" | "unsubscribed" | "inactive";
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: "timestamp" | "email";
  sortOrder?: "asc" | "desc";
}

class SubscriberSchema extends RedisSchema {
  // Create the subscriber
  findByStatus(p0: string) {
    throw new Error("Method not implemented.");
  }
  private emailIndex: RedisIndex;
  private statusIndex: RedisIndex;

  constructor() {
    super("subscriber");
    this.emailIndex = new RedisIndex("subscriber");
    this.statusIndex = new RedisIndex("subscriber");
  }

  async create(data: Partial<Subscriber>): Promise<Subscriber> {
    // Check if email already exists
    if (data.email) {
      const existingId = await this.emailIndex.get("email", data.email);
      if (existingId) {
        throw new Error("Email already exists");
      }
    }

    // Set default values
    const now = new Date().toISOString();
    const subscriberData = {
      status: "active",
      timestamp: now,
      ...data,
    };

    // Create the subscriber
    const result = await super.create(subscriberData);

    // Create indexes
    if (data.email) {
      await this.emailIndex.set("email", data.email, result.id);
    }

    if (data.status) {
      await this.statusIndex.set("status", data.status, result.id);
    } else {
      await this.statusIndex.set("status", "active", result.id);
    }

    return result as Subscriber;
  }

  async findByEmail(email: string): Promise<Subscriber | null> {
    const id = await this.emailIndex.get("email", email);
    if (!id) return null;
    return this.findById(id) as Promise<Subscriber | null>;
  }

  async countDocuments(
    filter: Partial<{ status: "active" | "unsubscribed" | "inactive" }> = {},
  ): Promise<number> {
    try {
      const allSubscribers = await this.getAll();
      // console.log("All subscribers:", JSON.stringify(allSubscribers, null, 2))

      if (Object.keys(filter).length === 0) {
        return allSubscribers.length;
      }

      const filteredSubscribers = allSubscribers.filter((subscriber) => {
        // Add safeguards for missing properties
        if (!subscriber) {
          console.warn("Found null or undefined subscriber");
          return false;
        }

        if (filter.status) {
          // Check if status exists, if not, log and skip
          if (subscriber.status === undefined) {
            console.warn(
              `Subscriber ${subscriber.id || "unknown"} has no status property:`,
              subscriber,
            );
            return false;
          }
          return subscriber.status === filter.status;
        }
        return true;
      });

      return filteredSubscribers.length;
    } catch (error) {
      console.error("Error in countDocuments:", error);
      return 0;
    }
  }

  async getSubscribersByMonth(
    startDate: Date,
  ): Promise<Record<string, number>> {
    try {
      const allSubscribers = await this.getAll();
      const subscribersByMonth: Record<string, number> = {};

      allSubscribers.forEach((subscriber) => {
        // Skip invalid subscribers
        if (!subscriber || !subscriber.timestamp || !subscriber.status) {
          return;
        }

        const timestamp = new Date(subscriber.timestamp);
        if (timestamp >= startDate && subscriber.status === "active") {
          const monthKey = `${timestamp.getFullYear()}-${String(timestamp.getMonth() + 1).padStart(2, "0")}`;
          subscribersByMonth[monthKey] =
            (subscribersByMonth[monthKey] || 0) + 1;
        }
      });

      return subscribersByMonth;
    } catch (error) {
      console.error("Error in getSubscribersByMonth:", error);
      return {};
    }
  }

  async findAll(
    filters: SubscriberFilters = {},
  ): Promise<SubscriberListResponse> {
    try {
      const {
        status,
        search,
        page = 1,
        pageSize = 10,
        sortBy = "timestamp",
        sortOrder = "desc",
      } = filters;

      let allSubscribers = (await this.getAll()) as Subscriber[];

      // Filter out invalid subscribers
      allSubscribers = allSubscribers.filter(
        (subscriber) => subscriber && subscriber.email,
      );

      // Apply status filter
      if (status) {
        allSubscribers = allSubscribers.filter(
          (subscriber) => subscriber.status === status,
        );
      }

      // Apply search filter
      if (search) {
        const searchLower = search.toLowerCase();
        allSubscribers = allSubscribers.filter(
          (subscriber) =>
            subscriber.email.toLowerCase().includes(searchLower) ||
            (subscriber.name &&
              subscriber.name.toLowerCase().includes(searchLower)),
        );
      }

      // Sort subscribers
      allSubscribers.sort((a, b) => {
        if (sortBy === "email") {
          return sortOrder === "asc"
            ? a.email.localeCompare(b.email)
            : b.email.localeCompare(a.email);
        } else {
          // Default sort by timestamp
          return sortOrder === "asc"
            ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        }
      });

      // Calculate pagination
      const total = allSubscribers.length;
      const totalPages = Math.ceil(total / pageSize);
      const startIndex = (page - 1) * pageSize;
      const paginatedSubscribers = allSubscribers.slice(
        startIndex,
        startIndex + pageSize,
      );

      return {
        subscribers: paginatedSubscribers,
        total,
        page,
        pageSize,
        totalPages,
      };
    } catch (error) {
      console.error("Error in findAll:", error);
      return {
        subscribers: [],
        total: 0,
        page: 1,
        pageSize: 10,
        totalPages: 0,
      };
    }
  }
}

const SubscriberModel = new SubscriberSchema();
export default SubscriberModel;
