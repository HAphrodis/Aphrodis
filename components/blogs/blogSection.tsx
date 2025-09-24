// components/blogs/blogSection.tsx
'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import Image from 'next/image';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { getAllBlogs } from '@/services/blogService';
import { calculateReadingTime } from '@/utils/readingTime';
import BlogSkeleton from './Skeleton';
import { formatDate } from '@/utils/formatTime';
import Link from 'next/link';
import TitleBadge from '../TitleBadge';
import SectionTitle from '../SectionTitle';

// Define proper types for your blog post
interface Author {
  name: string;
  avatar?: string;
}

interface FeaturedPhoto {
  url: string;
  width?: number;
  height?: number;
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: { markdown: string };
  featuredPhoto: FeaturedPhoto;
  author?: Author;
  createdAt: string;
}

export default function BlogSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const blogs: BlogPost[] = await getAllBlogs();
      setBlogPosts(blogs);
    } catch (err: unknown) {
      setError('Failed to fetch blog posts. Please try again.');
      console.error('Error fetching blog posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <motion.div
      className="container mx-auto mb-4 px-4 py-12"
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="mb-8 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <TitleBadge text="Blog & News" />
        <SectionTitle title="Read Latest Posts" />
      </motion.div>

      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
              >
                <BlogSkeleton />
              </CarouselItem>
            ))
          ) : error ? (
            <div className="mx-auto py-12 text-center">
              <p className="mb-4 text-xl text-red-500">{error}</p>
              <button
                onClick={fetchBlogs}
                className="rounded-lg bg-blue-600 px-6 py-2 text-white shadow-md transition-colors hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          ) : (
            blogPosts.map((post: BlogPost, index: number) => (
              <CarouselItem
                key={post.id}
                className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
              >
                <motion.div
                  className="group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Link href={`/blogs/post/${post.slug}`}>
                    <Card className="relative overflow-hidden border border-[#b7d5f5] bg-[#d6e9fd] group-hover:bg-[#d6e8ff]">
                      <CardHeader className="relative space-y-0 p-0">
                        <Image
                          src={post.featuredPhoto.url}
                          alt={post.title}
                          width={400}
                          height={300}
                          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
                        />
                        <div className="height-full absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          <button className="rounded-lg flex items-center space-x-2 bg-blue-600 px-2 py-2 text-white">
                            Read More <ExternalLink className="h-4 w-4 ml-2" />
                          </button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <CardTitle className="mb-2 text-xl text-black transition-colors group-hover:text-blue-600 dark:text-black">
                          {post.title}
                        </CardTitle>
                        <p className="mb-4 text-gray-600">{post.excerpt}</p>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between p-4 pt-0">
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="mr-2">{formatDate(post.createdAt)}</span>
                          <span>•</span>
                          <span className="ml-2">
                            {calculateReadingTime(post.content.markdown || '')}
                          </span>
                        </div>
                        <ArrowUpRight className="text-gray-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-600" />
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <div>
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </motion.div>
  );
}
