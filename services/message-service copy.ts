/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from "uuid";
import redis from "@/lib/redis";
import type { Message, MessageFilters } from "@/models/Message";

const MESSAGE_KEY_PREFIX = "message:";
const MESSAGES_SET = "messages";
const MESSAGES_BY_STATUS_PREFIX = "messages:status:";

export async function createMessage(data: {
  name?: string;
  email: string;
  message: string;
  ipHash: string;
}): Promise<Message> {
  const id = uuidv4();
  const timestamp = new Date().toISOString();

  const message: Message = {
    id,
    name: data.name || "Portfolio Visitor",
    email: data.email,
    message: data.message,
    timestamp,
    status: "unread",
    ipHash: data.ipHash,
  };

  const pipeline = redis.pipeline();

  // Store the message as a hash
  pipeline.hset(`${MESSAGE_KEY_PREFIX}${id}`, message as any);

  // Add to the sorted set of all messages
  pipeline.zadd(MESSAGES_SET, new Date(timestamp).getTime(), id);

  // Add to the set of unread messages
  pipeline.sadd(`${MESSAGES_BY_STATUS_PREFIX}unread`, id);

  await pipeline.exec();

  return message;
}

export async function getMessage(id: string): Promise<Message | null> {
  const messageData = await redis.hgetall(`${MESSAGE_KEY_PREFIX}${id}`);

  if (!messageData || Object.keys(messageData).length === 0) {
    return null;
  }

  return messageData as unknown as Message;
}

export async function getMessages(filters: MessageFilters = {}): Promise<{
  messages: Message[];
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

  // Get message IDs based on filters
  let messageIds: string[] = [];

  if (status) {
    // Get messages with specific status
    messageIds = await redis.smembers(`${MESSAGES_BY_STATUS_PREFIX}${status}`);
  } else {
    // Get all message IDs from the sorted set
    // Fix: Use zrange with proper parameters for Redis
    messageIds =
      sortOrder === "desc"
        ? await redis.zrevrange(MESSAGES_SET, 0, -1)
        : await redis.zrange(MESSAGES_SET, 0, -1);
  }

  // Calculate pagination
  const total = messageIds.length;
  const totalPages = Math.ceil(total / pageSize) || 1; // Ensure at least 1 page
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);
  const paginatedIds = messageIds.slice(startIndex, endIndex);

  // Get message data for paginated IDs
  const messages: Message[] = [];

  if (paginatedIds.length > 0) {
    const pipeline = redis.pipeline();

    for (const id of paginatedIds) {
      pipeline.hgetall(`${MESSAGE_KEY_PREFIX}${id}`);
    }

    const results = await pipeline.exec();

    if (results) {
      for (const [error, data] of results) {
        if (!error && data && Object.keys(data).length > 0) {
          const message = data as unknown as Message;

          // Apply search filter if provided
          if (search) {
            const searchLower = search.toLowerCase();
            const matchesSearch =
              message.email.toLowerCase().includes(searchLower) ||
              message.name?.toLowerCase().includes(searchLower) ||
              message.message.toLowerCase().includes(searchLower);

            if (matchesSearch) {
              messages.push(message);
            }
          } else {
            messages.push(message);
          }
        }
      }
    }
  }

  // Sort messages if needed
  if (sortBy) {
    messages.sort((a, b) => {
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

  // Add debug logging
  // console.log(`Found ${total} total messages, returning ${messages.length} messages for page ${page}`)

  return {
    messages,
    total,
    page,
    pageSize,
    totalPages,
  };
}

export async function updateMessageStatus(
  id: string,
  status: Message["status"],
): Promise<Message | null> {
  const message = await getMessage(id);

  if (!message) {
    return null;
  }

  const pipeline = redis.pipeline();

  // Remove from old status set
  pipeline.srem(`${MESSAGES_BY_STATUS_PREFIX}${message.status}`, id);

  // Add to new status set
  pipeline.sadd(`${MESSAGES_BY_STATUS_PREFIX}${status}`, id);

  // Update message hash
  pipeline.hset(`${MESSAGE_KEY_PREFIX}${id}`, "status", status);

  await pipeline.exec();

  return {
    ...message,
    status,
  };
}

export async function deleteMessage(id: string): Promise<boolean> {
  const message = await getMessage(id);

  if (!message) {
    return false;
  }

  const pipeline = redis.pipeline();

  // Remove from status set
  pipeline.srem(`${MESSAGES_BY_STATUS_PREFIX}${message.status}`, id);

  // Remove from messages sorted set
  pipeline.zrem(MESSAGES_SET, id);

  // Delete the message hash
  pipeline.del(`${MESSAGE_KEY_PREFIX}${id}`);

  await pipeline.exec();

  return true;
}

export async function getMessageStats(): Promise<{
  total: number;
  unread: number;
  read: number;
  replied: number;
  archived: number;
}> {
  const pipeline = redis.pipeline();

  pipeline.zcard(MESSAGES_SET);
  pipeline.scard(`${MESSAGES_BY_STATUS_PREFIX}unread`);
  pipeline.scard(`${MESSAGES_BY_STATUS_PREFIX}read`);
  pipeline.scard(`${MESSAGES_BY_STATUS_PREFIX}replied`);
  pipeline.scard(`${MESSAGES_BY_STATUS_PREFIX}archived`);

  const results = await pipeline.exec();

  if (!results) {
    return {
      total: 0,
      unread: 0,
      read: 0,
      replied: 0,
      archived: 0,
    };
  }

  return {
    total: (results[0][1] as number) || 0,
    unread: (results[1][1] as number) || 0,
    read: (results[2][1] as number) || 0,
    replied: (results[3][1] as number) || 0,
    archived: (results[4][1] as number) || 0,
  };
}

/**
 * Gets detailed message statistics including daily counts
 */
export async function getDetailedMessageStats(): Promise<{
  totalMessages: number;
  unreadMessages: number;
  readMessages: number;
  repliedMessages: number;
  archivedMessages: number;
  messagesByDay: { date: string; count: number }[];
}> {
  // Get basic stats
  const stats = await getMessageStats();

  // Get all message IDs from the sorted set
  const messageIds = await redis.zrange(MESSAGES_SET, 0, -1);

  // Get all messages to analyze timestamps
  const messages: Message[] = [];

  if (messageIds.length > 0) {
    const pipeline = redis.pipeline();

    for (const id of messageIds) {
      pipeline.hgetall(`${MESSAGE_KEY_PREFIX}${id}`);
    }

    const results = await pipeline.exec();

    if (results) {
      for (const [error, data] of results) {
        if (!error && data && Object.keys(data).length > 0) {
          messages.push(data as unknown as Message);
        }
      }
    }
  }

  // Calculate messages by day for the last 30 days
  const last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - 30);

  // Filter messages from the last 30 days
  const recentMessages = messages.filter(
    (msg) => new Date(msg.timestamp) >= last30Days,
  );

  // Group by day
  const messagesByDayMap = new Map<string, number>();

  recentMessages.forEach((message) => {
    const date = new Date(message.timestamp).toISOString().split("T")[0]; // YYYY-MM-DD format
    const currentCount = messagesByDayMap.get(date) || 0;
    messagesByDayMap.set(date, currentCount + 1);
  });

  // Convert map to array and sort by date
  const messagesByDay = Array.from(messagesByDayMap.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    totalMessages: stats.total,
    unreadMessages: stats.unread,
    readMessages: stats.read,
    repliedMessages: stats.replied,
    archivedMessages: stats.archived,
    messagesByDay,
  };
}

/**
 * Gets message trends and analytics
 */
export async function getMessageAnalytics(): Promise<{
  averageMessagesPerDay: number;
  mostActiveDay: { date: string; count: number } | null;
  statusDistribution: { [key: string]: number };
  growthRate: number;
}> {
  // Get detailed stats first
  const {
    messagesByDay,
    totalMessages,
    unreadMessages,
    readMessages,
    repliedMessages,
    archivedMessages,
  } = await getDetailedMessageStats();

  // Calculate average messages per day
  const totalDays = messagesByDay.length || 1; // Avoid division by zero
  const totalRecentMessages = messagesByDay.reduce(
    (sum, day) => sum + day.count,
    0,
  );
  const averageMessagesPerDay = totalRecentMessages / totalDays;

  // Find most active day
  const mostActiveDay =
    messagesByDay.length > 0
      ? messagesByDay.reduce(
          (max, day) => (day.count > max.count ? day : max),
          messagesByDay[0],
        )
      : null;

  // Calculate status distribution percentages
  const statusDistribution = {
    unread: totalMessages > 0 ? (unreadMessages / totalMessages) * 100 : 0,
    read: totalMessages > 0 ? (readMessages / totalMessages) * 100 : 0,
    replied: totalMessages > 0 ? (repliedMessages / totalMessages) * 100 : 0,
    archived: totalMessages > 0 ? (archivedMessages / totalMessages) * 100 : 0,
  };

  // Calculate growth rate (comparing last 15 days to previous 15 days)
  let growthRate = 0;

  if (messagesByDay.length > 0) {
    const midpoint = Math.floor(messagesByDay.length / 2);
    const recentPeriod = messagesByDay.slice(midpoint);
    const previousPeriod = messagesByDay.slice(0, midpoint);

    const recentCount = recentPeriod.reduce((sum, day) => sum + day.count, 0);
    const previousCount = previousPeriod.reduce(
      (sum, day) => sum + day.count,
      0,
    );

    if (previousCount > 0) {
      growthRate = ((recentCount - previousCount) / previousCount) * 100;
    } else if (recentCount > 0) {
      growthRate = 100; // If previous period had 0 messages but recent has some, that's 100% growth
    }
  }

  return {
    averageMessagesPerDay,
    mostActiveDay,
    statusDistribution,
    growthRate,
  };
}
