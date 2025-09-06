"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SidebarNavProps {
  activeSection: string;
}

export function SidebarNav({ activeSection }: SidebarNavProps) {
  const [mounted, setMounted] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { id: "introduction", label: "Introduction", icon: "👋" },
    { id: "work", label: "Work Experience", icon: "💼" },
    { id: "studies", label: "Education", icon: "🎓" },
    { id: "skills", label: "Technical Skills", icon: "🛠️" },
  ];

  return (
    <div className="hidden lg:block">
      <motion.nav
        className="fixed w-[240px] space-y-1 bg-emerald-950/20 backdrop-blur-sm p-4 rounded-xl border border-emerald-500/10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          const isHovered = hoveredItem === item.id;

          return (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "group flex items-center transition-all relative py-3 px-2 rounded-lg",
                isActive
                  ? "text-emerald-400 bg-emerald-950/50"
                  : "text-white/60 hover:text-white hover:bg-emerald-950/30",
              )}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.span
                className="mr-3 opacity-70"
                animate={{
                  scale: isHovered || isActive ? 1.2 : 1,
                  opacity: isHovered || isActive ? 1 : 0.7,
                }}
              >
                {item.icon}
              </motion.span>

              <span className="relative">
                {item.label}
                {mounted && isActive && (
                  <motion.span
                    layoutId="active-nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-emerald-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </span>

              {isActive && (
                <motion.span
                  className="ml-auto text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  ●
                </motion.span>
              )}
            </motion.a>
          );
        })}
      </motion.nav>
    </div>
  );
}
