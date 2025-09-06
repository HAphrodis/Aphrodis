// services\subscriber-service.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from "uuid";
import redis from "@/lib/redis";
import type { Subscriber, SubscriberFilters } from "@/types/subscriber";

const SUBSCRIBER_KEY_PREFIX = "subscriber:";
const SUBSCRIBERS_SET = "subscribers";
const SUBSCRIBERS_BY_STATUS_PREFIX = "subscribers:status:";

export async function createSubscriber(data: {
  name?: string;
  email: string;
  ipHash?: string;
  status?: "active" | "unsubscribed";
}): Promise<Subscriber> {
  const id = uuidv4();
  const timestamp = new Date().toISOString();

  const subscriber: Subscriber = {
    id,
    name: data.name || "Newsletter Subscriber", 
    email: data.email,
    timestamp, 
    status: "active", 
    ipHash: data.ipHash, 
  };

  const pipeline = redis.pipeline();

  // Store the subscriber as a hash
  pipeline.hset(`${SUBSCRIBER_KEY_PREFIX}${id}`, subscriber as any);

  // Add to the sorted set of all subscribers
  pipeline.zadd(SUBSCRIBERS_SET, new Date(timestamp).getTime(), id);

  // Add to the set of active subscribers
  pipeline.sadd(`${SUBSCRIBERS_BY_STATUS_PREFIX}active`, id);

  await pipeline.exec();
  return subscriber;
}

export async function getSubscriber(id: string): Promise<Subscriber | null> {
  const subscriberData = await redis.hgetall(`${SUBSCRIBER_KEY_PREFIX}${id}`);

  if (!subscriberData || Object.keys(subscriberData).length === 0) {
    return null;
  }

  return subscriberData as unknown as Subscriber;
}

export async function getSubscribers(filters: SubscriberFilters = {}): Promise<{
  subscribers: Subscriber[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}> {
  const {
    status,
    search,
    page = 1,
    pageSize = 10,
    sortBy = "timestamp",
    sortOrder = "desc",
  } = filters;

  // Get subscriber IDs based on filters
  let subscriberIds: string[] = [];

  if (status) {
    // Get subscribers with specific status
    subscriberIds = await redis.smembers(
      `${SUBSCRIBERS_BY_STATUS_PREFIX}${status}`,
    );
  } else {
    // Get all subscriber IDs from the sorted set
    subscriberIds =
      sortOrder === "desc"
        ? await redis.zrevrange(SUBSCRIBERS_SET, 0, -1)
        : await redis.zrange(SUBSCRIBERS_SET, 0, -1);
  }

  // Calculate pagination
  const total = subscriberIds.length;
  const totalPages = Math.ceil(total / pageSize) || 1; // Ensure at least 1 page
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);
  const paginatedIds = subscriberIds.slice(startIndex, endIndex);

  // Get subscriber data for paginated IDs
  const subscribers: Subscriber[] = [];

  if (paginatedIds.length > 0) {
    const pipeline = redis.pipeline();

    for (const id of paginatedIds) {
      pipeline.hgetall(`${SUBSCRIBER_KEY_PREFIX}${id}`);
    }

    const results = await pipeline.exec();

    if (results) {
      for (const [error, data] of results) {
        if (!error && data && Object.keys(data).length > 0) {
          const subscriber = data as unknown as Subscriber;

          // Apply search filter if provided
          if (search) {
            const searchLower = search.toLowerCase();
            const matchesSearch =
              subscriber.email.toLowerCase().includes(searchLower) ||
              subscriber.name?.toLowerCase().includes(searchLower);

            if (matchesSearch) {
              subscribers.push(subscriber);
            }
          } else {
            subscribers.push(subscriber);
          }
        }
      }
    }
  }

  // Sort subscribers if needed
  if (sortBy) {
    subscribers.sort((a, b) => {
      if (sortBy === "timestamp") {
        return sortOrder === "desc"
          ? new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          : new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      } else if (sortBy === "email") {
        return sortOrder === "desc"
          ? b.email.localeCompare(a.email)
          : a.email.localeCompare(b.email);
      }
      return 0;
    });
  }

  return {
    subscribers,
    total,
    page,
    pageSize,
    totalPages,
  };
}

export async function updateSubscriber(
  id: string,
  data: Partial<Subscriber>,
): Promise<Subscriber | null> {
  const subscriber = await getSubscriber(id);

  if (!subscriber) {
    return null;
  }

  const updatedSubscriber = { ...subscriber, ...data };

  // If status is changing, update the status sets
  if (data.status && data.status !== subscriber.status) {
    const pipeline = redis.pipeline();

    // Remove from old status set
    pipeline.srem(`${SUBSCRIBERS_BY_STATUS_PREFIX}${subscriber.status}`, id);

    // Add to new status set
    pipeline.sadd(`${SUBSCRIBERS_BY_STATUS_PREFIX}${data.status}`, id);

    await pipeline.exec();
  }

  // Update subscriber hash
  await redis.hset(`${SUBSCRIBER_KEY_PREFIX}${id}`, updatedSubscriber as any);

  return updatedSubscriber;
}

export async function unsubscribe(id: string): Promise<Subscriber | null> {
  const subscriber = await getSubscriber(id);

  if (!subscriber) {
    return null;
  }

  const unsubscribedAt = new Date().toISOString();
  const updatedSubscriber = {
    ...subscriber,
    status: "unsubscribed" as const,
    unsubscribedAt,
  };

  const pipeline = redis.pipeline();

  // Remove from active set
  pipeline.srem(`${SUBSCRIBERS_BY_STATUS_PREFIX}active`, id);

  // Add to unsubscribed set
  pipeline.sadd(`${SUBSCRIBERS_BY_STATUS_PREFIX}unsubscribed`, id);

  // Update subscriber hash
  pipeline.hset(`${SUBSCRIBER_KEY_PREFIX}${id}`, updatedSubscriber as any);

  await pipeline.exec();

  return updatedSubscriber;
}

export async function unsubscribeByEmail(
  email: string,
): Promise<Subscriber | null> {
  // Get all subscriber IDs
  const subscriberIds = await redis.zrange(SUBSCRIBERS_SET, 0, -1);

  // Find the subscriber with the matching email
  for (const id of subscriberIds) {
    const subscriber = await getSubscriber(id);
    if (subscriber && subscriber.email.toLowerCase() === email.toLowerCase()) {
      return unsubscribe(id);
    }
  }

  return null;
}

export async function deleteSubscriber(id: string): Promise<boolean> {
  const subscriber = await getSubscriber(id);

  if (!subscriber) {
    return false;
  }

  const pipeline = redis.pipeline();

  // Remove from status set
  pipeline.srem(`${SUBSCRIBERS_BY_STATUS_PREFIX}${subscriber.status}`, id);

  // Remove from subscribers sorted set
  pipeline.zrem(SUBSCRIBERS_SET, id);

  // Delete the subscriber hash
  pipeline.del(`${SUBSCRIBER_KEY_PREFIX}${id}`);

  await pipeline.exec();

  return true;
}

export async function getSubscriberStats(): Promise<{
  total: number;
  active: number;
  unsubscribed: number;
}> {
  const pipeline = redis.pipeline();

  pipeline.zcard(SUBSCRIBERS_SET);
  pipeline.scard(`${SUBSCRIBERS_BY_STATUS_PREFIX}active`);
  pipeline.scard(`${SUBSCRIBERS_BY_STATUS_PREFIX}unsubscribed`);

  const results = await pipeline.exec();

  if (!results) {
    return {
      total: 0,
      active: 0,
      unsubscribed: 0,
    };
  }

  return {
    total: (results[0][1] as number) || 0,
    active: (results[1][1] as number) || 0,
    unsubscribed: (results[2][1] as number) || 0,
  };
}

export async function getSubscriberByEmail(
  email: string,
): Promise<Subscriber | null> {
  // Get all subscriber IDs
  const subscriberIds = await redis.zrange(SUBSCRIBERS_SET, 0, -1);

  // Find the subscriber with the matching email
  for (const id of subscriberIds) {
    const subscriber = await getSubscriber(id);
    if (subscriber && subscriber.email.toLowerCase() === email.toLowerCase()) {
      return subscriber;
    }
  }

  return null;
}

export async function getDetailedSubscriberStats(): Promise<{
  totalSubscribers: number;
  activeSubscribers: number;
  unsubscribedSubscribers: number;
  subscribersByDay: { date: string; count: number }[];
}> {
  // Get basic stats
  const stats = await getSubscriberStats();

  // Get all subscriber IDs from the sorted set
  const subscriberIds = await redis.zrange(SUBSCRIBERS_SET, 0, -1);

  // Get all subscribers to analyze timestamps
  const subscribers: Subscriber[] = [];

  if (subscriberIds.length > 0) {
    const pipeline = redis.pipeline();

    for (const id of subscriberIds) {
      pipeline.hgetall(`${SUBSCRIBER_KEY_PREFIX}${id}`);
    }

    const results = await pipeline.exec();

    if (results) {
      for (const [error, data] of results) {
        if (!error && data && Object.keys(data).length > 0) {
          subscribers.push(data as unknown as Subscriber);
        }
      }
    }
  }

  // Calculate subscribers by day for the last 30 days
  const last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - 30);

  // Filter subscribers from the last 30 days
  const recentSubscribers = subscribers.filter(
    (sub) => new Date(sub.timestamp) >= last30Days,
  );

  // Group by day
  const subscribersByDayMap = new Map<string, number>();

  recentSubscribers.forEach((subscriber) => {
    const date = new Date(subscriber.timestamp).toISOString().split("T")[0]; // YYYY-MM-DD format
    const currentCount = subscribersByDayMap.get(date) || 0;
    subscribersByDayMap.set(date, currentCount + 1);
  });

  // Convert map to array and sort by date
  const subscribersByDay = Array.from(subscribersByDayMap.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    totalSubscribers: stats.total,
    activeSubscribers: stats.active,
    unsubscribedSubscribers: stats.unsubscribed,
    subscribersByDay,
  };
}

/**
 * Gets subscriber trends and analytics
 */
export async function getSubscriberAnalytics(): Promise<{
  averageSubscribersPerDay: number;
  mostActiveDay: { date: string; count: number } | null;
  statusDistribution: { [key: string]: number };
  growthRate: number;
}> {
  // Get detailed stats first
  const {
    subscribersByDay,
    totalSubscribers,
    activeSubscribers,
    unsubscribedSubscribers,
  } = await getDetailedSubscriberStats();

  // Calculate average subscribers per day
  const totalDays = subscribersByDay.length || 1; // Avoid division by zero
  const totalRecentSubscribers = subscribersByDay.reduce(
    (sum, day) => sum + day.count,
    0,
  );
  const averageSubscribersPerDay = totalRecentSubscribers / totalDays;

  // Find most active day
  const mostActiveDay =
    subscribersByDay.length > 0
      ? subscribersByDay.reduce(
          (max, day) => (day.count > max.count ? day : max),
          subscribersByDay[0],
        )
      : null;

  // Calculate status distribution percentages
  const statusDistribution = {
    active:
      totalSubscribers > 0 ? (activeSubscribers / totalSubscribers) * 100 : 0,
    unsubscribed:
      totalSubscribers > 0
        ? (unsubscribedSubscribers / totalSubscribers) * 100
        : 0,
  };

  // Calculate growth rate (comparing last 15 days to previous 15 days)
  let growthRate = 0;

  if (subscribersByDay.length > 0) {
    const midpoint = Math.floor(subscribersByDay.length / 2);
    const recentPeriod = subscribersByDay.slice(midpoint);
    const previousPeriod = subscribersByDay.slice(0, midpoint);

    const recentCount = recentPeriod.reduce((sum, day) => sum + day.count, 0);
    const previousCount = previousPeriod.reduce(
      (sum, day) => sum + day.count,
      0,
    );

    if (previousCount > 0) {
      growthRate = ((recentCount - previousCount) / previousCount) * 100;
    } else if (recentCount > 0) {
      growthRate = 100; // If previous period had 0 subscribers but recent has some, that's 100% growth
    }
  }

  return {
    averageSubscribersPerDay,
    mostActiveDay,
    statusDistribution,
    growthRate,
  };
}
