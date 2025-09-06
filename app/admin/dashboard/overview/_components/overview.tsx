// app\admin\dashboard\overview\_components\overview.tsx
import PageContainer from "@/components/layouts/page-container";
import StatisticsPage from "./statistics";

export default function OverViewPage() {
  return (
    <PageContainer scrollable>
      <StatisticsPage />
    </PageContainer>
  );
}
