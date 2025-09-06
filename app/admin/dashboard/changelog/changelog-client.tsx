"use client";

import { useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import PageContainer from "@/components/layouts/page-container";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, GitCommit, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type ChangelogEntry = {
  metadata: {
    title: string;
    date: string;
  };
  slug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
};

export default function ChangelogClient({
  initialEntries,
}: {
  initialEntries: ChangelogEntry[];
}) {
  const [entries] = useState<ChangelogEntry[]>(initialEntries);
  const [expandedEntries, setExpandedEntries] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleEntry = (slug: string) => {
    setExpandedEntries((prev) =>
      prev.includes(slug) ? prev.filter((id) => id !== slug) : [...prev, slug],
    );
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filteredEntries = entries.filter((entry) =>
    entry.metadata.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <PageContainer>
      <h1 className="mt-4 mb-6 flex items-center text-4xl font-bold">
        <GitCommit className="mr-2" />
        Changelog
      </h1>
      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Search changelog..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md pl-10"
        />
        <Search
          className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
          size={20}
        />
      </div>
      <div className="space-y-6">
        {filteredEntries.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No changelog entries found.
          </p>
        ) : (
          filteredEntries.map((entry) => (
            <motion.div
              key={entry.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="dark:bg-background overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-900"
            >
              <div
                className="cursor-pointer p-6"
                onClick={() => toggleEntry(entry.slug)}
              >
                <div className="flex items-center justify-between">
                  <h2 className="mb-2 text-2xl font-semibold">
                    {entry.metadata.title}
                  </h2>
                  {expandedEntries.includes(entry.slug) ? (
                    <ChevronUp />
                  ) : (
                    <ChevronDown />
                  )}
                </div>
                <p className="mb-4 text-sm text-gray-500">
                  {formatDate(entry.metadata.date)}
                </p>
              </div>
              <AnimatePresence>
                {expandedEntries.includes(entry.slug) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <div className="prose dark:prose-invert max-w-none">
                      <MDXRemote {...entry.content} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </div>
    </PageContainer>
  );
}
