'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Skeleton } from '@/components/ui/skeleton';
import NumberFlow from '@number-flow/react';

interface LikeButtonProps {
  slug: string;
}

export function LikeButton({ slug }: LikeButtonProps) {
  const [likes, setLikes] = useState<number | null>(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch(`/api/likes?slug=${slug}`);
        console.log(response);
        if (!response.ok) throw new Error('Failed to fetch likes');
        const data = await response.json();
        setLikes(data.count);   
        setHasLiked(data.hasLiked); 
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };
    fetchLikes();
  }, [slug]);

  const triggerConfetti = () => {
    const colors = ['#FF69B4', '#FF1493', '#FF0000'];
    const end = Date.now() + 700;

    const runConfetti = () => {
      const particleCount = 2;
      confetti({
        particleCount,
        angle: 60,
        spread: 55,
        origin: { x: 0.5, y: 1 },
        colors,
        shapes: ['circle'],
        gravity: 1.2,
        scalar: 2
      });
      confetti({
        particleCount,
        angle: 120,
        spread: 55,
        origin: { x: 0.5, y: 1 },
        colors,
        shapes: ['circle'],
        gravity: 1.2,
        scalar: 2
      });

      if (Date.now() < end) {
        requestAnimationFrame(runConfetti);
      }
    };
    runConfetti();
  };

  const handleLike = async () => {
    if (hasLiked || isLoading) return;

    setIsLoading(true);
    setShowHearts(true);

    try {
      const response = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug })
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 409) {
        setLikes(data.count);
        setHasLiked(true);
        return;
      }

      if (!response.ok) throw new Error('Failed to like the article');

      setLikes(data.count);
      setHasLiked(true);
      triggerConfetti();
    } catch (error) {
      console.error('Error liking article:', error);
    } finally {
      setIsLoading(false);
      setTimeout(() => setShowHearts(false), 1000);
    }
  };

  if (likes === null) {
    return (
      <div className="flex items-center gap-2 rounded-md bg-white/5 px-4 py-2">
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
                  className="absolute top-1/2 left-1/2"
                  initial={{ opacity: 0, scale: 0.5, x: '-50%', y: '-50%' }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 0.5],
                    y: [0, -60, -120],
                    x: [0, i * 30 - 30, i * 60 - 60]
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
      <motion.button
        onClick={handleLike}
        disabled={hasLiked || isLoading}
        whileHover={{ scale: hasLiked ? 1 : 1.05 }}
        whileTap={{ scale: hasLiked ? 1 : 0.95 }}
        className={`group relative flex items-center gap-3 rounded-md px-5 py-2 transition-all duration-300 ${
          hasLiked
            ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-pink-500'
            : 'border border-emerald-200 text-gray-600 hover:bg-emerald-100 hover:text-pink-600'
        } ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        <motion.div
          animate={
            hasLiked
              ? {
                  scale: [1, 1.2, 1]
                }
              : {}
          }
          transition={{ duration: 0.3 }}
        >
          <Heart
            className={`h-5 w-5 transition-colors duration-300 ${
              hasLiked ? 'fill-pink-500 text-pink-500' : 'fill-none'
            }`}
          />
        </motion.div>
        <div className="relative h-5 overflow-hidden">
          <NumberFlow
            value={likes}
            locales="en-US"
            format={{ useGrouping: true }}
            animated={true}
            className={`text-md font-medium hover:text-pink-500 ${hasLiked ? 'text-pink-500' : 'text-gray-700'}`}
          />{' '}
          Likes
        </div>
      </motion.button>
    </div>
  );
}
