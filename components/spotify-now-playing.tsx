"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, ExternalLink, RefreshCw, AlertCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface SpotifyTrack {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  error?: string;
}

export default function SpotifyNowPlaying({
  isOwner = false,
}: {
  isOwner?: boolean;
}) {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNowPlaying = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch("/api/spotify/now-playing");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Fetched track data:", data);
      setTrack(data);
    } catch (error) {
      console.error("Error fetching now playing:", error);
      setError("Failed to fetch current song");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRefresh = async () => {
    if (refreshing) return;

    setRefreshing(true);
    try {
      const res = await fetch("/api/spotify/refresh", {
        method: "POST",
      });

      if (res.ok) {
        const data = await res.json();
        setTrack(data);
      } else {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    } catch (error) {
      console.error("Error refreshing song data:", error);
      setError("Failed to refresh song data");
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, [fetchNowPlaying]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center py-4 text-white/60"
      >
        <Music2 className="h-4 w-4 animate-pulse mr-2" />
        <span className="text-sm">Loading...</span>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center py-4 text-red-400"
      >
        <AlertCircle className="h-4 w-4 mr-2" />
        <span className="text-sm">{error}</span>
      </motion.div>
    );
  }

  if (!track?.isPlaying) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center py-4 text-white/60"
      >
        <Music2 className="h-4 w-4 mr-2" />
        <span className="text-sm">No song currently playing</span>
      </motion.div>
    );
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
          className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/80"
        >
          <div className="flex items-center gap-3">
            {track.albumImageUrl && (
              <div className="relative h-12 w-12 rounded-md overflow-hidden">
                <Image
                  src={track.albumImageUrl || "/placeholder.svg"}
                  alt={track.album || "Album Cover"}
                  fill
                  className="object-cover transition-transform hover:scale-110"
                />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-emerald-400">
                {track.title}
              </span>
              <span className="text-xs text-white/60">{track.artist}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Music2 className="h-4 w-4 text-emerald-400" />
            <span className="text-sm">Now Playing on Spotify</span>
            {track.songUrl && (
              <a
                href={track.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-1 text-white/60 hover:text-emerald-400 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}

            {isOwner && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                disabled={refreshing}
                className="h-8 w-8 text-white/60 hover:text-emerald-400 hover:bg-emerald-500/10"
              >
                <RefreshCw
                  className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                />
                <span className="sr-only">Refresh</span>
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
