"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="relative text-center mb-12">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "30%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute left-[37%] top-11  h-px bg-linear-to-r from-emerald-500/50 to-transparent"
      />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          <span className="bg-linear-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
        {subtitle && <p className="text-white/60 ">{subtitle}</p>}
      </motion.div>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute -top-6 -left-6 w-12 h-12 bg-emerald-500/10 rounded-full blur-xl"
      />
    </div>
  );
}
