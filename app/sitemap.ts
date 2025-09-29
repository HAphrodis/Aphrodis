// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { getAllBlogs } from '@/services/blogService';
import { formatUrl, isValidUrl } from './sitemap-utils';

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
    { url: formatUrl(BASE_URL, "/blogs"), lastModified: currentDate, changeFrequency: "weekly", priority: 0.8 },
    { url: formatUrl(BASE_URL, "/blog/authors"), lastModified: currentDate, changeFrequency: "monthly", priority: 0.6 },
    { url: formatUrl(BASE_URL, "/blog/tags"), lastModified: currentDate, changeFrequency: "monthly", priority: 0.6 },
    { url: formatUrl(BASE_URL, "/guestbook"), lastModified: currentDate, changeFrequency: "weekly", priority: 0.7 },
    { url: formatUrl(BASE_URL, "/bookmarks"), lastModified: currentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: formatUrl(BASE_URL, "/booking"), lastModified: currentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: formatUrl(BASE_URL, "/subscribe"), lastModified: currentDate, changeFrequency: "weekly", priority: 0.8 },
    { url: formatUrl(BASE_URL, "/lab"), lastModified: currentDate, changeFrequency: "yearly", priority: 0.5 },
  ];

 try {
    // Fetch all blog posts
    const blogPosts = await getAllBlogs();
    // Create dynamic routes for blog posts
    const blogRoutes: MetadataRoute.Sitemap = blogPosts
      .filter((post) => post.slug) // Ensure post has a slug
      .map((post) => ({
        url: formatUrl(BASE_URL, `/blogs/post/${post.slug}`),
        lastModified: new Date(post.updatedAt || post.createdAt),
        changeFrequency: 'monthly',
        priority: 0.7
      }));

    // Create dynamic routes for blog authors
    const authorSet = new Set<string>();
    blogPosts.forEach((post) => {
      if (post.author?.slug) {
        authorSet.add(post.author.slug);
      }
    });

    const authorRoutes: MetadataRoute.Sitemap = Array.from(authorSet).map(
      (authorSlug) => ({
        url: formatUrl(BASE_URL, `/blogs/author/${authorSlug}`),
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.6
      })
    );

    // Create dynamic routes for blog tags
    const tagSet = new Set<string>();
    blogPosts.forEach((post) => {
      post.tags?.forEach((tag: { slug: string }) => {
        if (tag.slug) {
          tagSet.add(tag.slug);
        }
      });
    });

    const tagRoutes: MetadataRoute.Sitemap = Array.from(tagSet).map(
      (tagSlug) => ({
        url: formatUrl(BASE_URL, `/blogs/tag/${tagSlug}`),
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.6
      })
    );

    // Combine all routes and filter out any invalid URLs
    const allRoutes = [
      ...staticRoutes,
      ...blogRoutes,
      ...authorRoutes,
      ...tagRoutes
    ].filter((route) => isValidUrl(route.url));

    return allRoutes;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return at least the static routes if there's an error
    return staticRoutes;
  }
}
