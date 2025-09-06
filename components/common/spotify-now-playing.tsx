"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, ExternalLink, Volume2, Pause } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SpotifyTrack {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

export default function SpotifyNowPlaying() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hasError, setHasError] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchNowPlaying = useCallback(async () => {
    try {
      setHasError(false);
      const res = await fetch("/api/spotify/now-playing");
      const data = await res.json();
      setTrack(data);
    } catch (error) {
      console.error("Error fetching now playing:", error);
      setHasError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // Simulate progress bar animation
  useEffect(() => {
    if (track?.isPlaying && progressRef.current) {
      progressRef.current.style.width = "0%";

      const animate = () => {
        if (progressRef.current) {
          progressRef.current.style.transition = "width 30s linear";
          progressRef.current.style.width = "100%";
        }
      };

      // Small delay to ensure the transition works
      const timeout = setTimeout(animate, 50);
      return () => clearTimeout(timeout);
    }
  }, [track?.isPlaying, track?.title]);

  useEffect(() => {
    fetchNowPlaying();

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set new interval
    intervalRef.current = setInterval(fetchNowPlaying, 30000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchNowPlaying]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center py-4 text-white/60"
      >
        <div className="flex items-center gap-3 bg-emerald-950/30 rounded-full px-4 py-2">
          <Music2 className="h-4 w-4 animate-pulse" />
          <span className="text-sm">Connecting to Spotify...</span>
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  if (hasError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center py-4 text-white/60"
      >
        <div className="flex items-center gap-2 bg-red-950/30 text-red-400 rounded-full px-4 py-2">
          <Music2 className="h-4 w-4" />
          <span className="text-sm">Couldn&apos;t connect to Spotify</span>
          <button
            onClick={fetchNowPlaying}
            className="text-xs underline hover:text-red-300 transition-colors"
          >
            Retry
          </button>
        </div>
      </motion.div>
    );
  }

  if (!track?.isPlaying) {
    return null; // Don't show anything when not playing
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-t border-emerald-500/10 pt-8 pb-4"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={track.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, type: "spring" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative mx-auto max-w-md"
        >
          <a
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div
              className={cn(
                "flex items-center gap-4 bg-emerald-950/30 backdrop-blur-sm rounded-xl p-3 border border-emerald-500/10 transition-all duration-300",
                isHovered &&
                  "bg-emerald-950/50 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
              )}
            >
              {/* Album Art with Overlay */}
              <div className="relative h-16 w-16 rounded-lg overflow-hidden shadow-md">
                <Image
                  src={track.albumImageUrl || "/placeholder.svg"}
                  alt={track.album || "Album Cover"}
                  fill
                  className={cn(
                    "object-cover transition-transform duration-500",
                    isHovered && "scale-110",
                  )}
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-emerald-950/60 flex items-center justify-center opacity-0 transition-opacity duration-300",
                    isHovered && "opacity-100",
                  )}
                >
                  <Pause className="h-6 w-6 text-white" />
                </div>
              </div>

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Volume2
                    className={cn(
                      "h-4 w-4 text-emerald-400 transition-transform duration-300",
                      isHovered && "scale-110",
                    )}
                  />
                  <span className="text-xs text-emerald-400 font-medium">
                    Now Playing on my Spotify
                  </span>
                </div>
                <h4 className="text-white font-medium truncate mt-1">
                  {track.title}
                </h4>
                <p className="text-white/60 text-sm truncate">{track.artist}</p>

                {/* Progress Bar */}
                <div className="mt-2 h-1 w-full bg-emerald-950/50 rounded-full overflow-hidden">
                  <div
                    ref={progressRef}
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                  />
                </div>
              </div>

              {/* External Link Icon */}
              <div
                className={cn(
                  "flex items-center justify-center h-8 w-8 rounded-full bg-emerald-950/50 text-white/70 transition-all duration-300",
                  isHovered &&
                    "bg-emerald-500/20 text-emerald-400 translate-x-1",
                )}
              >
                <ExternalLink className="h-4 w-4" />
              </div>
            </div>
          </a>

          {/* Animated Equalizer */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-end h-6 gap-[3px] px-3 py-1 bg-emerald-950/70 rounded-full border border-emerald-500/20">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-[2px] bg-emerald-400"
                animate={{
                  height: [
                    `${Math.random() * 8 + 4}px`,
                    `${Math.random() * 16 + 8}px`,
                    `${Math.random() * 8 + 4}px`,
                  ],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
