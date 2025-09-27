
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Code,
  Paintbrush,
  Cpu,
  HeadphonesIcon,
  SearchIcon,
  Globe,
  Server,
  Smartphone,
  Cloud,
  LucideIcon,
} from "lucide-react";

// Icons list
const icons = [
  Monitor,
  Code,
  Paintbrush,
  Cpu,
  HeadphonesIcon,
  SearchIcon,
  Globe,
  Server,
  Smartphone,
  Cloud,
];

interface IconData {
  Icon: LucideIcon;
  x: number;
  y: number;
  size: number;
  duration: number;
}

export function ServicesIconsBackground() {
  const [iconsData, setIconsData] = useState<IconData[]>([]);
  const [pageHeight, setPageHeight] = useState<number>(0);

  useEffect(() => {
    const generateData = () =>
      icons.map((Icon) => ({
        Icon,
        x: Math.random() * window.innerWidth,
        y: Math.random() * pageHeight,
        size: 40 + Math.random() * 50,
        duration: 20 + Math.random() * 15,
      }));

    setIconsData(generateData());

    const handleResize = () => {
      setPageHeight(document.body.scrollHeight);
      setIconsData(generateData());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pageHeight]);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      style={{ height: pageHeight }}
    >
      {iconsData.map(({ Icon, x, y, size, duration }, i) => (
        <motion.div
          key={i}
          className="absolute text-purple-100"
          initial={{ x, y, opacity: 0.2, scale: 0.7 }}
          animate={{
            x: [x, Math.random() * window.innerWidth, x],
            y: [y, Math.random() * pageHeight, y],
            opacity: [0.2, 0.6, 0.2],
            scale: [0.7, 1.2, 0.7],
          }}
          transition={{
            duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{ fontSize: size }}
        >
          <Icon strokeWidth={1.3} />
        </motion.div>
      ))}
    </div>
  );
}
