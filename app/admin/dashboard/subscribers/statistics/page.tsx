import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import StatisticsDashboard from "./_components/statistics-dashboard";

export const metadata = {
  title: "Subscriber Statistics | Portfolio Admin Panel",
};

export default function StatisticsPage() {
  return (
    <Suspense fallback={<DataTableSkeleton columnCount={4} rowCount={2} />}>
      <StatisticsDashboard />
    </Suspense>
  );
}
