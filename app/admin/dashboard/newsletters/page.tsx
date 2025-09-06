// app\admin\dashboard\newsletters\page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterList } from "./_components/newsletter-list";

export const metadata: Metadata = {
  title: "Newsletters | Ishimwe Jean Baptiste Admin",
  description:
    "Manage and create newsletters for Ishimwe Jean Baptiste subscribers",
};

export default async function NewslettersPage() {
  return (
    <div className="container mx-auto space-y-6 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Newsletters</h1>
          <p className="text-muted-foreground">
            Create and manage newsletters for your subscribers
          </p>
        </div>
        <Link
          href="/admin/dashboard/newsletters/create"
          className="rounded-md bg-[#11922f] px-4 py-2 text-white transition-colors hover:bg-[#00753c]"
        >
          Create Newsletter
        </Link>
      </div>

      <NewsletterList />
    </div>
  );
}
