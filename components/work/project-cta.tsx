"use client";

import { motion } from "framer-motion";
import BookingButton from "../shared/booking-button";
import { GetInTouchButton } from "../shared/get-in-touch-button";

export function ProjectCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950/90 to-emerald-900/40 backdrop-blur-xl p-8 md:p-12"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
              Ready to bring your ideas to life?
            </span>
          </h2>
          <p className="text-white/80  mb-8 max-w-2xl mx-auto">
            I&apos;m currently available for freelance work and exciting
            collaborations. Let&apos;s create something amazing together that
            exceeds expectations.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <GetInTouchButton />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <BookingButton size="lg" />
          </motion.div>
        </div>

        {/* Stats/Social Proof */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12 text-center">
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
              15+
            </span>
            <span className="text-white/70 text-sm mt-1">
              Projects Completed
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
              {">"}90%
            </span>
            <span className="text-white/70 text-sm mt-1">
              Client Satisfaction
            </span>
          </div>
          <div className="flex flex-col items-center col-span-2 md:col-span-1">
            <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
              24/7
            </span>
            <span className="text-white/70 text-sm mt-1">
              Support & Communication
            </span>
          </div>
        </div>
      </div>

      {/* Animated border effect */}
      <div className="absolute inset-0 rounded-3xl border border-emerald-500/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent -translate-x-full animate-[shimmer_3s_infinite]"></div>
      </div>
    </motion.div>
  );
}
