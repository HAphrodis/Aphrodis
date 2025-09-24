'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card } from '../ui/card'
import { useEffect, useState } from 'react'
import { calculateReadingTime } from '@/utils/readingTime'
import { Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel"

interface RelatedPostsProps {
  posts: {
    id: string;
    slug: string;
    featuredImage: string;
    title: string;
    excerpt: string;
    content: string;
    createdAt: string;
    tags: string[];
    commentCount?: number;
  }[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  const [readingTimes, setReadingTimes] = useState<string[]>([]);

  useEffect(() => {
    const times = posts.map(post => calculateReadingTime(post.content));
    setReadingTimes(times);
  }, [posts]);

  return (
    <section className="container mx-auto px-4 py-16 ">
      <p className="mb-8 text-2xl font-bold text-main_blue">Continue Reading</p>
      
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {posts.map((post) => (
              <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3">
                <Link href={`/blogs/post/${post.slug}`}>
                  <Card className="relative overflow-hidden border-0 bg-transparent">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="mb-3 flex items-center justify-between">
                     
                          <div className="mt-auto text-sm text-white rounded bg-blue-400 px-3 py-1  font-medium">
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
              {' · '}
              {readingTimes[posts.indexOf(post)]}
            </div>
                        </div>
                        <p className="text-xl font-bold leading-tight">
                          {post.title}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

      </div>
    </section>
  );
}

