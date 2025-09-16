// app/sitemap.ts
import type { MetadataRoute } from "next";
import { formatUrl } from "./sitemap-utils";

const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN || "https://www.aphrodis.online";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  // Static routes with appropriate priorities and change frequencies
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: formatUrl(BASE_URL, "/"), lastModified: currentDate, changeFrequency: "weekly", priority: 1.0 },
    { url: formatUrl(BASE_URL, "/about"), lastModified: currentDate, changeFrequency: "monthly", priority: 0.9 },
    { url: formatUrl(BASE_URL, "/work"), lastModified: currentDate, changeFrequency: "monthly", priority: 0.9 },
    { url: formatUrl(BASE_URL, "/services"), lastModified: currentDate, changeFrequency: "monthly", priority: 0.9 },
    { url: formatUrl(BASE_URL, "/links"), lastModified: currentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: formatUrl(BASE_URL, "/blog"), lastModified: currentDate, changeFrequency: "weekly", priority: 0.8 },
    { url: formatUrl(BASE_URL, "/blog/authors"), lastModified: currentDate, changeFrequency: "monthly", priority: 0.6 },
    { url: formatUrl(BASE_URL, "/blog/tags"), lastModified: currentDate, changeFrequency: "monthly", priority: 0.6 },
    { url: formatUrl(BASE_URL, "/guestbook"), lastModified: currentDate, changeFrequency: "weekly", priority: 0.7 },
    { url: formatUrl(BASE_URL, "/bookmarks"), lastModified: currentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: formatUrl(BASE_URL, "/booking"), lastModified: currentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: formatUrl(BASE_URL, "/subscribe"), lastModified: currentDate, changeFrequency: "weekly", priority: 0.8 },
    { url: formatUrl(BASE_URL, "/attributions"), lastModified: currentDate, changeFrequency: "monthly", priority: 0.7 },
    { url: formatUrl(BASE_URL, "/lab"), lastModified: currentDate, changeFrequency: "yearly", priority: 0.5 },
  ];

  // Return static routes for now
  return staticRoutes;

  // -----------------------------
  // Optional: Dynamic routes for blogs
  // -----------------------------
  // try {
  //   const publishedBlogs = blogs.filter((blog) => blog.published);
  //
  //   const blogRoutes: MetadataRoute.Sitemap = publishedBlogs
  //     .filter((post) => post.slug)
  //     .map((post) => ({
  //       url: formatUrl(BASE_URL, `/blog/${post.slug}`),
  //       lastModified: new Date(post.date),
  //       changeFrequency: "monthly",
  //       priority: 0.7,
  //     }));
  //
  //   const tagSet = new Set<string>();
  //   publishedBlogs.forEach((post) => {
  //     post.tags?.forEach((tag) => {
  //       if (tag) tagSet.add(tag);
  //     });
  //   });
  //
  //   const tagRoutes: MetadataRoute.Sitemap = Array.from(tagSet).map((tag) => ({
  //     url: formatUrl(BASE_URL, `/blog/tags/${encodeURIComponent(tag.toLowerCase())}`),
  //     lastModified: currentDate,
  //     changeFrequency: "monthly",
  //     priority: 0.6,
  //   }));
  //
  //   return [...staticRoutes, ...blogRoutes, ...tagRoutes];
  // } catch (error) {
  //   console.error("Error generating sitemap:", error);
  //   return staticRoutes;
  // }
}
