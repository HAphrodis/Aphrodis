/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Music2,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MusicPlayerProps {
  variant?: "full" | "compact" | "minimal";
  className?: string;
}

export default function MusicPlayer({
  variant = "full",
  className = "",
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);

  // Animation values
  const pulseScale = useMotionValue(1);
  const pulseOpacity = useTransform(pulseScale, [1, 1.2], [0.6, 0]);
  const progressWidth = useMotionValue(`${(currentTime / duration) * 100}%`);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio("/music/music.mp3");
    audioRef.current = audio;

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    });

    audio.volume = isMuted ? 0 : volume / 100;

    return () => {
      audio.pause();
      audio.src = "";
      cancelAnimationFrame(animationRef.current as number);
    };
  }, [isMuted, volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    progressWidth.set(`${(currentTime / duration) * 100}%`);
  }, [currentTime, duration, progressWidth]);

  // Pulse animation for the music icon when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        pulseScale.set(1.2);
        setTimeout(() => pulseScale.set(1), 500);
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, pulseScale]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      cancelAnimationFrame(animationRef.current as number);
    } else {
      audioRef.current.play();
      animationRef.current = requestAnimationFrame(updateProgress);
    }

    setIsPlaying(!isPlaying);
  };

  const updateProgress = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    animationRef.current = requestAnimationFrame(updateProgress);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current || isDraggingProgress) return;

    const rect = progressRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    progressWidth.set(`${pos * 100}%`);
  };

  const skipBackward = () => {
    if (audioRef.current) {
      const newTime = Math.max(0, currentTime - 10);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipForward = () => {
    if (audioRef.current && duration) {
      const newTime = Math.min(duration, currentTime + 10);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Minimal variant for mobile dock
  if (variant === "minimal") {
    return (
      <TooltipProvider>
        <div ref={playerRef} className={cn("relative", className)}>
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-900/20 backdrop-blur-md p-1 text-emerald-100 cursor-pointer"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={togglePlay}
                  className="h-6 w-6 flex items-center justify-center relative"
                  aria-label="Music controls"
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4 z-10" />
                  ) : (
                    <Music2 className="h-4 w-4 z-10 ml-0.5" />
                  )}
                  {isPlaying && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-emerald-400"
                      style={{
                        scale: pulseScale,
                        opacity: pulseOpacity,
                      }}
                    />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="bg-black/90 text-emerald-100 border-emerald-300/20"
              >
                {isPlaying ? "Pause music" : "Play music"}
              </TooltipContent>
            </Tooltip>
          </motion.div>
        </div>
      </TooltipProvider>
    );
  }

  // Compact variant for mobile sheet and command menu
  if (variant === "compact") {
    return (
      <div ref={playerRef} className={cn("w-full", className)}>
        <div className="bg-emerald-900/50 backdrop-blur-sm rounded-xl border border-emerald-500/20 p-4">
          {/* Controls */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={skipBackward}
                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-emerald-500/20 transition-colors"
                aria-label="Skip backward 10s"
              >
                <SkipBack className="h-4 w-4 text-emerald-300" />
              </button>

              <button
                onClick={togglePlay}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5 text-emerald-200" />
                ) : (
                  <Play className="h-5 w-5 text-emerald-200 ml-0.5" />
                )}
              </button>

              <button
                onClick={skipForward}
                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-emerald-500/20 transition-colors"
                aria-label="Skip forward 10s"
              >
                <SkipForward className="h-4 w-4 text-emerald-300" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-100/70">
                {formatTime(currentTime)}
              </span>
              <span className="text-xs text-emerald-100/40">/</span>
              <span className="text-xs text-emerald-100/70">
                {formatTime(duration)}
              </span>
            </div>

            <button
              onClick={toggleMute}
              className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-emerald-500/20 transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="h-3.5 w-3.5 text-emerald-300" />
              ) : (
                <Volume2 className="h-3.5 w-3.5 text-emerald-300" />
              )}
            </button>
          </div>

          {/* Progress bar */}
          <div
            ref={progressRef}
            className="h-2 w-full bg-emerald-900/50 rounded-full overflow-hidden cursor-pointer relative"
            onClick={handleProgressClick}
          >
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full"
              style={{ width: progressWidth }}
            />
          </div>

          {/* Simple playing indicator dots */}
          {isPlaying && (
            <div className="flex justify-center gap-1 h-2 mt-3">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-emerald-400/70 rounded-full"
                  animate={{
                    height: ["4px", `${Math.random() * 6 + 4}px`, "4px"],
                  }}
                  transition={{
                    duration: 0.8 + Math.random() * 0.4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Full variant (original desktop version) - simplified
  return (
    <TooltipProvider>
      <div
        ref={playerRef}
        className={cn("relative", className)}
        onMouseEnter={() => setIsExpanded(true)}
      >
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className={cn(
            "flex items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-900/20 backdrop-blur-md p-1 text-emerald-100 cursor-pointer",
            isExpanded ? "opacity-0 pointer-events-none" : "opacity-100",
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setIsExpanded(true)}
                className="h-6 w-6 flex items-center justify-center relative"
                aria-label="Music controls"
              >
                <Music2 className="h-4 w-4 z-10" />
                {isPlaying && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-emerald-400"
                    style={{
                      scale: pulseScale,
                      opacity: pulseOpacity,
                    }}
                  />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="bg-black/90 text-emerald-100 border-emerald-300/20"
            >
              Music controls
            </TooltipContent>
          </Tooltip>
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="absolute top-0 -left-30 z-[60] rounded-xl border border-emerald-300/30 bg-emerald-900/90 backdrop-blur-md p-3 text-emerald-100 min-w-[240px] shadow-lg shadow-emerald-900/20"
              onMouseLeave={() => setIsExpanded(false)}
            >
              <div className="flex flex-col gap-3">
                {/* Player controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={skipBackward}
                      className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-emerald-500/20 transition-colors"
                      aria-label="Skip backward 10s"
                    >
                      <SkipBack className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={togglePlay}
                      className="h-8 w-8 flex items-center justify-center rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 transition-colors"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4 ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={skipForward}
                      className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-emerald-500/20 transition-colors"
                      aria-label="Skip forward 10s"
                    >
                      <SkipForward className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-emerald-100/70">
                      {formatTime(currentTime)}
                    </span>
                    <span className="text-xs text-emerald-100/40">/</span>
                    <span className="text-xs text-emerald-100/70">
                      {formatTime(duration)}
                    </span>
                  </div>

                  <button
                    onClick={toggleMute}
                    className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-emerald-500/20 transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <VolumeX className="h-3.5 w-3.5" />
                    ) : (
                      <Volume2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                {/* Progress bar */}
                <div
                  ref={progressRef}
                  className="h-2 w-full bg-emerald-900/50 rounded-full overflow-hidden cursor-pointer relative"
                  onClick={handleProgressClick}
                >
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full"
                    style={{ width: progressWidth }}
                  />
                </div>

                {/* Simple playing indicator dots */}
                {isPlaying && (
                  <div className="flex justify-center gap-1 h-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-emerald-400/70 rounded-full"
                        animate={{
                          height: ["4px", `${Math.random() * 6 + 4}px`, "4px"],
                        }}
                        transition={{
                          duration: 0.8 + Math.random() * 0.4,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          ease: "easeInOut",
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  );
}
