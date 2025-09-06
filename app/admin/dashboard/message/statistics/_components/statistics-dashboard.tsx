"use client";

import { useEffect, useState } from "react";
import PageContainer from "@/components/layouts/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageStatistics } from "./message-statistics";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function StatisticsDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <PageContainer>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <Heading
              title="Message Statistics"
              description="View message analytics and trends"
            />
          </div>

          <Button variant="outline" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Message
          </Button>
          <Separator />
          <Skeleton className="h-[500px] w-full" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Message Statistics"
            description="View message analytics and trends"
          />
        </div>
        <Separator />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MessageStatistics.TotalCount />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Unread Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MessageStatistics.UnreadCount />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Response Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MessageStatistics.ResponseRate />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <MessageStatistics.GrowthRate />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Daily Message Volume</CardTitle>
              <CardDescription>
                Message volume over the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <MessageStatistics.DailyChart />
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Status Distribution</CardTitle>
              <CardDescription>
                Distribution of messages by status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MessageStatistics.StatusDistribution />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
