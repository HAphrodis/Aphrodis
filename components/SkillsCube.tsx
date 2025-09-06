"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const skills = [
  "React",
  "Node.js",
  "TypeScript",
  "Next.js",
  "MongoDB",
  "GraphQL",
  "Tailwind CSS",
  "Express",
  "Redux",
  "Docker",
  "AWS",
  "Git",
];

export default function SkillsCube() {
  const [rotating, setRotating] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    if (rotating) {
      controls.start({
        rotateY: 360,
        transition: {
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        },
      });
    } else {
      controls.stop();
    }
  }, [rotating, controls]);

  return (
    <div className="perspective-1000 w-64 h-64 mx-auto">
      <motion.div
        className="w-full h-full relative transform-style-3d"
        animate={controls}
        onHoverStart={() => setRotating(false)}
        onHoverEnd={() => setRotating(true)}
      >
        {skills.map((skill, index) => (
          <div
            key={skill}
            className="absolute w-full h-full bg-emerald-950/50 flex items-center justify-center p-4 rounded-lg shadow-lg border border-emerald-500/20"
            style={{
              transform: `rotateY(${index * 30}deg) translateZ(150px)`,
            }}
          >
            <span className="text-emerald-400 font-bold text-lg">{skill}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
