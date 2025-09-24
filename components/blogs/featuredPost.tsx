
// components/blogs/FeaturedPost.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedPosts } from '@/services/blogService';
import { Post } from '@/types/post';
import { calculateReadingTime } from '@/utils/readingTime';
import { formatDate } from '@/utils/formatTime';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function FeaturedPost() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        const data = await getFeaturedPosts();
        // just take the first featured post
        setPost(data[0]);
        setError(null);
      } catch (error) {
        console.error('Error fetching featured post:', error);
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
        <div
          className="rounded border-l-4 border-red-500 bg-red-100 p-4 text-red-700"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (loading || !post) {
    return (
      <div className="container mx-auto px-4 py-12 font-sans">
        <div className="h-64 w-full animate-pulse rounded-lg bg-gray-200" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 font-sans">
      <div className="relative overflow-hidden rounded-2xl bg-emerald-900 text-white">
        {/* Background Image */}
        <Image
          src={post.featuredPhoto.url}
          alt={post.title}
          width={1200}
          height={600}
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />

        <div className="relative z-10 p-8 md:p-12">
          <span className="mb-3 inline-block rounded bg-emerald-600 px-3 py-1 text-sm font-semibold">
            Featured Post
          </span>

          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{post.title}</h2>
          <p className="mb-6 max-w-2xl text-gray-200">{post.excerpt}</p>

          <div className="mb-6 flex items-center space-x-4 text-sm text-gray-300">
            <div className="flex items-center space-x-2">
              <Calendar size={16} />
              <span>{formatDate(post.updatedAt)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} />
              <span>{calculateReadingTime(post.content.markdown || '')}</span>
            </div>
          </div>

          <Link
            href={`/blogs/post/${post.slug}`}
            className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white transition hover:bg-emerald-500"
          >
            Read Article <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
