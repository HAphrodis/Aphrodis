"use client";

import { Link } from "next-view-transitions";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Blog {
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  tags?: string[];
}

interface RelatedBlogsProps {
  currentSlug: string;
  blogs: Blog[];
}

export function RelatedBlogs({ currentSlug, blogs }: RelatedBlogsProps) {
  const relatedBlogs = blogs
    .filter((blog) => blog.slug !== currentSlug)
    .slice(0, 6);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const url = `${process.env.NEXT_PUBLIC_APP_URL}`;

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold text-white">Read next </p>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="hidden md:flex h-8 w-8 rounded-full"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex gap-1">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  index === selectedIndex
                    ? "bg-emerald-500 w-4"
                    : "bg-white/20 hover:bg-white/40",
                )}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="flex h-8 w-8  rounded-full"
            onClick={scrollNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {relatedBlogs.map((blog) => (
            <div
              key={blog.slug}
              className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] md:flex-[0_0_33.333%]"
            >
              <Link
                href={`${url}/${blog.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-xl bg-white/5 transition-all hover:bg-white/10 h-full"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
                </div>
                <div className="relative flex flex-col flex-1 p-4">
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {blog.tags?.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                      >
                        {tag.length > 12 ? `${tag.slice(0, 12)}...` : tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {blog.title}
                  </p>
                  <p className="mt-2 text-sm text-white/60 line-clamp-2 flex-1">
                    {blog.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <time className="text-sm text-white/40">
                      {formatDate(blog.date)}
                    </time>
                    <ArrowRight className="h-5 w-5 text-emerald-400 transform transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
