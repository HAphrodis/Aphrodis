import FormCardSkeleton from "@/components/shared/form-card-skeleton";
import PageContainer from "@/components/layouts/page-container";
import { Suspense } from "react";
// import SubscriberViewPage from '../_components/subscriber-view-page'

export const metadata = {
  title: "Dashboard: Subscriber View",
};

type PageParams = Promise<{ sub: string }>;

export default async function Page({ params }: { params: PageParams }) {
  const resolvedParams = await params;

  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          {/* <SubscriberViewPage subscriberId={resolvedParams.sub} /> */}
          <div>Subscriber: {resolvedParams.sub}</div>
        </Suspense>
      </div>
    </PageContainer>
  );
}
