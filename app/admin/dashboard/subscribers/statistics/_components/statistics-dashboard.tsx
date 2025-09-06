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
import { SubscriberStatistics } from "./subscriber-statistics";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
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
              title="Subscriber Statistics"
              description="View subscriber analytics and trends"
            />
          </div>

          <Link href="/admin/dashboard">
            <Button variant="outline">
              <ArrowLeft className=" h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
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
            title="Subscriber Statistics"
            description="View subscriber analytics and trends"
          />
          <Link href="/admin/dashboard/subscribers">
            <Button variant="outline">
              <ArrowLeft className=" h-4 w-4" />
              Back to Subscribers
            </Button>
          </Link>
        </div>

        <Separator />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Subscribers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SubscriberStatistics.TotalCount />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Subscribers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SubscriberStatistics.ActiveCount />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Retention Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SubscriberStatistics.RetentionRate />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <SubscriberStatistics.GrowthRate />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Daily Subscriber Growth</CardTitle>
              <CardDescription>
                Subscriber growth over the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <SubscriberStatistics.DailyChart />
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Status Distribution</CardTitle>
              <CardDescription>
                Distribution of subscribers by status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SubscriberStatistics.StatusDistribution />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
