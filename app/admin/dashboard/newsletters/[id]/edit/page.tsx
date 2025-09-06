import type { Metadata } from "next";
import { getNewsletter } from "../../_actions/newsletter-actions";
import { NewsletterForm } from "../../_components/newsletter-form";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const result = await getNewsletter(resolvedParams.id);

  if (!result.success) {
    return {
      title: "Newsletter Not Found | Ishimwe Jean Baptiste Admin",
    };
  }

  return {
    title: `Edit: ${result.newsletter.title} | Ishimwe Jean Baptiste Admin`,
    description: `Edit newsletter: ${result.newsletter.title}`,
  };
}

export default async function EditNewsletterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const result = await getNewsletter(resolvedParams.id);

  if (!result.success) {
    notFound();
  }

  // Only allow editing draft newsletters
  if (result.newsletter.status !== "draft") {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold tracking-tight">
          Cannot Edit Newsletter
        </h1>
        <p className="mt-2 text-muted-foreground">
          Only draft newsletters can be edited. This newsletter has already been{" "}
          {result.newsletter.status}.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold tracking-tight">Edit Newsletter</h1>
      <p className="mt-2 text-muted-foreground">
        Make changes to your newsletter draft
      </p>

      <div className="mt-6">
        <NewsletterForm initialData={result.newsletter} mode="edit" />
      </div>
    </div>
  );
}
