export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  status: "unread" | "read" | "replied" | "archived";
  ipHash: string;
  [key: string]: string | undefined; // <-- allows dynamic indexing
}

export interface MessageStats {
  total: number;
  unread: number;
  read: number;
  replied: number;
  archived: number;
}

export interface MessagePagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface MessageResponse {
  messages: Message[];
  stats: MessageStats;
}

export interface MessageStatistics {
  counts: {
    total: number;
    unread: number;
    read: number;
    replied: number;
    archived: number;
  };
  trends: {
    messagesByDay: { date: string; count: number }[];
    averagePerDay: number;
    mostActiveDay: { date: string; count: number } | null;
    growthRate: number;
  };
  distribution: {
    status: {
      unread: number;
      read: number;
      replied: number;
      archived: number;
    };
  };
  lastUpdated: string;
}

// For backward compatibility with existing components
export interface LegacyMessage {
  _id: string;
  id: string;
  sender_names: string;
  content: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
  archived: boolean;
  sender_email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Adapter function to convert new message format to legacy format for existing components
export function adaptMessageToLegacy(message: Message): LegacyMessage {
  return {
    _id: message.id,
    id: message.id,
    sender_names: message.name,
    content: message.message,
    timestamp: message.timestamp,
    read:
      message.status === "read" ||
      message.status === "replied" ||
      message.status === "archived",
    starred: false, // Not supported in new API
    archived: message.status === "archived",
    sender_email: message.email,
    createdAt: message.timestamp,
    updatedAt: message.timestamp,
    __v: 0,
  };
}

// Adapter function to convert legacy format to new message format
export function adaptLegacyToMessage(legacy: LegacyMessage): Partial<Message> {
  let status: Message["status"] = "unread";
  if (legacy.archived) {
    status = "archived";
  } else if (legacy.read) {
    status = "read";
  }

  return {
    id: legacy.id,
    name: legacy.sender_names,
    email: legacy.sender_email,
    message: legacy.content,
    timestamp: legacy.timestamp,
    status,
  };
}