// components\Hero.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { ConnectButton } from "./shared/connect-button";
import { HighlightText } from "./animate-ui/text/highlight";
import { useEffect, useState } from "react";
// import Image  from "next/image"

export default function Hero() {
   const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
    const toggleVisibility = () => {
      if (typeof window !== 'undefined' && window.scrollY < 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', toggleVisibility);
      return () => window.removeEventListener('scroll', toggleVisibility);
    }
  }, []);

  const transitionVariants = {
    item: {
      hidden: {
        opacity: 0,
        filter: "blur(12px)",
        y: 12,
      },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
          type: "spring",
          bounce: 0.3,
          duration: 1.5,
        },
      },
    },
  };

  return (
    <section className="relative min-h-screen bg-[#002922] flex items-center justify-center px-4 overflow-hidden">
      {/* Background Effects */}
      <div
        aria-hidden
        className="absolute inset-0 isolate opacity-65 contain-strict"
      >
        <div className="w-[35rem] h-[80rem] -translate-y-[21.875rem] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(160,100%,85%,.08)_0,hsla(160,100%,55%,.02)_50%,hsla(160,100%,45%,0)_80%)]" />
        <div className="h-[80rem] absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(160,100%,85%,.06)_0,hsla(160,100%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
        <div className="h-[80rem] -translate-y-[21.875rem] absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(160,100%,85%,.04)_0,hsla(160,100%,45%,.02)_80%,transparent_100%)]" />
      </div>

      <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_10%,transparent_0%,#002922_75%)]"></div>

      <div className="max-w-6xl mx-auto text-center  py-auto space-y-8 z-10">
        {/* Avatar */}
        {/* <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-32 h-32 mx-auto"
        >
          <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-2xl" />
          <div className="absolute inset-0 bg-emerald-400/10 rounded-full animate-pulse" />
          <div className="absolute inset-0 bg-emerald-400/5 rounded-full animate-ping" />
  

          <Image src="/avatar.webp" alt="avatar" className="rounded-full" width={600} height={600}/>  
        </motion.div> */}

        {/* Greeting */}
        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.2,
                },
              },
            },
            ...transitionVariants,
          }}
          className="space-y-4"
        >
          <h2 className="text-2xl md:text-3xl text-white flex items-center justify-center gap-2">
            Hi, I&apos;m Ishimwe Jean Baptiste
            <span role="img" aria-label="peace" className="text-2xl">
              ✌️
            </span>
          </h2>
        </AnimatedGroup>

        {/* Main Heading */}
        <TextEffect
          preset="fade-in-blur"
          speedSegment={0.3}
          as="h1"
          className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
        >
          {"Building digital products, brands, and experience."}
        </TextEffect>

        {/* Description */}
        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.5,
                },
              },
            },
            ...transitionVariants,
          }}
          className="space-y-4 text-white/80"
        >
          {/* <p className="text-lg md:text-xl">a Full Stack Developer based in Rwanda.</p> */}
          <p className="text-base md:text-lg">
            I specialize in UI/UX Design, Responsive Web Design,
            <br className="hidden md:block" /> and{" "}
            <HighlightText
              transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
              inView
              className="from-blue-50  text-green-400 to-blue-100 dark:from-blue-500 dark:to-blue-500"
              text="Full Stack"
            />{" "}
            Development.
          </p>
        </AnimatedGroup>

        {/* Social Links */}
        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.7,
                },
              },
            },
            ...transitionVariants,
          }}
          className="flex justify-center gap-5"
        >
          <Link
            href="https://github.com/hbapte"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-emerald-400 transition-colors"
            aria-label="GitHub Profile"
          >
            <FaGithub className="w-6 h-6" />
          </Link>

          <Link
            href="https://linkedin.com/in/hbapte"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-emerald-400 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin className="w-6 h-6" />
          </Link>
          <Link
            href="https://instagram.com/hbapte"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-emerald-400 transition-colors"
            aria-label="Instagram Profile"
          >
            <FaInstagram className="w-6 h-6" />
          </Link>
          <Link
            href="https://twitter.com/HBaptee"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-emerald-400 transition-colors"
            aria-label="Twitter Profile"
          >
            <FaXTwitter className="w-6 h-6" />
          </Link>
          <Link
            href="tel:+250785577189"
            className="text-white/80 hover:text-emerald-400 transition-colors"
            aria-label="Phone Number"
          >
            <FaPhone className="w-5 h-5" />
          </Link>
          <Link
            href="mailto:jbapte@gmail.com"
            className="text-white/80 hover:text-emerald-400 transition-colors"
            aria-label="Email Address"
          >
            <FaEnvelope className="w-6 h-6" />
          </Link>
        </AnimatedGroup>

        {/* CTA Buttons */}
        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.8,
                },
              },
            },
            ...transitionVariants,
          }}
          className="flex flex-col items-center sm:flex-row gap-4 justify-center"
        >
          <ConnectButton />

          <Link href="/work">
            <Button
              size="lg"
              variant="outline"
              className="bg-white/5 w-fit text-white hover:text-white border-emerald-500/10 hover:bg-emerald-500/20"
            >
              MY WORK
            </Button>
          </Link>
        </AnimatedGroup>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          {/* <Link
            href="#about"
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce"
          >
            <ChevronDown className="h-6 w-6 text-emerald-400" />
          </Link> */}

                {/* Scroll Indicator */}
      {typeof window !== 'undefined' && (
        <motion.a
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 transform cursor-pointer"
          href="#about"
          initial={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            className=""
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            <ChevronDown className="h-6 w-6 text-emerald-400" />
          </motion.div>
        </motion.a>
      )}

        </motion.div>
      </div>
    </section>
  );
}
