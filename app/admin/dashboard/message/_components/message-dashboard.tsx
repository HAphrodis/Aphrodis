"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PageContainer from "@/components/layouts/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { MessageDataFetcher } from "./message-data-fetcher";
import MessageListingPage from "./message-listing";
import { MotionConfig } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import type { Message, MessagePagination, MessageStats } from "@/types/message";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart2 } from "lucide-react";
import Link from "next/link";

export default function MessageDashboard() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<MessageStats | null>(null);
  const [pagination, setPagination] = useState<MessagePagination>({
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
          queryParams[key] = value;
        });

        // Add default values
        queryParams.page = queryParams.page || 1;
        queryParams.pageSize = queryParams.pageSize || 10;

        // Map legacy status filters to new API format
        if (queryParams.archived === "true") {
          queryParams.status = "archived";
        } else if (queryParams.read === "read") {
          queryParams.status = "read";
        } else if (queryParams.read === "unread") {
          queryParams.status = "unread";
        }

        // Add search query
        if (queryParams.q) {
          queryParams.search = queryParams.q;
        }

        // Add sort parameters
        queryParams.sortBy = queryParams.sortBy || "timestamp";
        queryParams.sortOrder = queryParams.sortOrder || "desc";

        // Fetch messages data
        const result = await MessageDataFetcher(queryParams);
        setMessages(result.messages);
        setStats(result.stats);
        setPagination(result.pagination);
      } catch (err) {
        console.error("Error fetching messages:", err);
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
    return (
      <PageContainer>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <Heading title="Messages" description="Manage messages" />

            <div className="flex my-auto items-center justify-center gap-2">
              <Link href="/admin/dashboard/message/statistics">
                <Button variant="outline" size="icon" title="View Statistics">
                  <BarChart2 className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/admin/dashboard">
                <Button variant="outline">
                  <ArrowLeft className=" h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
          <Separator />
          <Skeleton className="h-[500px] w-full" />
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <Heading title="Messages" description="Manage messages" />

            <div className="flex my-auto items-center justify-center gap-2">
              <Link href="/admin/dashboard/message/statistics">
                <Button variant="outline" size="icon" title="View Statistics">
                  <BarChart2 className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/admin/dashboard">
                <Button variant="outline">
                  <ArrowLeft className=" h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
          <Separator />
          <div className="rounded-md bg-red-50 p-4 text-red-700">
            <p>Error loading messages: {error}</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!stats) {
    return (
      <PageContainer>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <Heading title="Messages" description="Manage messages" />
          </div>
          <Separator />
          <div className="rounded-md bg-yellow-50 p-4 text-yellow-700">
            <p>No message data available.</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <PageContainer>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <Heading title="Messages" description="Manage messages" />

            <div className="flex my-auto items-center justify-center gap-2">
              <Link href="/admin/dashboard/message/statistics">
                <Button variant="outline" size="icon" title="View Statistics">
                  <BarChart2 className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/admin/dashboard">
                <Button variant="outline">
                  <ArrowLeft className=" h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>

          <Separator />

          <MessageListingPage
            initialMessages={messages}
            stats={stats}
            pagination={pagination}
            initialFilters={{
              archived: searchParams.get("status") === "archived",
              read:
                searchParams.get("status") === "read"
                  ? "read"
                  : searchParams.get("status") === "unread"
                    ? "unread"
                    : "all",
            }}
          />
        </div>
      </PageContainer>
    </MotionConfig>
  );
}
