import PageContainer from "@/components/layouts/page-container2";
import { Heading } from "@/components/ui/heading2";
import { Separator } from "@/components/ui/separator";
import { TrashContent } from "./_components/trash-content";

export const metadata = {
  title: "Dashboard: Trash",
};

export default function TrashPage() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <Heading title="Trash" />
        <Separator />
        <TrashContent />
      </div>
    </PageContainer>
  );
}
