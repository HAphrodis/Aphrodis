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

interface SubscriberStatsType {
  counts: {
    total: number;
    active: number;
    unsubscribed: number;
  };
  trends: {
    subscribersByDay: { date: string; count: number }[];
    averagePerDay: number;
    mostActiveDay: { date: string; count: number } | null;
    growthRate: number;
  };
  distribution: {
    status: {
      active: number;
      unsubscribed: number;
    };
  };
  lastUpdated: string;
}

interface ApiResponse {
  success: boolean;
  data: SubscriberStatsType;
  error?: {
    code: string;
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details?: any;
  };
}

// Hook to fetch subscriber statistics
function useSubscriberStatistics() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<SubscriberStatsType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const result = await apiService.get<ApiResponse>(
          "/subscribers/statistics",
        );

        if (!result.success) {
          throw new Error(
            result.error?.message || "Failed to fetch statistics",
          );
        }

        setStats(result.data);
      } catch (err) {
        console.error("Error fetching subscriber statistics:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
        toast.error("Failed to load subscriber statistics");
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
  const { stats, loading } = useSubscriberStatistics();

  if (loading) {
    return <Skeleton className="h-10 w-full" />;
  }

  return (
    <div className="text-2xl font-bold">
      {stats?.counts.total.toLocaleString() || 0}
      <div className="text-xs text-muted-foreground">total subscribers</div>
    </div>
  );
}

// Active Count Component
function ActiveCount() {
  const { stats, loading } = useSubscriberStatistics();

  if (loading) {
    return <Skeleton className="h-10 w-full" />;
  }

  const activeCount = stats?.counts.active || 0;
  const totalCount = stats?.counts.total || 1; // Avoid division by zero
  const percentage = Math.round((activeCount / totalCount) * 100);

  return (
    <div className="text-2xl font-bold">
      {activeCount.toLocaleString()}
      <div className="text-xs text-muted-foreground">
        {percentage}% of total subscribers
      </div>
    </div>
  );
}

// Retention Rate Component
function RetentionRate() {
  const { stats, loading } = useSubscriberStatistics();

  if (loading) {
    return <Skeleton className="h-10 w-full" />;
  }

  const activeCount = stats?.counts.active || 0;
  const totalCount = stats?.counts.total || 1; // Avoid division by zero
  const retentionRate = Math.round((activeCount / totalCount) * 100);

  return (
    <div className="text-2xl font-bold">
      {retentionRate}%
      <div className="text-xs text-muted-foreground">
        {activeCount} active subscribers
      </div>
    </div>
  );
}

// Growth Rate Component
function GrowthRate() {
  const { stats, loading } = useSubscriberStatistics();

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
  const { stats, loading } = useSubscriberStatistics();

  if (loading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  if (!stats?.trends.subscribersByDay.length) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        No data available
      </div>
    );
  }

  const chartData = {
    labels: stats.trends.subscribersByDay.map((day) => {
      const date = new Date(day.date);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }),
    datasets: [
      {
        label: "Subscribers",
        data: stats.trends.subscribersByDay.map((day) => day.count),
        backgroundColor: "rgba(16, 185, 129, 0.5)",
        borderColor: "rgb(16, 185, 129)",
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
  const { stats, loading } = useSubscriberStatistics();

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
    labels: ["Active", "Unsubscribed"],
    datasets: [
      {
        data: [
          stats.distribution.status.active,
          stats.distribution.status.unsubscribed,
        ],
        backgroundColor: ["rgba(16, 185, 129, 0.7)", "rgba(239, 68, 68, 0.7)"],
        borderColor: ["rgb(16, 185, 129)", "rgb(239, 68, 68)"],
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
export const SubscriberStatistics = {
  TotalCount,
  ActiveCount,
  RetentionRate,
  GrowthRate,
  DailyChart,
  StatusDistribution,
};
