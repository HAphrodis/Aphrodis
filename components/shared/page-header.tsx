// components/shared/page-header.tsx
"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { JSX } from "react";

interface SectionHeaderProps {
  title: JSX.Element | string;
  highlightedTitle?: string;
  subtitle: string;
  backgroundImage?: string; // renamed for clarity
  overlay?: 'light' | 'dark' | 'gradient' | 'brand';
}

export default function PageHeader({
  title,
  highlightedTitle,
  subtitle,
  backgroundImage = "/header.jpg", // default background image
  overlay = 'dark',
}: SectionHeaderProps) {

  // Overlay classes based on prop
  const overlayClasses = {
    light: 'bg-white/40 backdrop-blur-sm',
    dark: 'bg-black/70',
    gradient: 'bg-gradient-to-br from-black/60 via-black/40 to-black/60',
    brand:
      'bg-gradient-to-br from-[#39B288]/80 via-[#5AB2E4]/60 to-[#39B288]/80'
  };
  return (
    <header className="relative w-full py-12 md:py-14 lg:py-20 overflow-hidden">
      
      {/* Background image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }} // slightly visible overlay
        transition={{ duration: 2 }}
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

{/* Overlay */}
      <div className={cn('absolute inset-0', overlayClasses[overlay])}>
      </div>
      {/* Content */}
      <div className="container relative px-4 md:px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">
            {title}{" "}
            {highlightedTitle && (
              <span className="text-purple-100">{highlightedTitle}</span>
            )}
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-32 h-[0.2rem] bg-white mx-auto mb-4"
          />
          <p className="mt-4 text-purple-200 max-w-3xl mx-auto">{subtitle}</p>
        </motion.div>
      </div>
    </header>
  );
}
