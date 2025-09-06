"use client";
import { motion } from "framer-motion";

const LeafSpinnerLoader = () => {
  return (
    <div className="flex h-60 w-60 items-center justify-center">
      <div className="relative">
        {/* Center circle */}
        <motion.div
          className="absolute top-1/2 left-1/2 h-16 w-16 rounded-full bg-[#cafff7]/30"
          style={{ x: "-50%", y: "-50%" }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Inner spinning leaves */}
        <motion.div
          className="absolute top-1/2 left-1/2 h-40 w-40"
          style={{ x: "-50%", y: "-50%" }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {[...Array(6)].map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const x = Math.cos(angle) * 40;
            const y = Math.sin(angle) * 40;
            const rotation = (angle * 180) / Math.PI;

            return (
              <motion.div
                key={`leaf-inner-${i}`}
                className="absolute h-10 w-10"
                style={{
                  top: "calc(50% - 20px)",
                  left: "calc(50% - 20px)",
                  x,
                  y,
                  rotate: rotation,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  filter: [
                    "drop-shadow(0 0 0px rgba(17, 146, 47, 0.3))",
                    "drop-shadow(0 0 5px rgba(17, 146, 47, 0.6))",
                    "drop-shadow(0 0 0px rgba(17, 146, 47, 0.3))",
                  ],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C7.5 2 4 5.5 4 10C4 14.5 7.5 18 12 18C16.5 18 20 14.5 20 10C20 5.5 16.5 2 12 2ZM12 15C9.24 15 7 12.76 7 10C7 7.24 9.24 5 12 5C14.76 5 17 7.24 17 10C17 12.76 14.76 15 12 15Z"
                    fill="#11922f"
                  />
                  <path
                    d="M12 22C13.1 22 14 21.1 14 20V18H10V20C10 21.1 10.9 22 12 22Z"
                    fill="#11922f"
                  />
                </svg>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Outer spinning leaves */}
        <motion.div
          className="absolute top-1/2 left-1/2 h-60 w-60"
          style={{ x: "-50%", y: "-50%" }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const x = Math.cos(angle) * 60;
            const y = Math.sin(angle) * 60;
            const rotation = (angle * 180) / Math.PI + 180;

            return (
              <motion.div
                key={`leaf-outer-${i}`}
                className="absolute h-12 w-12"
                style={{
                  top: "calc(50% - 24px)",
                  left: "calc(50% - 24px)",
                  x,
                  y,
                  rotate: rotation,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  filter: [
                    "drop-shadow(0 0 0px rgba(0, 117, 60, 0.3))",
                    "drop-shadow(0 0 5px rgba(0, 117, 60, 0.6))",
                    "drop-shadow(0 0 0px rgba(0, 117, 60, 0.3))",
                  ],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7 8 17 8 17 8Z"
                    fill="#00753c"
                  />
                </svg>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Pulsing dots */}
        {[...Array(20)].map((_, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const radius = 30 + Math.random() * 40;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const size = 2 + Math.random() * 3;
          const delay = i * 0.1;

          return (
            <motion.div
              key={`dot-${i}`}
              className="absolute top-1/2 left-1/2 rounded-full bg-[#cafff7]"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                x: x - size / 2,
                y: y - size / 2,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random(),
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

export default LeafSpinnerLoader;
