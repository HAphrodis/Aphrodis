import { RedisSchema, RedisIndex } from "@/lib/redis-schema";

export interface Message {
  id: string;
  name?: string;
  email: string;
  message: string;
  timestamp: string;
  status: "unread" | "read" | "replied" | "archived";
  ipHash: string;
}

export interface MessageListResponse {
  messages: Message[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface MessageFilters {
  status?: "unread" | "read" | "replied" | "archived";
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: "timestamp" | "email";
  sortOrder?: "asc" | "desc";
}

class MessageSchema extends RedisSchema {
  private emailIndex: RedisIndex;
  private statusIndex: RedisIndex;

  constructor() {
    super("message");
    this.emailIndex = new RedisIndex("message");
    this.statusIndex = new RedisIndex("message");
  }

  async create(data: Partial<Message>): Promise<Message> {
    // Set default values
    const now = new Date().toISOString();
    const messageData = {
      timestamp: now,
      status: "unread",
      ...data,
    };

    // Create the message
    const result = await super.create(messageData);

    // Create indexes
    if (data.email) {
      await this.emailIndex.set("email", data.email, result.id);
    }
    if (data.status) {
      await this.statusIndex.set("status", data.status, result.id);
    } else {
      await this.statusIndex.set("status", "unread", result.id);
    }

    return result as Message;
  }

  async findByEmail(email: string): Promise<Message[]> {
    const allMessages = await this.getAll();
    return allMessages.filter(
      (message) => message.email === email,
    ) as Message[];
  }

  async findByStatus(status: string): Promise<Message[]> {
    const allMessages = await this.getAll();
    return allMessages.filter(
      (message) => message.status === status,
    ) as Message[];
  }

  async countDocuments(filter: Partial<Message> = {}): Promise<number> {
    const allMessages = await this.getAll();

    if (Object.keys(filter).length === 0) {
      return allMessages.length;
    }

    const filteredMessages = allMessages.filter((message) => {
      return Object.entries(filter).every(([key, value]) => {
        return message[key] === value;
      });
    });

    return filteredMessages.length;
  }

  async getMessagesByMonth(startDate: Date): Promise<Record<string, number>> {
    const allMessages = await this.getAll();
    const messagesByMonth: Record<string, number> = {};

    allMessages.forEach((message) => {
      const timestamp = new Date(message.timestamp);
      if (timestamp >= startDate) {
        const monthKey = `${timestamp.getFullYear()}-${String(timestamp.getMonth() + 1).padStart(2, "0")}`;
        messagesByMonth[monthKey] = (messagesByMonth[monthKey] || 0) + 1;
      }
    });

    return messagesByMonth;
  }

  async findAll(filters: MessageFilters = {}): Promise<MessageListResponse> {
    const {
      status,
      search,
      page = 1,
      pageSize = 10,
      sortBy = "timestamp",
      sortOrder = "desc",
    } = filters;

    let allMessages = (await this.getAll()) as Message[];

    // Apply status filter
    if (status) {
      allMessages = allMessages.filter((message) => message.status === status);
    }

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      allMessages = allMessages.filter(
        (message) =>
          message.email.toLowerCase().includes(searchLower) ||
          (message.name && message.name.toLowerCase().includes(searchLower)) ||
          message.message.toLowerCase().includes(searchLower),
      );
    }

    // Sort messages
    allMessages.sort((a, b) => {
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
    const total = allMessages.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const paginatedMessages = allMessages.slice(
      startIndex,
      startIndex + pageSize,
    );

    return {
      messages: paginatedMessages,
      total,
      page,
      pageSize,
      totalPages,
    };
  }
}

const MessageModel = new MessageSchema();
export default MessageModel;
