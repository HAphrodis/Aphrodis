// components\work\project-cta.tsx
"use client"

import { motion } from "framer-motion"

import BookingButton from "../shared/booking-button"
import { GetInTouchButton } from "../shared/get-in-touch-button"

export function ProjectCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, type: "spring" as const, bounce: 0.3 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950/90 to-emerald-900/40 p-8 backdrop-blur-xl md:p-12">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 -right-20 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}>
          <h2 className="mb-4 text-3xl font-bold md:text-3xl lg:text-4xl">
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
              Ready to bring your ideas to life?
            </span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-white/80">
            I&apos;m currently available for freelance work and exciting
            collaborations. Let&apos;s create something amazing together that
            exceeds expectations.
          </p>
        </motion.div>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto">
            <GetInTouchButton />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto">
            <BookingButton size="lg" />
          </motion.div>
        </div>

        {/* Stats/Social Proof */}
        <div className="mt-12 grid grid-cols-2 gap-6 text-center md:grid-cols-3">
          <div className="flex flex-col items-center">
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
              15+
            </span>
            <span className="mt-1 text-sm text-white/70">
              Projects Completed
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
              {">"}90%
            </span>
            <span className="mt-1 text-sm text-white/70">
              Client Satisfaction
            </span>
          </div>
          <div className="col-span-2 flex flex-col items-center md:col-span-1">
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
              24/7
            </span>
            <span className="mt-1 text-sm text-white/70">
              Support & Communication
            </span>
          </div>
        </div>
      </div>

      {/* Animated border effect */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl border border-emerald-500/10">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
      </div>
    </motion.div>
  )
}
