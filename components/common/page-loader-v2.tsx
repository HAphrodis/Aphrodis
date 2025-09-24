"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { DrawLineText } from "../gsap/draw-line-text";
import SignatureText from "./signature-text";

const containerVariants:Variants = {
  hidden: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const textVariants:Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 3,
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const progressVariants:Variants = {
  hidden: {
    width: "0%",
  },
  visible: {
    width: "100%",
    transition: {
      delay: 1,
      duration: 2.5,
      ease: "easeInOut",
    },
  },
};

interface PageLoaderProps {
  onComplete: () => void;
}

export default function PageLoaderV2({ onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 1.2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      exit="exit"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#002922] overflow-hidden"
    >
      {/* Background Effects - Same as Hero */}
      <div
        aria-hidden
        className="absolute inset-0 isolate opacity-65 contain-strict"
      >
        <div className="w-[35rem] h-[80rem] -translate-y-[21.875rem] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(160,100%,85%,.08)_0,hsla(160,100%,55%,.02)_50%,hsla(160,100%,45%,0)_80%)]" />
        <div className="h-[80rem] absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(160,100%,85%,.06)_0,hsla(160,100%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
        <div className="h-[80rem] -translate-y-[21.875rem] absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(160,100%,85%,.04)_0,hsla(160,100%,45%,.02)_80%,transparent_100%)]" />
      </div>

      <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_10%,transparent_0%,#002922_75%)]"></div>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-emerald-400/20 rounded-full"
            animate={{
              x: [0, Math.random() * 80 - 40],
              y: [0, Math.random() * 80 - 40],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Logo/Icon */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Hbapte Logo with Writing Effect */}
          <motion.div className="relative w-80 h-32 flex items-center justify-center">
            {/* Outer rotating ring */}
            <motion.div
              className="absolute inset-0 border-2 border-emerald-400/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            {/* Inner pulsing ring */}
            <motion.div
              className="absolute inset-3 border border-emerald-400/15 rounded-full"
              animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* SVG Hbapte Logo */}
            <motion.svg
              width="280"
              height="80"
              viewBox="0 0 280 80"
              className="relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {/* Letter H */}
              <motion.path
                d="M10 15 L10 65 M10 40 L30 40 M30 15 L30 65"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 2.5,
                  ease: "easeInOut",
                }}
                style={{
                  filter: "drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))",
                }}
              />

              {/* Letter b */}
              <motion.path
                d="M45 15 L45 65 M45 40 Q55 35 60 40 Q55 45 45 40 M45 52 Q55 47 60 52 Q55 57 45 52"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  delay: 0.4,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
                style={{
                  filter: "drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))",
                }}
              />

              {/* Letter a */}
              <motion.path
                d="M75 55 Q75 45 85 45 Q95 45 95 55 L95 65 M95 52 Q85 47 75 52"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  delay: 0.8,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
                style={{
                  filter: "drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))",
                }}
              />

              {/* Letter p */}
              <motion.path
                d="M110 45 L110 70 M110 45 Q120 40 125 45 Q120 50 110 45"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  delay: 1.2,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
                style={{
                  filter: "drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))",
                }}
              />

              {/* Letter t */}
              <motion.path
                d="M140 45 L140 62 M135 48 L145 48"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  delay: 1.6,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
                style={{
                  filter: "drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))",
                }}
              />

              {/* Letter e */}
              <motion.path
                d="M160 55 Q160 45 170 45 Q180 45 180 55 Q180 65 170 65 Q160 65 160 55 M160 55 L180 55"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  delay: 2,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
                style={{
                  filter: "drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))",
                }}
              />
            </motion.svg>

            {/* Glowing background effect */}
            <div className="absolute inset-0 bg-emerald-400/5 rounded-full blur-2xl animate-pulse" />
          </motion.div>
        </motion.div>

        {/* Full Name with Signature Effect */}
        <div className="mb-8 flex justify-center">
          <SignatureText
            text="Ishimwe Jean Baptiste"
            strokeWidth={1.8}
            color="#10b981"
            className="font-medium"
          />
        </div>

        {/* Full Name with Drawing Effect */}
        <div className="mb-8 flex justify-center">
          <DrawLineText
            text="Aphrodis Hakuzweyezu"
            fontSize={28}
            strokeWidth={1}
            color="#10b981"
            oneByOne={false}
            // drawDuration={3}
            // staggerDelay={0.05}
            className="font-medium"
          />
        </div>

        {/* Loading Text */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-8"
        >
          <p className="text-white/80">Loading Portfolio...</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-72 h-1.5 bg-emerald-900/20 rounded-full overflow-hidden border border-emerald-500/10">
          <motion.div
            variants={progressVariants}
            initial="hidden"
            animate="visible"
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.4)]"
          />
        </div>

        {/* Progress Percentage */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-4 text-sm text-emerald-400/80 font-medium"
        >
          {Math.round(progress)}%
        </motion.div>

        {/* Loading dots animation */}
        <motion.div
          className="flex gap-1.5 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-emerald-400 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
