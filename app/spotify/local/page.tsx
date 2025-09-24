"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NowPlaying from "@/components/now-playing";
import { Music, Loader, Sparkles } from "lucide-react";
import { checkAuthStatus } from "@/app/actions/auth";

const containerVariants:Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4 },
  },
};

export default function SpotifyPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasToken, setHasToken] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuthenticated = await checkAuthStatus();
        setHasToken(isAuthenticated);
      } catch (error) {
        console.error("Error checking auth status:", error);
        setHasToken(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleAuth = () => {
    setIsAuthenticating(true);

    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI!;
    const scope = encodeURIComponent("user-read-currently-playing");

    const callbackUrl = redirectUri.replace("/spotify", "/callback");

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${callbackUrl}&scope=${scope}&show_dialog=true`;

    window.location.href = authUrl;
  };

  return (
    <div className="relative min-h-screen bg-[#002922]">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 right-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="container relative flex items-center justify-center min-h-screen py-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLoading ? "loading" : hasToken ? "player" : "login"}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {isLoading ? (
              <Card className="w-full max-w-[31rem] backdrop-blur-sm bg-white/95 dark:bg-gray-950/95 border-emerald-100 dark:border-emerald-900/50">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
                    <Loader className="h-12 w-12 animate-spin text-emerald-500 relative z-10" />
                  </div>
                  <p className="mt-4 text-emerald-600 dark:text-emerald-400">
                    Checking authentication status...
                  </p>
                </CardContent>
              </Card>
            ) : hasToken ? (
              <NowPlaying />
            ) : (
              <Card className="w-full max-w-[31rem] backdrop-blur-sm bg-white/95 dark:bg-gray-950/95 shadow-2xl border-emerald-100 dark:border-emerald-900/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent dark:from-emerald-950/50 pointer-events-none" />
                <CardHeader>
                  <CardTitle className="flex flex-col items-center justify-center space-y-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
                      <div className="relative z-10 bg-emerald-50 dark:bg-emerald-900/50 p-4 rounded-full">
                        <Music className="h-8 w-8 text-emerald-500" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent text-2xl">
                        Spotify Now Playing
                      </span>
                      <Sparkles className="h-6 w-6 text-emerald-500 animate-pulse" />
                    </div>
                  </CardTitle>
                  <CardDescription className="text-center text-emerald-600 dark:text-emerald-400">
                    Connect your Spotify account to see what&apos;s currently
                    playing
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={handleAuth}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
                      disabled={isAuthenticating}
                    >
                      {isAuthenticating ? (
                        <>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Music className="mr-2 h-4 w-4" />
                          Connect with Spotify
                        </>
                      )}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
