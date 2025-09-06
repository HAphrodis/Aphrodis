"use client";

import { motion } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/constants/my-services";

interface ServiceCardProps {
  service: Service;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
  onClick: () => void;
}

export function ServiceCard({
  service,
  index,
  isHovered,
  onHover,
  onClick,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    >
      <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <motion.div
        className="relative overflow-hidden rounded-2xl border border-purple-200/10 backdrop-blur-sm p-6 cursor-pointer transition-all duration-300 group-hover:border-purple-200/30]"
        animate={{
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div
            className="bg-purple-500/10 rounded-full p-2 text-purple-200"
            animate={{
              rotate: isHovered ? 45 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight className="h-5 w-5" />
          </motion.div>
        </div>

        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            y: isHovered ? -5 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="text-purple-200 mb-6"
        >
          <service.icon className="h-12 w-12" />
        </motion.div>

        <motion.h3
          animate={{
            color: isHovered ? "#D8B4FE" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
          className="text-xl font-bold mb-3"
        >
          {service.title}
        </motion.h3>

        <p className="text-white/70 mb-4">{service.description}</p>

        <motion.div
          className="flex flex-wrap gap-2 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {service.tags?.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="text-xs text-purple-300 px-2 py-1 rounded-md border border-purple-200/90"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <BorderBeam
          duration={10}
          size={200}
          reverse
          className="from-transparent via-emerald-500/40 to-transparent"
        />
      </motion.div>
    </motion.div>
  );
}
