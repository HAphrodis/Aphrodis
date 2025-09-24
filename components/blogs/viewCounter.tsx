'use client';

import { useEffect, useState, useRef } from 'react';
import { useCountUp } from 'react-countup';
import { Eye } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ViewCounterProps {
  slug: string;
  initialCount?: number;
}

export default function ViewCounter({
  slug,
  initialCount = 0
}: ViewCounterProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(initialCount);
  const countUpRef = useRef<HTMLElement>(null!);

  const { update } = useCountUp({
    ref: countUpRef,
    start: initialCount,
    end: count,
    duration: 1,
    separator: ','
  });

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch('/api/views', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ slug })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch view count');
        }

        const data = await response.json();
        setCount(data.count);
        update(data.count);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching views:', error);
        setError((error as Error).message || 'An error occurred');
        setIsLoading(false);
      }
    };

    fetchViews();
  }, [slug, update]);

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <Eye className="h-4 w-4 text-muted-foreground" />
        <Skeleton className="h-4 w-16" />
      </div>
    );
  }

  if (error) {
    return (
      <span className="flex items-center space-x-2 text-sm text-red-500">
        <Eye className="h-4 w-4" />
        <span>{error}</span>
      </span>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <motion.div
            className="flex items-center space-x-2 text-sm bg-gray-100 rounded-full px-3 py-1 hover:bg-gray-200 transition-colors duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
            >
              <Eye className="h-4 w-4 text-primary" />
            </motion.div>
            <span className="flex items-center">
              <span
                ref={countUpRef}
                className={cn(
                  'font-medium',
                  count > 1000 ? 'text-primary' : 'text-gray-700'
                )}
              >
                {count}
              </span>
              <span className="ml-1 text-gray-600">views</span>
            </span>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Number of times this article has been viewed</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

