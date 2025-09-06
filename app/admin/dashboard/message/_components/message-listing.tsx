"use client";

import type { Message, MessagePagination, MessageStats } from "@/types/message";
import { DataTable as MessageTable } from "@/components/ui/table/data-table";
import { createColumns } from "./message-tables/columns";
import MessageTableAction from "./message-tables/message-table-action";
import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { SortingState } from "@tanstack/react-table";
import { MessageDataFetcher } from "./message-data-fetcher";

type MessageListingPageProps = {
  initialMessages: Message[];
  stats: MessageStats;
  pagination: MessagePagination;
  initialFilters: {
    archived: boolean;
    read: "all" | "read" | "unread";
  };
};

export default function MessageListingPage({
  initialMessages,
  pagination,
  initialFilters,
}: MessageListingPageProps) {
  const [messages, setMessages] = useState(initialMessages);
  // Removed unused messageStats state
  const [messagePagination, setMessagePagination] = useState(pagination);
  const tableRef = useRef<HTMLTableElement>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters] = useState(initialFilters);

  const fetchMessages = useCallback(
    async (queryParams: Record<string, string | number | undefined>) => {
      try {
        const { messages, pagination } = await MessageDataFetcher(queryParams);
        setMessages(messages);
        setMessagePagination(pagination);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
    [],
  );

  const handleRefresh = useCallback(() => {
    // Map filters to query params
    const queryParams: Record<string, string | number | undefined> = {
      page: messagePagination?.page || 1,
      pageSize: messagePagination?.pageSize || 10,
    };

    // Map status filters
    if (filters.archived) {
      queryParams.status = "archived";
    } else if (filters.read === "read") {
      queryParams.status = "read";
    } else if (filters.read === "unread") {
      queryParams.status = "unread";
    }

    fetchMessages(queryParams);
  }, [fetchMessages, messagePagination, filters]);

  const columns = createColumns({ onRefresh: handleRefresh });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <MessageTableAction
        data={messages}
        tableRef={tableRef}
        onRefresh={handleRefresh}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <MessageTable
          columns={columns}
          data={messages}
          totalItems={messagePagination?.totalItems || 0}
          tableRef={tableRef}
          getRowClassName={(row) =>
            row.original.status === "unread"
              ? "bg-blue-100/80 dark:bg-blue-900/20"
              : ""
          }
          sorting={sorting}
          onSortingChange={setSorting}
        />
      </motion.div>
    </motion.div>
  );
}
