"use client";

import { useEffect, useState, useRef } from "react";
import { SignInForm } from "./signin-form";
import { motion, useAnimation } from "framer-motion";
import { personalInfo } from "@/constants/profile-data";
import { useMousePosition } from "@/hooks/use-mouse-position";

export default function SignInViewPage() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const controls = useAnimation();

  // Fix for hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animate the spotlight effect based on mouse position
  useEffect(() => {
    if (!containerRef.current || !mousePosition.x || !mousePosition.y) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = mousePosition.x - rect.left;
    const y = mousePosition.y - rect.top;

    controls.start({
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(16, 185, 129, 0.15) 0%, rgba(0, 0, 0, 0) 50%)`,
    });
  }, [mousePosition, controls]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0a0f16]"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-0 -left-40 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="absolute bottom-0 -right-40 h-[600px] w-[600px] rounded-full bg-emerald-600/10 blur-[100px]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Spotlight effect that follows cursor */}
        <motion.div
          className="absolute inset-0 opacity-80"
          animate={controls}
          transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        />
      </div>

      {/* Content container */}
      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center justify-center px-4 py-10 md:flex-row md:items-stretch md:px-8 md:py-20">
        {/* Left side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10 flex w-full flex-col items-center text-center md:mb-0 md:w-5/12 md:items-start md:pr-8 md:text-left lg:pr-12"
        >
          <div className="mb-6 flex items-center justify-center md:justify-start">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative h-16 w-16 overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700"
            >
              <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">
                {personalInfo.name.charAt(0)}
              </span>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="ml-4"
            >
              <h2 className="text-xl font-bold text-white">Portfolio Admin</h2>
              <p className="text-emerald-400">{personalInfo.title}</p>
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
          >
            Welcome <span className="text-emerald-400">back</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-8 max-w-md text-lg text-gray-400"
          >
            Access your portfolio dashboard to manage content, track analytics,
            and connect with your audience.
          </motion.p>

          {/* Feature highlights */}
          <div className="grid w-full grid-cols-2 gap-4">
            {[
              { title: "Projects", value: "15+" },
              { title: "Messages", value: "New" },
              { title: "Subscribers", value: "100+" },
              { title: "Analytics", value: "Live" },
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                className="flex flex-col items-center rounded-xl border border-emerald-900/50 bg-emerald-900/10 p-4 backdrop-blur-sm md:items-start"
              >
                <span className="text-2xl font-bold text-emerald-400">
                  {stat.value}
                </span>
                <span className="text-sm text-gray-400">{stat.title}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right side - Login form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-7/12"
        >
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-emerald-600/10 blur-3xl" />

            {/* Card container with glassmorphism effect */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-xl">
              {/* Animated border gradient */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent -translate-x-full animate-[shimmer_3s_infinite]"></div>
              </div>

              {/* Form content */}
              <div className="relative z-10 rounded-xl p-6 md:p-8">
                <SignInForm />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-4 text-center text-sm text-gray-500"
      >
        <p>
          © {new Date().getFullYear()} {personalInfo.name} • Secure Admin
          Access
        </p>
      </motion.div>
    </div>
  );
}
