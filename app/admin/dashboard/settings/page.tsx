import PageContainer from "@/components/layouts/page-container";
import { Heading } from "@/components/ui/heading2";
import { Separator } from "@/components/ui/separator";
import { SettingsContent } from "./_components/settings-content";

export const metadata = {
  title: "Settings | Ishimwe Jean Baptiste Admin Panel",
};

export default function SettingsPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <Heading title="Settings" />
        <Separator className="my-3" />
        <SettingsContent />
      </div>
    </PageContainer>
  );
}
