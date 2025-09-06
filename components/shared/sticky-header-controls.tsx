// components\shared\sticky-header-controls.tsx
"use client";

import { motion } from "framer-motion";
import { CommandMenu } from "./command-menu";
import MusicPlayer from "../common/music-player";

export default function StickyHeaderControls() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed z-50 right-30 top-3 flex items-center gap-3"
    >
      <MusicPlayer />
      <CommandMenu />
    </motion.div>
  );
}
