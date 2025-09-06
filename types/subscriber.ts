// types\subscriber.ts
export interface Subscriber {
  id: string;
  email: string;
  name: string;
  timestamp: string;
  status: "active" | "unsubscribed";
  unsubscribedAt?: string;
  ipHash?: string;
}

export interface SubscriberFilters {
  status?: "active" | "unsubscribed";
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: "timestamp" | "email";
  sortOrder?: "asc" | "desc";
}

export interface SubscriberStats {
  total: number;
  active: number;
  unsubscribed: number;
}

export interface SubscriberPagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface SubscriberResponse {
  subscribers: Subscriber[];
  stats: SubscriberStats;
}

// For backward compatibility with existing components
export interface LegacySubscriber {
  id: string;
  names: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Adapter function to convert new subscriber format to legacy format for existing components
export function adaptSubscriberToLegacy(
  subscriber: Subscriber,
): LegacySubscriber {
  return {
    id: subscriber.id,
    names: subscriber.name,
    email: subscriber.email,
    createdAt: subscriber.timestamp,
    updatedAt: subscriber.timestamp,
  };
}

// Adapter function to convert legacy format to new subscriber format
export function adaptLegacyToSubscriber(
  legacy: LegacySubscriber,
): Partial<Subscriber> {
  return {
    id: legacy.id,
    name: legacy.names,
    email: legacy.email,
    timestamp: legacy.createdAt,
    status: "active", // Default status
  };
}
