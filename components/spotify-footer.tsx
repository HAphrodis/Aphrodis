"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, ExternalLink, Pause } from "lucide-react";
import Image from "next/image";

interface SpotifyTrack {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

export default function SpotifyFooter() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch("/api/spotify/now-playing");
        const data = await res.json();
        setTrack(data);
      } catch (error) {
        console.error("Error fetching now playing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
    // Poll every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <footer className="fixed bottom-0 left-0 w-full border-t bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
        <div className="container flex h-14 items-center justify-end">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Music className="h-4 w-4" />
            Loading...
          </div>
        </div>
      </footer>
    );
  }

  if (!track?.isPlaying) {
    return (
      <footer className="fixed bottom-0 left-0 w-full border-t bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
        <div className="container flex h-14 items-center justify-end">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Pause className="h-4 w-4" />
            Not playing
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="fixed bottom-0 left-0 w-full border-t bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
      <div className="container flex h-14 items-center justify-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={track.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3"
          >
            {track.albumImageUrl && (
              <div className="relative h-8 w-8">
                <Image
                  src={track.albumImageUrl || "/placeholder.svg"}
                  alt={track.album || "Album Cover"}
                  fill
                  className="rounded object-cover"
                />
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-2">
                <Music className="h-4 w-4 text-emerald-500" />
                <span className="text-sm">
                  <span className="font-medium text-emerald-500">
                    {track.title}
                  </span>
                  <span className="mx-1 text-muted-foreground">by</span>
                  <span className="text-muted-foreground">{track.artist}</span>
                </span>
              </div>
              {track.songUrl && (
                <a
                  href={track.songUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md p-1 text-muted-foreground hover:bg-emerald-500/10 hover:text-emerald-500"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </footer>
  );
}
