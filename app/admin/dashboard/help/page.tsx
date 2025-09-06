import PageContainer from "@/components/layouts/page-container2";
import { Heading } from "@/components/ui/heading2";
import { Separator } from "@/components/ui/separator";
import { HelpContent } from "./_components/help-content";

export const metadata = {
  title: "Help Center | Ishimwe Jean Baptiste Admin Panel",
};

export default function HelpPage() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <Heading title="Help Center" />
        <Separator />
        <HelpContent />
      </div>
    </PageContainer>
  );
}
