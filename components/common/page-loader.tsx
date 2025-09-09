"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: { opacity: 1 },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.5, ease: "easeInOut" }, // faster exit
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 1.2, duration: 0.7, ease: "easeOut" }, // show earlier
  },
};

interface LoadingProps {
  onComplete: () => void;
}

export default function Loading({ onComplete }: LoadingProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300); // shorter delay
          return 100;
        }
        return prev + 4; // faster increment (reaches 100 ~2.5s)
      });
    }, 30); // faster updates
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      exit="exit"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1e1b2f] overflow-hidden"
    >
      {/* Spinner + Avatar */}
      <div className="relative flex justify-center items-center mb-8">
        <motion.div
          className="absolute rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-200 animate-spin"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
        <Image
          src="/protofolio-1.jpg"
          alt="Loading avatar"
          className="rounded-full h-28 w-28 object-cover"
          width={500}
          height={500}
          priority
        />
      </div>

      {/* Loading text */}
      <motion.div
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="text-center mb-2 text-white/80 text-lg font-semibold"
      >
        Loading Portfolio...
      </motion.div>

      {/* Progress bar (optional, kept fast) */}
      <div className="w-72 h-2 bg-purple-100/50 rounded-full overflow-hidden border border-purple-100/60 mt-2">
        <motion.div
          style={{ width: `${progress}%` }}
          className="h-full bg-gradient-to-r from-purple-200/50 to-purple-100 rounded-full shadow-[0_0_12px_rgba(139,92,246,0.7)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut", duration: 0.2 }}
        />
      </div>

      {/* Progress percentage */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-3 text-sm text-purple-400 font-medium"
      >
        {Math.round(progress)}%
      </motion.div>

      {/* Loading dots */}
      <motion.div
        className="flex gap-2 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }} // was 3
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-purple-400 rounded-full"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
