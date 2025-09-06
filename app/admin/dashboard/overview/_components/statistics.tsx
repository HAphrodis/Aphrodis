// app\admin\dashboard\overview\_components\statistics.tsx
import { Heading } from "@/components/ui/heading2";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { MessageStatistics } from "./message-statistics";
import { ActivityChart } from "./activity-chart";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function StatisticsPage() {
  return (
    <>
      <Heading title="Statistics" />
      <Separator className="my-3" />
      <Suspense fallback={<StatisticsSkeletons />}>
        <MessageStatistics />
      </Suspense>
      <div className="mt-6">
        <Suspense fallback={<ChartSkeleton />}>
          <ActivityChart />
        </Suspense>
      </div>
    </>
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

function ChartSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[200px] w-full" />
      </CardContent>
    </Card>
  );
}
