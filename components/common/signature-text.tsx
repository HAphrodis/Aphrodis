/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface SignatureTextProps {
  text: string;
  className?: string;
  color?: string;
  strokeWidth?: number;
  duration?: number;
  delay?: number;
}

export default function SignatureText({
  text,
  className = "",
  color = "#10b981", // emerald-400
  strokeWidth = 1.5,
  duration = 3.5,
  delay = 0.5,
}: SignatureTextProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [paths, setPaths] = useState<string[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Generate signature-like paths for each letter
  useEffect(() => {
    // Define signature-style paths for each letter
    const signaturePaths: Record<string, (x: number, y: number) => string> = {
      I: (x, y) =>
        `M${x},${y + 5} C${x + 2},${y - 15} ${x + 5},${y + 40} ${x + 2},${y + 30}`,
      s: (x, y) =>
        `M${x},${y + 15} C${x + 5},${y + 5} ${x + 10},${y + 10} ${x + 15},${y + 15} C${x + 20},${y + 20} ${x + 10},${y + 25} ${x + 5},${y + 20}`,
      h: (x, y) =>
        `M${x},${y - 10} C${x + 2},${y + 10} ${x + 3},${y + 20} ${x + 2},${y + 25} C${x + 10},${y + 15} ${x + 15},${y + 15} ${x + 18},${y + 20}`,
      i: (x, y) =>
        `M${x},${y + 5} C${x + 1},${y + 10} ${x + 2},${y + 15} ${x + 2},${y + 20} M${x},${y - 5} L${x + 1},${y - 4}`,
      m: (x, y) =>
        `M${x},${y + 15} C${x + 2},${y + 10} ${x + 5},${y + 20} ${x + 8},${y + 15} C${x + 12},${y + 10} ${x + 15},${y + 20} ${x + 18},${y + 15}`,
      w: (x, y) =>
        `M${x},${y + 10} C${x + 5},${y + 20} ${x + 10},${y + 10} ${x + 15},${y + 20} C${x + 20},${y + 10} ${x + 25},${y + 20} ${x + 30},${y + 10}`,
      e: (x, y) =>
        `M${x},${y + 15} C${x + 10},${y + 10} ${x + 15},${y + 15} ${x + 10},${y + 20} C${x + 5},${y + 25} ${x - 5},${y + 20} ${x + 10},${y + 15}`,
      J: (x, y) =>
        `M${x},${y - 5} C${x + 5},${y} ${x + 10},${y + 20} ${x + 5},${y + 30} C${x},${y + 35} ${x - 5},${y + 30} ${x},${y + 25}`,
      a: (x, y) =>
        `M${x + 10},${y + 10} C${x + 5},${y + 15} ${x},${y + 20} ${x + 5},${y + 15} C${x + 10},${y + 10} ${x + 15},${y + 15} ${x + 15},${y + 20}`,
      n: (x, y) =>
        `M${x},${y + 15} C${x + 2},${y + 10} ${x + 5},${y + 20} ${x + 8},${y + 15} C${x + 10},${y + 10} ${x + 12},${y + 15} ${x + 15},${y + 20}`,
      B: (x, y) =>
        `M${x},${y - 10} C${x + 2},${y + 10} ${x + 3},${y + 20} ${x + 2},${y + 30} M${x},${y} C${x + 10},${y - 5} ${x + 15},${y} ${x + 10},${y + 10} M${x},${y + 15} C${x + 15},${y + 10} ${x + 20},${y + 20} ${x + 10},${y + 25}`,
      p: (x, y) =>
        `M${x},${y + 15} C${x + 2},${y + 25} ${x + 3},${y + 35} ${x + 2},${y + 45} M${x},${y + 15} C${x + 10},${y + 10} ${x + 15},${y + 15} ${x + 10},${y + 25} C${x + 5},${y + 30} ${x},${y + 25} ${x},${y + 20}`,
      t: (x, y) =>
        `M${x + 5},${y - 5} C${x + 7},${y + 5} ${x + 8},${y + 15} ${x + 10},${y + 25} M${x},${y + 5} C${x + 5},${y + 5} ${x + 10},${y + 5} ${x + 15},${y + 5}`,
      " ": (x, y) => "",
    };

    // Default path for characters not defined above
    const defaultPath = (x: number, y: number, char: string) =>
      `M${x},${y + 15} L${x + 10},${y + 15}`;

    // Generate paths for the text
    const newPaths: string[] = [];
    let totalWidth = 0;
    const maxHeight = 60;
    const spacing = 15; // Space between letters

    // Split the text into first name, middle name, and last name
    const nameParts = text.split(" ");

    nameParts.forEach((part, partIndex) => {
      // Add space between name parts
      if (partIndex > 0) {
        totalWidth += 25; // Extra space between name parts
      }

      // Process each letter in the name part
      part.split("").forEach((char, i) => {
        const x = totalWidth;
        const y = 20;

        // Get the path for this character or use default
        const getPath =
          signaturePaths[char] || ((x, y) => defaultPath(x, y, char));
        const path = getPath(x, y);

        newPaths.push(path);

        // Estimate width for next character
        totalWidth += char === " " ? 15 : 20;
      });
    });

    setPaths(newPaths);
    setDimensions({ width: totalWidth + 20, height: maxHeight });
  }, [text]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
      className={`relative ${className}`}
    >
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="overflow-visible"
      >
        {/* Signature flourish underline */}
        <motion.path
          d={`M10,${dimensions.height - 10} C${dimensions.width * 0.3},${dimensions.height - 5} ${dimensions.width * 0.7},${dimensions.height - 15} ${dimensions.width - 20},${dimensions.height - 8}`}
          stroke={color}
          strokeWidth={strokeWidth * 0.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            delay: delay + duration * 0.8,
            duration: duration * 0.4,
            ease: "easeInOut",
          }}
          style={{
            filter: "drop-shadow(0 0 2px rgba(16, 185, 129, 0.4))",
          }}
        />

        {/* Signature paths */}
        {paths.map((path, i) => (
          <motion.path
            key={`signature-${i}`}
            d={path}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              delay: delay + (i * duration) / (paths.length * 1.5),
              duration: (duration / paths.length) * 2,
              ease: "easeInOut",
            }}
            style={{
              filter: "drop-shadow(0 0 3px rgba(16, 185, 129, 0.5))",
            }}
          />
        ))}

        {/* Ink dots and splashes for handwritten effect */}
        {[...Array(5)].map((_, i) => {
          const x = Math.random() * dimensions.width;
          const y = Math.random() * dimensions.height;
          const size = Math.random() * 2 + 1;
          return (
            <motion.circle
              key={`ink-dot-${i}`}
              cx={x}
              cy={y}
              r={size}
              fill={color}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.7, scale: 1 }}
              transition={{
                delay: delay + duration * 0.7 + i * 0.1,
                duration: 0.3,
                ease: "easeOut",
              }}
              style={{
                filter: "drop-shadow(0 0 1px rgba(16, 185, 129, 0.3))",
              }}
            />
          );
        })}
      </svg>
    </motion.div>
  );
}
