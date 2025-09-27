"use client";

import { Trophy } from "lucide-react";
// import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CompletionBadgeProps {
  isCompleted: boolean;
}

export function CompletionBadge({ isCompleted }: CompletionBadgeProps) {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isCompleted && !hasAnimated) {
      // Shoot confetti from both sides
      // confetti({
      //   particleCount: 100,
      //   spread: 70,
      //   origin: { x: 0.2, y: 0.6 },
      // });
      // confetti({
      //   particleCount: 100,
      //   spread: 70,
      //   origin: { x: 0.8, y: 0.6 },
      // });
      setHasAnimated(true);
    }
  }, [isCompleted, hasAnimated]);

  if (!isCompleted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/20" />
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500">
          <Trophy className="h-5 w-5 text-white" />
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-emerald-400">
          Achievement Unlocked!
        </h3>
        <p className="text-sm text-emerald-300/70">
          You&apos;ve mastered this article
        </p>
      </div>
    </motion.div>
  );
}
