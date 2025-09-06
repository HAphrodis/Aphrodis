import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import MessageDashboard from "./_components/message-dashboard";

export const metadata = {
  title: "Messages | Portfolio Admin Panel",
};

export default function MessagesPage() {
  return (
    <Suspense fallback={<DataTableSkeleton columnCount={6} rowCount={10} />}>
      <MessageDashboard />
    </Suspense>
  );
}
