import type { Metadata } from "next";
import { NewsletterForm } from "../_components/newsletter-form";

export const metadata: Metadata = {
  title: "Create Newsletter | Ishimwe Jean Baptiste Admin",
  description: "Create a new newsletter for Ishimwe Jean Baptiste subscribers",
};

export default function CreateNewsletterPage() {
  return (
    <div className="container mx-auto space-y-6 py-6">
      <h1 className="text-2xl font-bold tracking-tight">Create Newsletter</h1>
      <p className="text-muted-foreground">
        Create a new newsletter to send to your subscribers
      </p>

      <div className="mt-6">
        <NewsletterForm mode="create" />
      </div>
    </div>
  );
}
