"use client";
import { motion } from "framer-motion";

const AnimatedLoader = () => {
  return (
    <div className="flex h-60 w-60 items-center justify-center">
      <div className="relative">
        {/* Central circle */}
        <motion.div
          className="absolute top-1/2 left-1/2 h-12 w-12 rounded-full bg-[#11922f]/80"
          initial={{ scale: 0.8, x: "-50%", y: "-50%" }}
          animate={{
            scale: [0.8, 1.1, 0.8],
            backgroundColor: [
              "rgba(17, 146, 47, 0.8)",
              "rgba(0, 117, 60, 0.8)",
              "rgba(17, 146, 47, 0.8)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Orbiting leaves */}
        {[...Array(6)].map((_, i) => {
          const delay = i * 0.15;
          const angle = (i / 6) * Math.PI * 2;
          const radius = 40;

          return (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 h-8 w-8"
              initial={{
                x: Math.cos(angle) * radius - 16,
                y: Math.sin(angle) * radius - 16,
                rotate: 0,
                opacity: 0,
              }}
              animate={{
                x: Math.cos(angle + Math.PI * 2) * radius - 16,
                y: Math.sin(angle + Math.PI * 2) * radius - 16,
                rotate: 360,
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3,
                delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5Z"
                  fill="#cafff7"
                  fillOpacity="0.3"
                />
                <path
                  d="M12 6.5C9.5 6.5 6.5 8 6.5 12C6.5 16 9.5 17.5 12 17.5C14.5 17.5 17.5 16 17.5 12C17.5 8 14.5 6.5 12 6.5Z"
                  fill="#11922f"
                />
                <path
                  d="M12 2.5C11.5 4.5 11.5 6.5 12 8.5C12.5 6.5 12.5 4.5 12 2.5Z"
                  fill="#11922f"
                />
                <path
                  d="M12 21.5C12.5 19.5 12.5 17.5 12 15.5C11.5 17.5 11.5 19.5 12 21.5Z"
                  fill="#11922f"
                />
                <path
                  d="M2.5 12C4.5 12.5 6.5 12.5 8.5 12C6.5 11.5 4.5 11.5 2.5 12Z"
                  fill="#11922f"
                />
                <path
                  d="M21.5 12C19.5 11.5 17.5 11.5 15.5 12C17.5 12.5 19.5 12.5 21.5 12Z"
                  fill="#11922f"
                />
              </svg>
            </motion.div>
          );
        })}

        {/* Outer ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 h-32 w-32 rounded-full border-4 border-[#cafff7]/30"
          style={{ x: "-50%", y: "-50%" }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
            borderColor: [
              "rgba(202, 255, 247, 0.3)",
              "rgba(17, 146, 47, 0.3)",
              "rgba(202, 255, 247, 0.3)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Pulsing dots around the circle */}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 60;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const delay = i * 0.1;

          return (
            <motion.div
              key={`dot-${i}`}
              className="absolute top-1/2 left-1/2 h-3 w-3 rounded-full bg-[#00753c]"
              style={{
                x: x - 6,
                y: y - 6,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedLoader;
