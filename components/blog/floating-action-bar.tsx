"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, ArrowUp, BookmarkPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareButtons } from "@/components/blog/share-buttons";
import { toast } from "sonner";

interface FloatingActionBarProps {
  url: string;
  title: string;
}

export function FloatingActionBar({ url, title }: FloatingActionBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookmark = () => {
    toast.success("Article bookmarked!");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4"
        >
          <div className="relative">
            {showShare && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute bottom-full right-0 mb-2 rounded-2xl bg-emerald-900/20 backdrop-blur-sm p-4 border border-emerald-500/20"
              >
                <ShareButtons url={url} title={title} />
              </motion.div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="icon"
              className="bg-emerald-900/20 backdrop-blur-sm border-emerald-500/20 hover:bg-emerald-900/40 text-emerald-400 hover:text-emerald-300"
              onClick={() => setShowShare(!showShare)}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-emerald-900/20 backdrop-blur-sm border-emerald-500/20 hover:bg-emerald-900/40 text-emerald-400 hover:text-emerald-300"
              onClick={handleBookmark}
            >
              <BookmarkPlus className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-emerald-900/20 backdrop-blur-sm border-emerald-500/20 hover:bg-emerald-900/40 text-emerald-400 hover:text-emerald-300"
              onClick={scrollToTop}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
