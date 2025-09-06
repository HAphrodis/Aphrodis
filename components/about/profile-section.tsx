/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@/components/shared/connect-button";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { motion, useScroll, useTransform } from "framer-motion";
import { socialLinks } from "@/constants/links";

interface ProfileSectionProps {
  name: string;
  title: string;
  imageSrc: string;
}

export function ProfileSection({
  name,
  title,
  imageSrc = "/profile-pic.png",
}: ProfileSectionProps) {
  // Parallax effect for the profile image
  const { scrollY } = useScroll();
  const profileImageY = useTransform(scrollY, [0, 500], [0, 50]);

  // Interactive elements state
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement for interactive background effect

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden py-8"
      //   onMouseMove={handleMouseMove}
      //   onMouseEnter={() => setIsHovering(true)}
      //   onMouseLeave={() => setIsHovering(false)}
    >
      {/* Dynamic background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/30 to-[#002922] z-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.1),transparent_70%)]"></div>

        {/* Interactive spotlight effect */}
        {isHovering && (
          <motion.div
            className="absolute bg-emerald-400/5 rounded-full blur-[80px] w-[300px] h-[300px] pointer-events-none z-5"
            animate={{
              x: mousePosition.x - 150,
              y: mousePosition.y - 150,
            }}
            transition={{ type: "spring", damping: 15 }}
          />
        )}

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-emerald-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-emerald-400/20 rounded-full animate-pulse"></div>
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            },
            item: {
              hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  type: "spring",
                  bounce: 0.3,
                  duration: 0.8,
                },
              },
            },
          }}
          className="flex flex-col items-center space-y-2"
        >
          {/* Profile Image with interactive elements */}
          <motion.div
            className="relative w-24 h-24 mb-8"
            style={{ y: profileImageY }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {/* Animated glow effect */}
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse"></div>

            {/* Rotating border effect */}
            <motion.div
              className="absolute inset-[-5px] rounded-full border-2 border-emerald-400/20 border-dashed"
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            {/* Image container */}
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-emerald-500/30 shadow-[0_0_25px_rgba(16,185,129,0.2)]">
                <Image
                  src={imageSrc || "/placeholder.svg"}
                  alt={name}
                  width={192}
                  height={192}
                  className="rounded-full object-cover"
                />
              </div>

              {/* Pulsing effect */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-emerald-400/50"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(16,185,129,0.2)",
                    "0 0 0 10px rgba(16,185,129,0)",
                    "0 0 0 0 rgba(16,185,129,0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
            </div>
          </motion.div>

          {/* Name with animated text effect */}
          <TextEffect
            preset="fade-in-blur"
            speedSegment={0.3}
            as="h1"
            className="text-2xl md:text-3xl font-bold text-white"
          >
            {name}
          </TextEffect>

          {/* Title with animated text effect */}
          <TextEffect
            preset="fade-in-blur"
            speedSegment={0.3}
            delay={0.3}
            as="p"
            className="text-xl md:text-xl text-emerald-400 font-medium"
          >
            {title}
          </TextEffect>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex justify-center gap-4 my-4"
          >
            {socialLinks.slice(0, 5).map((link) => {
              const Icon = link.icon;
              return (
                <motion.div
                  key={link.title}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-900/50 border border-emerald-500/20 text-white/80 hover:text-emerald-400 transition-colors"
                    aria-label={link.title}
                    title={link.title}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mt-4"
          >
            {/* Using memo to prevent re-renders */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ConnectButton />
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="https://rxresu.me/ijbapte/hbapte-copy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="default"
                  className="rounded-md bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white border-0 shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  <Download className="mr-2 h-4 w-4" />
                  GET MY RESUME
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatedGroup>
      </div>
    </section>
  );
}
