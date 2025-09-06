import type { Metadata } from "next";
import { getNewsletter } from "../_actions/newsletter-actions";
import { NewsletterDetail } from "../_components/newsletter-detail";
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
      title: "Newsletter Not Found | Aphrodis Hakuzweyezu Admin",
    };
  }

  return {
    title: `${result.newsletter.title} | Aphrodis Hakuzweyezu Admin`,
    description: `View details for newsletter: ${result.newsletter.title}`,
  };
}

export default async function NewsletterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const result = await getNewsletter(resolvedParams.id);

  if (!result.success) {
    notFound();
  }

  return <NewsletterDetail newsletter={result.newsletter} />;
}
