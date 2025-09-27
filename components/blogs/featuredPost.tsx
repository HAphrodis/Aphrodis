'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedPosts } from '@/services/blogService'; // use your existing fetch function
import { Post } from '@/types/post';
import { calculateReadingTime } from '@/utils/readingTime';
import { formatDate } from '@/utils/formatTime';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function FeaturedPost() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        const posts: Post[] = await getFeaturedPosts(); // fetch all posts
        if (posts.length > 0) {
          // Sort by updatedAt descending (most recent first)
          const sorted = posts.sort(
            (a: Post, b: Post) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
          setPost(sorted[0]);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching featured post:', err);
        setError('Failed to fetch featured post. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, []);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 font-sans">
        <div className="rounded border-l-4 border-red-500 bg-red-100 p-4 text-red-700" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (loading || !post) {
    return (
      <div className="container mx-auto px-4 py-12 font-sans">
        <div className="h-64 w-full animate-pulse rounded-3xl bg-emerald-900/30" />
      </div>
    );
  }

  return (
    <div className="relative z-10 mx-auto my-12 max-w-6xl px-4 font-sans">
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 shadow-lg">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-gray-950/90 via-gray-950/70 to-emerald-950/60" />

        <div className="relative h-[350px] w-full">
          <Image
            src={post.featuredPhoto?.url || '/placeholder.svg?height=500&width=1200'}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute inset-0 z-20 flex items-end p-8 md:p-12">
          <div className="w-full max-w-3xl space-y-4">
            <Badge className="bg-[#04877F] text-emerald-950 hover:bg-emerald-400">
              Featured Post
            </Badge>

            <h2 className="text-xl font-bold text-white md:text-2xl lg:text-3xl">{post.title}</h2>

            <p className="line-clamp-2 text-white/80 md:line-clamp-3">{post.excerpt}</p>

            <div className="flex flex-wrap items-center gap-4 text-white/70">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time>{formatDate(post.updatedAt)}</time>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{calculateReadingTime(post.content.markdown || '')} min read</span>
              </div>
            </div>

            <Button
              asChild
              className="mt-4 bg-[#04877F] text-emerald-950 hover:bg-emerald-400"
            >
              <Link href={`/blogs/post/${post.slug}`} className="flex items-center gap-2">
                Read Article
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
