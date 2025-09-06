"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, ArrowLeft, Search} from "lucide-react";
import { useEffect, useState } from "react";

// const glitchVariants = {
//   animate: {
//     x: [0, -2, 2, 0],
//     textShadow: [
//       "0 0 0 transparent",
//       "2px 0 0 #ff0000, -2px 0 0 #00ff00",
//       "0 0 0 transparent",
//     ],
//     transition: {
//       duration: 0.3,
//       repeat: Number.POSITIVE_INFINITY,
//       repeatDelay: 3,
//     },
//   },
// };

const particleVariants = {
  animate: (i: number) => ({
    y: [0, -100, 0],
    x: [0, Math.random() * 100 - 50, 0],
    opacity: [0, 1, 0],
    scale: [0, 1, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      delay: i * 0.2,
      ease: "easeOut",
    },
  }),
};

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden flex items-center justify-center">
      {/* Background Effects - Same as Hero */}

      <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_10%,transparent_0%,#002922_75%)]"></div>

      {/* Interactive Mouse Follower */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-purple-400/5 blur-3xl pointer-events-none"
        animate={{
          x: mousePosition.x * 4,
          y: mousePosition.y * 4,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={particleVariants}
            animate="animate"
            className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Floating 404 */}
        <motion.div
          className="mb-8"
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-[8rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 leading-none"
          >
            404
          </motion.h1>
        </motion.div>

        {/* Error Icon with Animation */}
        {/* <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="absolute inset-0 w-20 h-20 border-2 border-purple-400/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="absolute inset-2 w-16 h-16 border border-purple-400/30 rounded-full"
            />
            <div className="w-20 h-20 bg-purple-400/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </motion.div> */}

        {/* Title with Typewriter Effect */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-2xl md:text-3xl lg:text-3xl font-bold text-white mb-4"
        >
          Oops! Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className=" text-white/80 mb-8 max-w-2xl mx-auto"
        >
          The page you&apos;re looking for seems to have vanished into the
          digital void. Don&apos;t worry, even the best developers get lost
          sometimes!
        </motion.p>

        {/* Fun Facts */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="bg-purple-900/20 border border-purple-500/20 rounded-xl p-6 mb-8 backdrop-blur-sm"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 font-semibold">
              Did you know?
            </span>
          </div>
          <p className="text-white/70 text-sm md:text-sm">
            The first 404 error was discovered at CERN in 1992. The room where
            the first web server was located was actually room 404!
          </p>
        </motion.div> */}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white border-0 shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 group"
            >
              <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Back to Home
            </Button>
          </Link>

          <Button
            size="lg"
            variant="outline"
            onClick={() => window.history.back()}
            className="bg-white/5 text-white hover:text-white border-purple-500/20 hover:bg-purple-500/10 group"
          >
            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </Button>

          <Link href="/work">
            <Button
              size="lg"
              variant="outline"
              className="bg-white/5 text-white hover:text-white border-purple-500/20 hover:bg-purple-500/10 group"
            >
              <Search className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Explore Work
            </Button>
          </Link>
        </motion.div>

        {/* Easter Egg - Hidden Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-12 text-xs text-purple-400/50 font-mono"
          // eslint-disable-next-line react/jsx-no-comment-textnodes
        >
          // Error 404: Creativity not found, but developer&apos;s sense of
          humor still intact 😄
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="w-16 h-16 border border-purple-400/20 rounded-lg"
        />
      </div>

      <div className="absolute bottom-10 right-10">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="w-12 h-12 border border-purple-400/20 rounded-full"
        />
      </div>

      <div className="absolute top-1/2 left-10 transform -translate-y-1/2">
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="w-8 h-8 bg-purple-400/10 rounded-full"
        />
      </div>

      <div className="absolute top-1/4 right-20">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="w-6 h-6 bg-purple-400/20 rounded-full"
        />
      </div>
    </div>
  );
}
