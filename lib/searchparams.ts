import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const searchParams = {
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(10),
  q: parseAsString, // Search query
  status: parseAsString, // Message status (unread, read, replied, archived)
  sortBy: parseAsString.withDefault("timestamp"),
  sortOrder: parseAsString.withDefault("desc"),
  // Legacy params for backward compatibility
  archived: parseAsString,
  read: parseAsString,
  categories: parseAsString,
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const serialize = createSerializer(searchParams);
