"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DataTable as SubscriberTable } from "@/components/ui/table/data-table2";
import { columns } from "./subscriber-tables/columns";
import { SubscriberDataFetcher } from "./subscriber-data-fetcher";
import type {
  Subscriber,
  SubscriberPagination,
  SubscriberStats,
} from "@/types/subscriber";
import { Skeleton } from "@/components/ui/skeleton";
import SubscriberTableAction from "./subscriber-tables/subscriber-table-action";
import { motion } from "framer-motion";

export default function SubscriberListingPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [stats, setStats] = useState<SubscriberStats | null>(null);
  const [pagination, setPagination] = useState<SubscriberPagination>({
    page: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Convert searchParams to object
        const queryParams: Record<string, string | number | undefined> = {};
        searchParams.forEach((value, key) => {
          // For any filter that might have multiple values, only take the first one
          if (key === "status") {
            queryParams[key] = value.split(".")[0];
          } else {
            queryParams[key] = value;
          }
        });

        // Add default values
        queryParams.page = queryParams.page || 1;
        queryParams.pageSize = queryParams.pageSize || 10;

        // Add search query
        if (queryParams.q) {
          queryParams.search = queryParams.q;
        }

        // Add sort parameters
        queryParams.sortBy = queryParams.sortBy || "timestamp";
        queryParams.sortOrder = queryParams.sortOrder || "desc";

        // Fetch subscribers data
        const result = await SubscriberDataFetcher(queryParams);
        setSubscribers(result.subscribers);
        setStats(result.stats);
        setPagination(result.pagination);
      } catch (err) {
        console.error("Error fetching subscribers:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [searchParams]);

  if (loading) {
    return <Skeleton className="h-[500px] w-full" />;
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-red-700">
        <p>Error loading subscribers: {error}</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="rounded-md bg-yellow-50 p-4 text-yellow-700">
        <p>No subscriber data available.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SubscriberTableAction data={subscribers} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <SubscriberTable
          columns={columns}
          data={subscribers}
          totalItems={pagination.totalItems}
          getRowClassName={(row) =>
            row.original.status === "unsubscribed"
              ? "bg-red-100/80 dark:bg-red-900/20"
              : ""
          }
        />
      </motion.div>
    </motion.div>
  );
}
