"use client";

import { ExternalLink, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MouseLight } from "@/components/shared/mouse-light";
import { ParticlesBackground } from "@/components/shared/particles-background";
import { bookmarks } from "@/constants/bookmarks";
import type { BookmarkGridProps, BookmarkCardProps } from "@/types/bookmark";
import PageHeader from "@/components/shared/page-header";

export default function BookmarksPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    ...new Set(bookmarks.map((bookmark) => bookmark.category)),
  ];

  const filteredBookmarks = bookmarks.filter(
    (bookmark) =>
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      className="relative min-h-screen bg-[#002922] overflow-hidden"
      ref={containerRef}
    >
      <MouseLight />
      <ParticlesBackground />

      <PageHeader
        title="My"
        highlightedTitle="Bookmarks"
        subtitle="A curated collection of my favorite websites, tools, and services"
      />

      <div className="top-0 z-[-2] w-screen bg-[radial-gradient(#ffffff49_1px,transparent_1px)] bg-[size:40px_40px]">
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Search bar */}
            <div className="relative mx-auto max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-400" />
              <Input
                type="text"
                placeholder="Search bookmarks..."
                className="pl-10 border-emerald-800/30 bg-emerald-900/20 text-emerald-100 placeholder:text-emerald-400/50 focus-visible:ring-emerald-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Tabs and content */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mx-auto mb-8 bg-emerald-900/30 border text-slate-300 border-emerald-800/50">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-emerald-700 data-[state=active]:text-white"
                >
                  All
                </TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="data-[state=active]:bg-emerald-700 data-[state=active]:text-white"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <BookmarkGrid
                  bookmarks={filteredBookmarks}
                  searchQuery={searchQuery}
                />
              </TabsContent>

              {categories.map((category) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <BookmarkGrid
                    bookmarks={filteredBookmarks.filter(
                      (b) => b.category === category,
                    )}
                    searchQuery={searchQuery}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function BookmarkGrid({ bookmarks, searchQuery }: BookmarkGridProps) {
  if (bookmarks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <p className="text-emerald-400 text-lg">
          {searchQuery
            ? `No bookmarks found matching "${searchQuery}"`
            : "No bookmarks in this category yet"}
        </p>
      </motion.div>
    );
  }

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks.map((bookmark, index) => (
          <BookmarkCard
            key={bookmark.title}
            bookmark={bookmark}
            index={index}
          />
        ))}
      </div>
    </TooltipProvider>
  );
}

function BookmarkCard({ bookmark, index }: BookmarkCardProps) {
  const Icon = bookmark.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="h-full overflow-hidden border-emerald-800/20 bg-emerald-900/10 backdrop-blur-sm hover:bg-emerald-900/20 transition-all duration-300">
            <CardHeader className="relative pb-2">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400" />
              <div className="flex items-center gap-3">
                {Icon && (
                  <div className="relative flex-shrink-0 h-10 w-10 rounded-md overflow-hidden bg-emerald-800/30 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-emerald-400" />
                  </div>
                )}
                <div>
                  <CardTitle className="text-lg text-emerald-100 flex items-center gap-2">
                    {bookmark.title}
                  </CardTitle>
                  <CardDescription className="text-emerald-400/80 text-xs">
                    {bookmark.category}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-emerald-300/80 mb-4">
                {bookmark.description}
              </p>
              <Link
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-sm transition-colors"
              >
                Visit site <ExternalLink className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>{bookmark.url}</p>
        </TooltipContent>
      </Tooltip>
    </motion.div>
  );
}
