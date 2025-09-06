// components\Hero.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronsDown } from "lucide-react";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { ConnectButton } from "./shared/connect-button";
import { HighlightText } from "./animate-ui/text/highlight";
import { useEffect, useState } from "react";
import Image from "next/image";

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
  <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0">
    <Image
      src="/contacts.png"
      alt="Background Image"
      width={1920}
      height={1080}
      className="object-cover w-full h-full"
      priority
    />
    {/* Light overlay */}
    <div className="absolute inset-0 bg-black/60"></div> {/* 20% black overlay */}
  </div>
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
             <button className="relative border text-gray-200 dark:text-black px-6 py-2 rounded-md overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 transform -translate-x-full group-hover:translate-x-0 transition duration-300"
          ></span>
          <span className="relative z-10 font-bold group-hover:text-green-400">Latest Projects</span>
                </button>
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
            <ChevronsDown className="h-6 w-6 text-purple-200" />
          </motion.div>
        </motion.a>
      )}

        </motion.div>
      </div>
    </section>
  );
}
