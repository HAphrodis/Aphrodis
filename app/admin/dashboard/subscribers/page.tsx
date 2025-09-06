import PageContainer from "@/components/layouts/page-container2";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { Suspense } from "react";
import SubscriberListingPage from "./_components/subscriber-listing";
import { AddSubscriberModal } from "./_components/add-subscriber-modal";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart2 } from "lucide-react";

export const metadata = {
  title: "Subscribers | Portfolio Admin Panel",
};

export default function SubscribersPage() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Subscribers"
            description="Manage Newsletter Subscribers"
          />
          <div className="flex items-center gap-x-2">
            <AddSubscriberModal />
            <Link href="/admin/dashboard/subscribers/statistics">
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

        <Suspense
          fallback={<DataTableSkeleton columnCount={6} rowCount={10} />}
        >
          <SubscriberListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
