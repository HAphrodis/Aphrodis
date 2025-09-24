"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ExternalLink,
  Book,
  Users,
  ListTodo,
  CodeXml,
  Bookmark,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export function MoreDropdown() {
  const pathname = usePathname();

  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants:Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid lg:grid-cols-2 gap-1 p-6 lg:w-[32rem] bg-emerald-950/95 backdrop-blur-xl rounded-xl border border-emerald-300/20 shadow-2xl"
    >
      <motion.div variants={itemVariants} className="col-span-2 mb-2">
        <h2 className="text-xl font-bold text-emerald-100 mb-1">More</h2>
        <p className="text-sm text-emerald-300/70">
          Explore additional resources and tools
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <MoreItem
          title="My Links"
          description="Connect with me on social media"
          icon={ExternalLink}
          href="/links"
          isActive={pathname === "/links"}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <MoreItem
          title="Attributions"
          description="Credits and acknowledgments"
          icon={Book}
          href="/attributions"
          isActive={pathname === "/attributions"}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <MoreItem
          title="Guestbook"
          description="Leave a message or view others'"
          icon={Users}
          href="/guestbook"
          isActive={pathname === "/guestbook"}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <MoreItem
          title="Checklist"
          description="Things to do in 2025"
          icon={ListTodo}
          href="/checklist"
          isActive={pathname === "/checklist"}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <MoreItem
          title="Lab"
          description="Code snippets, features and tools"
          icon={CodeXml}
          href="/lab"
          isActive={pathname === "/lab"}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <MoreItem
          title="Bookmarks"
          description="Often used web and services"
          icon={Bookmark}
          href="/bookmarks"
          isActive={pathname === "/bookmarks"}
        />
      </motion.div>
    </motion.div>
  );
}

interface MoreItemProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  isActive?: boolean;
}

function MoreItem({
  title,
  description,
  icon: Icon,
  href,
  isActive = false,
}: MoreItemProps) {
  return (
    <Link href={href} className="group block cursor-pointer">
      <motion.div
        className={cn(
          "flex items-start space-x-3 p-4 rounded-lg transition-all duration-300 border relative overflow-hidden",
          "hover:bg-emerald-800/30 hover:border-emerald-500/30",
          isActive
            ? "bg-emerald-800/40 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            : "border-transparent hover:border-emerald-500/20",
        )}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Active indicator */}
        {isActive && (
          <motion.div
            layoutId="moreDropdownActive"
            className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-emerald-400/10 rounded-lg"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}

        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-emerald-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="flex-shrink-0 relative z-10">
          <div
            className={cn(
              "p-2 rounded-lg transition-colors duration-300",
              isActive
                ? "bg-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                : "bg-emerald-500/10 group-hover:bg-emerald-500/20",
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5 transition-colors duration-300",
                isActive
                  ? "text-emerald-200"
                  : "text-emerald-300 group-hover:text-emerald-100",
              )}
            />
          </div>
        </div>

        <div className="relative z-10 min-w-0 flex-1">
          <h3
            className={cn(
              "text-base font-semibold transition-colors duration-300 mb-1",
              isActive
                ? "text-emerald-50"
                : "text-emerald-100 group-hover:text-emerald-50",
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              "text-sm transition-colors duration-300 leading-relaxed",
              isActive
                ? "text-emerald-100/90"
                : "text-emerald-200/80 group-hover:text-emerald-100/90",
            )}
          >
            {description}
          </p>
        </div>

        {/* Arrow indicator */}
        <div
          className={cn(
            "flex-shrink-0 relative z-10 transition-all duration-300",
            isActive
              ? "opacity-100 translate-x-0"
              : "opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0",
          )}
        >
          <ExternalLink className="h-4 w-4 text-emerald-300" />
        </div>

        {/* Active dot indicator */}
        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 h-2 w-2 bg-emerald-400 rounded-full shadow-[0_0_6px_rgba(16,185,129,0.6)]"
          />
        )}
      </motion.div>
    </Link>
  );
}
