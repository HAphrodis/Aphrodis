"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import type { MessageStatistics as MessageStatsType } from "@/types/message";
import { apiService } from "@/lib/axios";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

interface ApiResponse {
  success: boolean;
  data: MessageStatsType;
  error?: {
    code: string;
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details?: any;
  };
}

// Hook to fetch message statistics
function useMessageStatistics() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<MessageStatsType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const result = await apiService.get<ApiResponse>(
          "/messages/statistics",
        );

        if (!result.success) {
          throw new Error(
            result.error?.message || "Failed to fetch statistics",
          );
        }

        setStats(result.data);
      } catch (err) {
        console.error("Error fetching message statistics:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
        toast.error("Failed to load message statistics");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, loading, error };
}

// Total Count Component
function TotalCount() {
  const { stats, loading } = useMessageStatistics();

  if (loading) {
    return <Skeleton className="h-10 w-full" />;
  }

  return (
    <div className="text-2xl font-bold">
      {stats?.counts.total.toLocaleString() || 0}
      <div className="text-xs text-muted-foreground">messages received</div>
    </div>
  );
}

// Unread Count Component
function UnreadCount() {
  const { stats, loading } = useMessageStatistics();

  if (loading) {
    return <Skeleton className="h-10 w-full" />;
  }

  const unreadCount = stats?.counts.unread || 0;
  const totalCount = stats?.counts.total || 1; // Avoid division by zero
  const percentage = Math.round((unreadCount / totalCount) * 100);

  return (
    <div className="text-2xl font-bold">
      {unreadCount.toLocaleString()}
      <div className="text-xs text-muted-foreground">
        {percentage}% of total messages
      </div>
    </div>
  );
}

// Response Rate Component
function ResponseRate() {
  const { stats, loading } = useMessageStatistics();

  if (loading) {
    return <Skeleton className="h-10 w-full" />;
  }

  const repliedCount = stats?.counts.replied || 0;
  const totalCount = stats?.counts.total || 1; // Avoid division by zero
  const percentage = Math.round((repliedCount / totalCount) * 100);

  return (
    <div className="text-2xl font-bold">
      {percentage}%
      <div className="text-xs text-muted-foreground">
        {repliedCount} messages replied
      </div>
    </div>
  );
}

// Growth Rate Component
function GrowthRate() {
  const { stats, loading } = useMessageStatistics();

  if (loading) {
    return <Skeleton className="h-10 w-full" />;
  }

  const growthRate = stats?.trends.growthRate || 0;
  const isPositive = growthRate >= 0;

  return (
    <div className="text-2xl font-bold">
      <div className="flex items-center">
        {growthRate.toFixed(1)}%
        {isPositive ? (
          <ArrowUp className="ml-2 h-4 w-4 text-green-500" />
        ) : (
          <ArrowDown className="ml-2 h-4 w-4 text-red-500" />
        )}
      </div>
      <div className="text-xs text-muted-foreground">from previous period</div>
    </div>
  );
}

// Daily Chart Component
function DailyChart() {
  const { stats, loading } = useMessageStatistics();

  if (loading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  if (!stats?.trends.messagesByDay.length) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        No data available
      </div>
    );
  }

  const chartData = {
    labels: stats.trends.messagesByDay.map((day) => {
      const date = new Date(day.date);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }),
    datasets: [
      {
        label: "Messages",
        data: stats.trends.messagesByDay.map((day) => day.count),
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div className="h-[300px]">
      <Bar data={chartData} options={options} />
    </div>
  );
}

// Status Distribution Component
function StatusDistribution() {
  const { stats, loading } = useMessageStatistics();

  if (loading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  if (!stats) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        No data available
      </div>
    );
  }

  const chartData = {
    labels: ["Unread", "Read", "Replied", "Archived"],
    datasets: [
      {
        data: [
          stats.distribution.status.unread,
          stats.distribution.status.read,
          stats.distribution.status.replied,
          stats.distribution.status.archived,
        ],
        backgroundColor: [
          "rgba(239, 68, 68, 0.7)",
          "rgba(59, 130, 246, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(107, 114, 128, 0.7)",
        ],
        borderColor: [
          "rgb(239, 68, 68)",
          "rgb(59, 130, 246)",
          "rgb(16, 185, 129)",
          "rgb(107, 114, 128)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  };

  return (
    <div className="h-[300px]">
      <Pie data={chartData} options={options} />
    </div>
  );
}

// Export all components
export const MessageStatistics = {
  TotalCount,
  UnreadCount,
  ResponseRate,
  GrowthRate,
  DailyChart,
  StatusDistribution,
};
