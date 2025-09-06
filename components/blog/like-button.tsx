"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Skeleton } from "@/components/ui/skeleton";
import NumberFlow from "@number-flow/react";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  slug: string;
}

export function LikeButton({ slug }: LikeButtonProps) {
  const [likes, setLikes] = useState<number | null>(null);
  const [userLikes, setUserLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [showMaxReached, setShowMaxReached] = useState(false);

  const MAX_LIKES = 5;
  const isMaxReached = userLikes >= MAX_LIKES;

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch(`/api/likes?slug=${slug}`);
        if (!response.ok) throw new Error("Failed to fetch likes");
        const data = await response.json();
        setLikes(data.count);
        setUserLikes(data.userLikes);

        // Check if max likes reached on initial load
        if (data.userLikes >= MAX_LIKES) {
          setShowMaxReached(true);
          setTimeout(() => setShowMaxReached(false), 2000);
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    fetchLikes();
  }, [slug]);

  const triggerConfetti = () => {
    const colors = ["#FF69B4", "#FF1493", "#FF0000"];
    const end = Date.now() + 1500;

    const runConfetti = () => {
      const particleCount = 6;
      confetti({
        particleCount,
        angle: 60,
        spread: 80,
        origin: { x: 0.5, y: 1 },
        colors,
        shapes: ["circle"],
        gravity: 1.2,
        scalar: 3,
      });
      confetti({
        particleCount,
        angle: 120,
        spread: 80,
        origin: { x: 0.5, y: 1 },
        colors,
        shapes: ["circle"],
        gravity: 1.2,
        scalar: 3,
      });

      if (Date.now() < end) {
        requestAnimationFrame(runConfetti);
      }
    };
    runConfetti();
  };

  const handleLike = async () => {
    if (isMaxReached || isLoading) return;

    setIsLoading(true);
    setShowHearts(true);

    try {
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setLikes(data.count);
          setUserLikes(data.userLikes);
          return;
        }
        throw new Error("Failed to like the article");
      }

      setLikes(data.count);
      setUserLikes(data.userLikes);

      // Only show confetti when reaching exactly MAX_LIKES
      if (data.userLikes === MAX_LIKES) {
        triggerConfetti();
        setShowMaxReached(true);
        setTimeout(() => setShowMaxReached(false), 3000);
      }
    } catch (error) {
      console.error("Error liking article:", error);
    } finally {
      setIsLoading(false);
      setTimeout(() => setShowHearts(false), 1000);
    }
  };

  // Calculate fill percentage based on user likes
  const fillPercentage = (userLikes / MAX_LIKES) * 100;

  if (likes === null) {
    return (
      <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2">
        <Heart className="h-4 w-4" />
        <Skeleton className="h-4 w-8" />
      </div>
    );
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {showHearts && (
          <motion.div
            className="absolute -top-20 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="relative h-16 w-16">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  initial={{ opacity: 0, scale: 0.5, x: "-50%", y: "-50%" }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 0.5],
                    y: [0, -60, -120],
                    x: [0, i * 30 - 30, i * 60 - 60],
                  }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                >
                  <Heart className="h-6 w-6 fill-pink-500 text-pink-500" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Max likes reached notification */}
      <AnimatePresence>
        {showMaxReached && (
          <motion.div
            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            Max hearts given! ❤️❤️❤️❤️❤️
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleLike}
        disabled={isMaxReached || isLoading}
        whileHover={{ scale: isMaxReached ? 1 : 1.05 }}
        whileTap={{ scale: isMaxReached ? 1 : 0.95 }}
        className={cn(
          "group relative flex items-center gap-3 rounded-full px-5 py-2.5 transition-all duration-300",
          userLikes > 0
            ? "bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-pink-500"
            : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white",
          isLoading ? "opacity-50 cursor-not-allowed" : "",
          isMaxReached ? "cursor-default" : "cursor-pointer",
        )}
      >
        <div className="relative">
          <motion.div
            animate={
              userLikes > 0
                ? {
                    scale: [1, 1.2, 1],
                  }
                : {}
            }
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Background heart (empty) */}
            <Heart className="h-5 w-5 transition-colors duration-300" />

            {/* Foreground heart (filled) with clip-path for partial filling */}
            {userLikes > 0 && (
              <Heart
                className="absolute inset-0 fill-pink-500 text-pink-500"
                style={{
                  clipPath: `inset(${100 - fillPercentage}% 0 0 0)`,
                }}
              />
            )}
          </motion.div>

          {/* Like count indicator */}
          {userLikes > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-pink-500  text-white text-[0.7rem] rounded-full h-4 w-4 flex items-center justify-center font-bold"
            >
              {userLikes}
            </motion.div>
          )}
        </div>

        <div className="relative h-5 overflow-hidden">
          <NumberFlow
            value={likes}
            locales="en-US"
            format={{ useGrouping: true }}
            animated={true}
            className={`text-sm font-medium ${userLikes > 0 ? "text-pink-500" : "text-white/80"}`}
          />
        </div>

        {/* Max likes indicator */}
        {/* {userLikes > 0 && (
          <div className="ml-1 text-xs text-pink-400/80">
            {userLikes}/{MAX_LIKES}
          </div>
        )} */}
      </motion.button>

      {/* Pulse effect when max likes reached */}
      {isMaxReached && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ scale: 1, opacity: 0 }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0, 0.2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
          style={{
            background:
              "radial-gradient(circle, rgba(236,72,153,0.3) 0%, rgba(236,72,153,0) 70%)",
          }}
        />
      )}
    </div>
  );
}
