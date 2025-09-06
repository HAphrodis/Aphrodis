"use client";

import { motion } from "framer-motion";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { Calendar, Clock, ArrowUpRight, Tag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { BorderBeam } from "../magicui/border-beam";

interface BlogCardProps {
  title: string;
  description: string;
  date: Date;
  image: string;
  slug: string;
  category?: string;
  readingTime?: number;
}

export function BlogCard({
  title,
  description,
  date,
  image,
  slug,
  category,
  readingTime,
}: BlogCardProps) {
  // Check if post is new (published in the last 7 days)
  const isNewPost =
    new Date().getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
      className="group relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950/90 to-emerald-900/40 backdrop-blur-xl border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-500"
    >
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Animated glow orbs */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-400/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-emerald-400/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <Link href={`/${slug}`} className="block h-full">
        <div className="relative z-10 p-5 h-full flex flex-col">
          {/* Featured Image */}
          <div className="relative aspect-video overflow-hidden rounded-lg mb-4 border border-emerald-500/10 group-hover:border-emerald-500/30 transition-all">
            <Image
              src={image || "/placeholder.svg?height=450&width=800"}
              alt={title}
              width={800}
              height={450}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* New badge */}
            {isNewPost && (
              <motion.div
                initial={{ scale: 0, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                className="absolute top-3 left-3 bg-gradient-to-r from-emerald-500 to-emerald-400 text-emerald-950 text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"
              >
                NEW
              </motion.div>
            )}

            {/* Category badge */}
            {category && (
              <div className="absolute bottom-3 right-3 bg-emerald-950/80 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/20 backdrop-blur-sm flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {category}
              </div>
            )}
          </div>

          {/* Post Meta */}
          <div className="flex items-center justify-between text-sm text-emerald-400/80 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDistanceToNow(date, { addSuffix: true })}</span>
            </div>

            {readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{readingTime} min read</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-[1.18rem] font-bold mb-3 bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-emerald-200 transition-all duration-300 line-clamp-2">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-white/80 mb-4 text-[0.92rem] line-clamp-3 flex-grow leading-relaxed">
            {description}
          </p>

          {/* Read More Link */}
          <div className="mt-auto pt-2">
            <div className="inline-flex text-[0.94rem] line items-center gap-2 text-emerald-400 group-hover:text-emerald-300 transition-colors font-medium">
              Read More
              <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </Link>

      <BorderBeam
        duration={30}
        size={500}
        delay={17}
        className="from-transparent via-emerald-400/70 to-transparent"
      />

      {/* Enhanced Hover Glow Effect */}
      <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-emerald-400/5 to-emerald-500/10 blur-xl" />
      </div>
    </motion.div>
  );
}
