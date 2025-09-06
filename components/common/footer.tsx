// components\common\footer.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";
import SpotifyNowPlaying from "@/components/common/spotify-now-playing";
import { NewsletterForm } from "@/components/common/newsletter-form";
import { FaEnvelope, FaGithub, FaHeart, FaInstagram, FaLinkedin, FaPhone } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 0.6,
      },
    },
  };

  return (
    <footer
      ref={footerRef}
      className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-10 px-4 md:px-4 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-950/20"></div> */}

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-purple-400/5 rounded-full blur-xl"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Background Name */}
      {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.02] overflow-hidden">
        <motion.h1
          className="text-[8rem] md:text-[11rem] lg:text-[14rem] font-bold whitespace-nowrap text-purple-400"
          animate={{ rotate: [-3, 0, -3] }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          APHRODIS
        </motion.h1>
      </div> */}

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-12 gap-12"
        >
          {/* Brand Section */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-4 space-y-6"
          >
            <div className="space-y-4">
             <h2 className="text-xl font-bold text-white">Let&apos;s Connect</h2>
              <p className="text-white/80 text-sm leading-relaxed">
                I am always open and willing to collaborate on any project or work opportunity.
              </p>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.nav
            variants={itemVariants}
            className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2"
          >
            
              <div className="space-y-4">
                <div className="Space-y-4">
            <div>
              <h2 className="inline-block text-xl mb-2 border-b-4 border-blue-600">Connect With Me</h2>
            </div>
           <div className="flex-shrink-0 gap-2">
           <div className="flex items-center gap-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
      
          <Link
            href="https://github.com/HAphrodis"
            target="_blank"
            rel="noopener noreferrer"
            className="relative hover:text-blue-400 hover:border-blue-400 group p-2 rounded-full text-white border border-white transition-transform duration-300"
            aria-label="GitHub Profile"
          >
            <FaGithub className="w-4 h-4" />
            <span className="absolute -inset-1 rounded-full opacity-50 transition duration-300" aria-hidden="true"></span>
          </Link>

         <Link
            href="https://www.linkedin.com/in/aphrodis-hakuzweyezu-675677304"
            target="_blank"
            rel="noopener noreferrer"
            className="relative hover:text-blue-400 hover:border-blue-400 group p-2 rounded-full text-white border border-white transition-transform duration-300"
            aria-label="Linkedin Profile"
          >
            <FaLinkedin className="w-4 h-4" />
            <span className="absolute -inset-1 rounded-full opacity-50 transition duration-300" aria-hidden="true"></span>
          </Link>
         <Link
            href="https://www.instagram.com/hakuzweyezu_aphrodis"
            target="_blank"
            rel="noopener noreferrer"
            className="relative hover:text-blue-400 hover:border-blue-400 group p-2 rounded-full text-white border border-white transition-transform duration-300"
            aria-label="Instagrm Profile"
          >
            <FaInstagram className="w-4 h-4" />
            <span className="absolute -inset-1 rounded-full opacity-50 transition duration-300" aria-hidden="true"></span>
          </Link>
         <Link
            href="https://x.com/Aphossy1"
            target="_blank"
            rel="noopener noreferrer"
            className="relative hover:text-blue-400 hover:border-blue-400 group p-2 rounded-full text-white border border-white transition-transform duration-300"
            aria-label="Twitter Profile"
          >
            <FaXTwitter className="w-4 h-4" />
            <span className="absolute -inset-1 rounded-full opacity-50 transition duration-300" aria-hidden="true"></span>
          </Link>

         <Link
            href="tel:0784343073"
            target="_blank"
            rel="noopener noreferrer"
            className="relative hover:text-blue-400 hover:border-blue-400 group p-2 rounded-full text-white border border-white transition-transform duration-300"
            aria-label="Phone Number"
          >
            <FaPhone className="w-4 h-4" />
            <span className="absolute -inset-1 rounded-full opacity-50 transition duration-300" aria-hidden="true"></span>
          </Link>
       
         <Link
            href="mailto:hakuzweaphossy@gmail"
            target="_blank"
            rel="noopener noreferrer"
            className="relative hover:text-blue-400 hover:border-blue-400 group p-2 rounded-full text-white border border-white transition-transform duration-300"
            aria-label="My Email"
          >
            <FaEnvelope className="w-4 h-4" />
            <span className="absolute -inset-1 rounded-full opacity-50 transition duration-300" aria-hidden="true"></span>
          </Link>
      </div>
          </div>

          </div>
            </div>

            <NewsletterForm variant="sidebar" />
          </motion.nav>
        </motion.div>

        {/* Spotify Now Playing */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={controls}
          className="my-4"
        >
          <SpotifyNowPlaying />
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="pt-2 border-t border-purple-500/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2"
          >
            <p className="text-white/60 text-sm">
              &copy; {currentYear} Aphrodis. All rights reserved.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            <p className="text-white/60 text-sm flex items-center gap-1">
              Made with{" "}
              <FaHeart className="h-3 w-3 text-red animate-pulse" />
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
