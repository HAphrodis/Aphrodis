"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pause,
  Play,
  RefreshCw,
  ExternalLink,
  Clock,
  LogOut,
  Music2,
  Sparkles,
} from "lucide-react";
import { getCurrentlyPlaying } from "@/app/actions/spotify";
import { logout } from "@/app/actions/auth";
import Image from "next/image";

interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

interface SpotifyArtist {
  name: string;
  external_urls: {
    spotify: string;
  };
}

interface SpotifyAlbum {
  name: string;
  images: SpotifyImage[];
  external_urls: {
    spotify: string;
  };
  release_date: string;
}

interface SpotifyTrack {
  timestamp: number;
  progress_ms: number;
  is_playing: boolean;
  currently_playing_type: string;
  item?: {
    name: string;
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
    duration_ms: number;
    external_urls: {
      spotify: string;
    };
  };
  context?: {
    external_urls: {
      spotify: string;
    };
    type: string;
    uri: string;
  };
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function NowPlaying() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const fetchNowPlaying = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCurrentlyPlaying();
      setTrack(data);
    } catch (err) {
      setError("Failed to fetch currently playing track");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, [fetchNowPlaying]);

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  const formatArtists = (artists: SpotifyArtist[]) => {
    return artists.map((artist, index) => (
      <motion.a
        key={artist.name}
        href={artist.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline text-primary transition-colors duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {artist.name}
        {index < artists.length - 1 ? ", " : ""}
      </motion.a>
    ));
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const getContextInfo = (context?: SpotifyTrack["context"]) => {
    if (!context) return null;

    const typeMap = {
      playlist: "Playlist",
      album: "Album",
      artist: "Artist",
      show: "Podcast",
    };

    return (
      <motion.a
        href={context.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Music2 className="h-3 w-3" />
        Playing from{" "}
        {typeMap[context.type as keyof typeof typeMap] || context.type}
      </motion.a>
    );
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={loading ? "loading" : error ? "error" : "content"}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative"
        >
          {/* Add decorative elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl" />

          <Card className="w-full max-w-[31rem] backdrop-blur-sm bg-white/95 dark:bg-gray-950/95 shadow-2xl border-opacity-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent dark:from-emerald-950/50 pointer-events-none" />

            <CardHeader className="relative">
              <motion.div variants={itemVariants}>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-emerald-500" />
                    <span className="bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
                      Spotify Now Playing
                    </span>
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowLogoutDialog(true)}
                    className="text-muted-foreground hover:text-emerald-500 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </CardTitle>
                <CardDescription>
                  See what&apos;s currently playing on your Spotify account
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent className="relative">
              {loading ? (
                <motion.div
                  className="flex flex-col items-center justify-center h-40 gap-4"
                  animate={{ opacity: [0.5, 1] }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <RefreshCw className="h-8 w-8 text-emerald-500 animate-spin" />
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">
                    Loading your music...
                  </p>
                </motion.div>
              ) : error ? (
                <motion.div
                  className="p-4 bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 rounded-md border border-red-200 dark:border-red-800"
                  variants={itemVariants}
                >
                  {error}
                </motion.div>
              ) : !track || !track.item ? (
                <motion.div
                  className="text-center p-8 space-y-4"
                  variants={itemVariants}
                >
                  <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
                    <Music2 className="h-8 w-8 text-emerald-500" />
                  </div>
                  <p className="text-lg font-medium">
                    Nothing playing right now
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Play something on Spotify to see it here
                  </p>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center space-y-6">
                  <motion.div
                    className="relative group w-48 h-48"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300" />
                    <Image
                      width={800}
                      height={800}
                      src={
                        track.item.album.images[0]?.url || "/placeholder.svg"
                      }
                      alt={track.item.album.name}
                      className="w-48 h-48 rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-emerald-500/25 relative z-10"
                    />
                    <motion.a
                      href={track.item.album.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-20 flex items-center justify-center bg-emerald-950/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink className="w-8 h-8 text-white" />
                    </motion.a>
                  </motion.div>

                  <motion.div
                    className="text-center space-y-3 w-full"
                    variants={itemVariants}
                  >
                    <motion.a
                      href={track.item.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-bold hover:text-emerald-500 transition-colors block"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {track.item.name}
                    </motion.a>
                    <div className="text-emerald-600 dark:text-emerald-400">
                      {formatArtists(track.item.artists)}
                    </div>
                    <motion.a
                      href={track.item.album.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-emerald-500 transition-colors block"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {track.item.album.name}
                    </motion.a>
                    {getContextInfo(track.context)}
                  </motion.div>

                  <motion.div
                    className="w-full space-y-2"
                    variants={itemVariants}
                  >
                    <div className="w-full bg-emerald-100 dark:bg-emerald-950/50 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        className="bg-emerald-500 h-1.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(track.progress_ms / track.item.duration_ms) * 100}%`,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground flex justify-between items-center px-1">
                      <span>{formatTime(track.progress_ms)}</span>
                      <Clock className="w-3 h-3 text-emerald-500" />
                      <span>{formatTime(track.item.duration_ms)}</span>
                    </div>
                  </motion.div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between relative z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  onClick={fetchNowPlaying}
                  disabled={loading}
                  className="border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                >
                  <RefreshCw
                    className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""} text-emerald-500`}
                  />
                  Refresh
                </Button>
              </motion.div>
              {track?.item && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="default"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
                    onClick={() =>
                      window.open(track.item?.external_urls.spotify, "_blank")
                    }
                  >
                    {track.is_playing ? (
                      <Pause className="h-4 w-4 mr-2" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    Open in Spotify
                  </Button>
                </motion.div>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>

      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <LogOut className="h-5 w-5" />
              Disconnect Spotify
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to disconnect your Spotify account?
              You&apos;ll need to reconnect to see your music again.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
              className="border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Disconnect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
