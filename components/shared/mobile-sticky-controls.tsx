"use client";

import { motion } from "framer-motion";
import MusicPlayer from "../common/music-player";

export default function MobileStickyControls() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed z-50 right-4 bottom-20 md:hidden"
    >
      <MusicPlayer />
    </motion.div>
  );
}
