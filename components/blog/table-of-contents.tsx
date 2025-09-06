"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ListOrdered, Check } from "lucide-react";
import { CompletionBadge } from "../completion-badge";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";

interface Heading {
  id: string;
  text: string;
  level: number;
  isViewed?: boolean;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [allSectionsViewed, setAllSectionsViewed] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true); // Default to collapsed
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");

  // Handle initial mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setIsCollapsed(isMobile);
    }
  }, [isMobile, isMounted]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            setHeadings((prev) =>
              prev.map((h) =>
                h.id === entry.target.id ? { ...h, isViewed: true } : h,
              ),
            );
          }
        });
      },
      {
        rootMargin: "0% 0% -80% 0%",
      },
    );

    const headingElements = Array.from(
      document.querySelectorAll("h2[id], h3[id]"),
    );
    headingElements.forEach((element) => observer.observe(element));

    return () => {
      headingElements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll("h2[id], h3[id]"),
    );
    const newHeadings: Heading[] = headingElements.map((element) => ({
      id: element.id,
      text: element.textContent || "",
      level: element.tagName === "H2" ? 2 : 3,
      isViewed: false,
    }));

    setHeadings(newHeadings);
  }, []);

  useEffect(() => {
    const viewedCount = headings.filter((h) => h.isViewed).length;
    setProgress((viewedCount / headings.length) * 100 || 0);
    setAllSectionsViewed(
      viewedCount === headings.length && headings.length > 0,
    );
  }, [headings]);

  if (!isMounted) {
    return null; // Prevent hydration issues
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-emerald-500/20 bg-emerald-900/20 p-6 backdrop-blur-sm relative overflow-hidden group"
    >
      {/* Progress Bar Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.03] to-transparent" />

      {/* Vertical Progress Bar */}
      <motion.div
        className="absolute left-0 top-0 w-1 bg-emerald-500/20"
        style={{ height: `${progress}%` }}
        initial={{ height: 0 }}
        animate={{ height: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <ListOrdered className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Contents</h3>
              <p className="text-sm text-emerald-400/70">
                {Math.round(progress)}% completed
              </p>
            </div>
          </div>

          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <motion.div
                animate={{ rotate: isCollapsed ? 0 : 180 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </Button>
          )}
        </div>

        <AnimatePresence initial={false}>
          {(!isCollapsed || !isMobile) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-0 overflow-hidden"
            >
              {headings.map((heading, index) => (
                <motion.div
                  key={heading.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.a
                    href={`#${heading.id}`}
                    className={cn(
                      "text-sm transition-all duration-200 flex items-center gap-3 group/item",
                      heading.level === 2
                        ? "font-medium ml-0"
                        : heading.level === 3
                          ? "ml-6"
                          : "ml-12",
                      activeId === heading.id
                        ? "text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-lg"
                        : "text-emerald-100/60 hover:text-emerald-400 px-4 py-2 hover:bg-emerald-500/5 rounded-lg",
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(`#${heading.id}`)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                        inline: "nearest",
                      });
                      if (isMobile) {
                        setIsCollapsed(true);
                      }
                    }}
                  >
                    <span className="flex-1">{heading.text}</span>
                    {heading.isViewed && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-emerald-400 opacity-0 group-hover/item:opacity-100"
                      >
                        <Check className="h-4 w-4" />
                      </motion.span>
                    )}
                  </motion.a>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {allSectionsViewed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 pt-6 border-t border-emerald-500/20"
          >
            <CompletionBadge isCompleted={true} />
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
