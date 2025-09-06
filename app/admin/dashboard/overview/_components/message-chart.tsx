"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Archive, Inbox, Star, Mail, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { apiService } from "@/lib/axios";
import { Skeleton } from "@/components/ui/skeleton";

interface StatisticsData {
  totalMessages: number;
  unreadMessages: number;
  starredMessages: number;
  archivedMessages: number;
  totalSubscribers: number;
}

interface ApiResponse {
  data: StatisticsData;
  message: string;
  success: boolean;
}

export function MessageStatistics() {
  const [data, setData] = useState<StatisticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await apiService.get<ApiResponse>("/statistics");
        setData(result.data);
      } catch (err) {
        console.error("error", err);
        setError("An error occurred while fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <StatisticsSkeletons />;
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        <p>{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4">
        <p>No statistics data available.</p>
      </div>
    );
  }

  const stats = [
    { title: "Total Messages", value: data.totalMessages, icon: Mail },
    { title: "Unread Messages", value: data.unreadMessages, icon: Inbox },
    { title: "Starred Messages", value: data.starredMessages, icon: Star },
    { title: "Archived Messages", value: data.archivedMessages, icon: Archive },
    { title: "Total Subscribers", value: data.totalSubscribers, icon: Users },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function StatisticsSkeletons() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {[...Array(5)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <Skeleton className="h-4 w-[100px]" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-[60px]" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
