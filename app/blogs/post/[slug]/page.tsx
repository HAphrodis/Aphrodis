// app/blogs/post/[slug]/page.tsx
import { Metadata } from 'next';
import { getPostBySlug, getRelatedPosts } from '@/services/blogService';
import { notFound } from 'next/navigation';
import BlogContent from '@/components/blogs/BlogContent';

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

// ------------------
// Types
// ------------------
type Author = {
  id: string;
  name: string;
  bio: string;
  email: string;
  profilePhoto: {
    url: string;
    width: number;
    height: number;
  };
  linkedInUrl?: string;
  instagramHandle?: string;
  twitterXHandle?: string;
  portfolio?: string;
};

type Category = {
  name: string;
  slug: string;
};

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: { markdown: string };
  createdAt: string;
  featuredPhoto: { url: string };
  category: Category[];
  author: Author;
};

// ------------------
// Metadata Generation
// ------------------
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {};
  }

  const description = post.excerpt || post.content.markdown.substring(0, 140);

  return {
    title: post.title,
    description,
    authors: [{ name: 'Your Name' }],
    openGraph: {
      title: post.title,
      description,
      url: `${DOMAIN}/${post.slug}`,
      siteName: 'URPHSA',
      images: [
        {
          url: post.featuredPhoto.url,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ],
      locale: 'en_US',
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [post.featuredPhoto.url],
      creator: '@urphsa'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    alternates: {
      canonical: `${DOMAIN}/blogs/post/${post.slug}`
    },
    keywords: [post.category[0]?.name || '', 'blog', 'article']
  };
}

// ------------------
// Post Page Component
// ------------------
export default async function PostPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post: Post | null = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const categorySlug = post.category[0]?.slug || '';

  // Tags as string array
  const tags: string[] = post.category.map((tag) => tag.name);

  // Related posts
  const relatedPostsRaw = await getRelatedPosts(resolvedParams.slug, categorySlug);
  const formattedRelatedPosts = relatedPostsRaw.map((p: Post) => ({
    id: p.id,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content.markdown,
    slug: p.slug,
    createdAt: p.createdAt,
    featuredImage: p.featuredPhoto.url,
    tags: p.category.map((c) => c.name)
  }));

  return (
    <BlogContent
      title={post.title}
      featuredPhoto={post.featuredPhoto.url}
      createdAt={post.createdAt}
      content={post.content.markdown}
      author={{
        id: post.author.id,
        name: post.author.name,
        bio: post.author.bio,
        email: post.author.email,
        profilePhoto: post.author.profilePhoto,
        linkedInUrl: post.author.linkedInUrl,
        instagramHandle: post.author.instagramHandle,
        twitterXHandle: post.author.twitterXHandle,
        portfolio: post.author.portfolio
      }}
      slug={post.slug}
      tags={tags}
      relatedPosts={formattedRelatedPosts}
    />
  );
}
