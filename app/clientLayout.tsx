"use client";

import type React from "react";
import "@/styles/globals.css";
// import { CommandMenu } from "@/components/shared/command-menu";
// import MusicPlayer from "@/components/common/music-player";
import { motion } from "framer-motion";
import ScrollToTop from "@/components/common/scroll-to-top";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <motion.div className="hidden md:block  z-50 ">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* <div className="fixed z-50 right-24 top-4 flex items-center gap-3">
            <MusicPlayer variant="minimal" />
          </div> */}
          {/* <CommandMenu /> */}
        </motion.div>
      </motion.div>

      <ScrollToTop />
    </>
  );
}
