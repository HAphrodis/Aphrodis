"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const MouseLight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 200, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isActive) setIsActive(true);
    };

    const handleMouseLeave = () => {
      setIsActive(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isActive]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
        animate={{
          background: isActive
            ? `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.03), transparent 80%)`
            : "none",
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-10 opacity-50"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.1 }}
      >
        <motion.div
          className="w-2 h-2 hidden md:block bg-purple-100  rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>
    </>
  );
};
