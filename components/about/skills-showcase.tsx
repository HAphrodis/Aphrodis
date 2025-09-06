"use client";

// import { useState } from "react"
import { motion } from "framer-motion";
import type { SkillCategory } from "@/constants/profile-data";

interface SkillsShowcaseProps {
  categories: SkillCategory[];
}

export function SkillsShowcase({ categories }: SkillsShowcaseProps) {
  // const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="group relative overflow-hidden rounded-2xl border border-emerald-500/10 bg-emerald-950/30 backdrop-blur-sm p-6 transition-all hover:bg-emerald-950/50 hover:border-emerald-500/30 hover:shadow-[0_0_25px_rgba(16,185,129,0.1)]"
        >
          <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 blur group-hover:opacity-100 group-hover:animate-tilt transition duration-700"></div>

          <div className="relative">
            <h3 className="text-xl font-semibold text-emerald-400 mb-4">
              {category.title}
            </h3>

            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => {
                // const isHovered = hoveredSkill === `${index}-${skillIndex}`

                return (
                  <div
                    key={skillIndex}
                    className="relative"
                    // onMouseEnter={() => setHoveredSkill(`${index}-${skillIndex}`)}
                    // onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex justify-between items-center ">
                      <span className="text-white/90 font-medium">{skill}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
