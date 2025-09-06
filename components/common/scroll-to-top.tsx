"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import MusicPlayer from "./music-player";

const ScrollToTop: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-8 right-8 z-50 p-2 rounded-full bg-purple-300/50 text-emerald-950 hover:bg-black/40 hover:text-white transition-all duration-300 ]",
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none",
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showScrollTop ? 1 : 0, y: showScrollTop ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        aria-label="Scroll to top"
      >
        <ChevronsUp className="h-5 w-5" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed z-50 bottom-8 left-8 md:hidden"
      >
        <MusicPlayer variant="minimal" />
      </motion.div>
    </>
  );
};

export default ScrollToTop;
