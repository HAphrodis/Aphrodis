import type { Metadata } from "next";

export function createMetadata({
  title,
  description,
  path,
  ogImage = "/screenshot.jpg",
  type = "website",
  noIndex = false,
  author = "Aphrodis",
}: {
  title: string;
  description?: string;
  path: string;
  ogImage?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  author?: string | string[];
}): Metadata {
  const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN || "https://www.aphrodis.me";

  // Ensure base URL has proper protocol
  const baseUrl = BASE_URL.startsWith("http")
    ? BASE_URL
    : `https://${BASE_URL}`;

  // Ensure path starts with a slash but doesn't end with one
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const cleanPath =
    normalizedPath.endsWith("/") && normalizedPath !== "/"
      ? normalizedPath.slice(0, -1)
      : normalizedPath;

  // Create the canonical URL
  const canonicalUrl = `${baseUrl}${cleanPath}`;

  // Ensure image URL is absolute
  const imageUrl = ogImage.startsWith("http")
    ? ogImage
    : `${baseUrl}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}`;

  // Default description fallback
  const defaultDescription =
    "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Environmental Health Practitioner.";

  return {
    title,
    description: description || defaultDescription,
    authors: Array.isArray(author)
      ? author.map((name) => ({ name }))
      : [{ name: author, url: baseUrl }],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": canonicalUrl,
      },
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: false,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title,
      description: description || defaultDescription,
      url: canonicalUrl,
      siteName: "HAphrodis Portfolio",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type,
      countryName: "Rwanda",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description || defaultDescription,
      images: [imageUrl],
      site: "@Aphrodis",
      creator: "@Aphrodis",
    },
  };
}

// Helper function to create page-specific JSON-LD
export function createPageJsonLd({
  title,
  description,
  path,
  type = "WebPage",
  datePublished,
  dateModified,
  author = "Aphrodis",
}: {
  title: string;
  description: string;
  path: string;
  type?: "WebPage" | "Article" | "BlogPosting";
  datePublished?: string;
  dateModified?: string;
  author?: string;
}) {
  const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN || "https://www.aphrodis.me";
  const url = `${BASE_URL}${path}`;

  const baseJsonLd = {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#${type.toLowerCase()}`,
    url,
    name: title,
    description,
    isPartOf: {
      "@id": `${BASE_URL}/#website`,
    },
    author: {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: author,
    },
  };

  // Add date fields for articles/blog posts
  if (type === "Article" || type === "BlogPosting") {
    return {
      ...baseJsonLd,
      ...(datePublished && { datePublished }),
      ...(dateModified && { dateModified }),
      publisher: {
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        name: author,
      },
    };
  }

  return baseJsonLd;
}
