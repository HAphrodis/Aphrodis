// components\blog\viewCounter.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import NumberFlow from "@number-flow/react";

interface ViewCounterProps {
  slug: string;
  initialCount?: number;
}

export default function ViewCounter({
  slug,
  initialCount = 0,
}: ViewCounterProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(initialCount);
  const hasIncrementedRef = useRef(false);

  useEffect(() => {
    const incrementView = async () => {
      if (hasIncrementedRef.current) return;

      try {
        const response = await fetch("/api/views", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
        });

        const data = await response.json();
        setCount(data.count);
        hasIncrementedRef.current = true;
      } catch (error) {
        console.error("Error incrementing views:", error);
      } finally {
        setIsLoading(false);
      }
    };

    incrementView();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <Eye className="h-4 w-4 text-muted-foreground" />
        <Skeleton className="h-4 w-16" />
      </div>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <motion.div
            className="group relative flex items-center space-x-2 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-4 py-2 transition-all duration-300 hover:from-blue-500/20 hover:to-cyan-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{
              rotateY: [-5, 5, -5, 0],
              transition: { duration: 0.5 },
            }}
          >
            <motion.div
              className="relative"
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <Eye className="h-4 w-4 text-blue-500" />
              <motion.div
                className="absolute -inset-1 rounded-full bg-blue-500/20 opacity-0 group-hover:opacity-100"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            </motion.div>
            <div className="flex items-center space-x-1">
              <div className="relative overflow-hidden">
                <NumberFlow
                  value={count}
                  locales="en-US"
                  format={{ useGrouping: true }}
                  animated={true}
                  className={cn(
                    "font-medium",
                    count > 1000
                      ? "text-blue-500"
                      : "text-gray-300 dark:text-gray-300",
                  )}
                />
              </div>
              <span className="text-sm hidden sm:block text-gray-500 dark:text-gray-400">
                views
              </span>
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-cyan-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Number of times this article has been viewed</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
