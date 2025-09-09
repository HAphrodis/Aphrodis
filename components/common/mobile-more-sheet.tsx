"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import MusicPlayer from "./music-player";
import { ScrollArea } from "../ui/scroll-area";
import { quickActions } from "@/constants/cmdbar";
import { navigationPages } from "@/constants/navItem";

interface MobileMoreSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onContactOpen?: () => void;
}

// Define AllItem type as a union of all possible item shapes
type AllItem =
  | (typeof navigationPages)[number]
  | (typeof quickActions)[number];

export function MobileMoreSheet({
  isOpen,
  onClose,
  onContactOpen,
}: MobileMoreSheetProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);

  // Combine all items (removed socialLinks)
  const allItems = [...navigationPages, ...quickActions];

  // Filter items based on search query
  const filteredItems = allItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Group items by category
  const groupedItems = filteredItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, typeof allItems>,
  );

  const containerVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const handleItemClick = (item: AllItem) => {
    if ("action" in item && item.action === "music") {
      setShowMusicPlayer(!showMusicPlayer);
    } else if ("action" in item && item.action === "contact") {
      onContactOpen?.();
      onClose();
    } else if ("href" in item && item.href) {
      if ("external" in item && item.external) {
        window.open(item.href, "_blank");
      } else {
        router.push(item.href);
        onClose();
      }
    }
  };

  const isItemActive = (item: AllItem) => {
    if ("href" in item && item.href) {
      return pathname === item.href;
    }
    if ("action" in item && item.action === "music") {
      return showMusicPlayer;
    }
    return false;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 bottom-0 w-80 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-xl border-l border-emerald-300/20 shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <motion.div
              variants={itemVariants}
              className="sticky top-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-xl border-b border-purple-100/60 p-3 z-10"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm text-purple-100/90">
                    View all available pages
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-purple-300/20 transition-colors text-purple-100 hover:text-emerald-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-purple-100/60" />
                <Input
                  placeholder="Search... "
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-purple-100/10 border-purple-100/30 text-emerald-100 placeholder:text-purple-100/50 placeholder:text-sm focus-visible:ring-purple-100/60 focus-visible:border-purple-100/70"
                />
              </div>
            </motion.div>

            <ScrollArea className="flex-1 h-[80dvh]">
              {/* Content with custom scrollbar */}
              <div
                className="flex-1 overflow-y-auto p-6 mb-6 space-y-6"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#10b981 transparent",
                }}
              >
                <style jsx>{`
                  div::-webkit-scrollbar {
                    width: 6px;
                  }
                  div::-webkit-scrollbar-track {
                    background: transparent;
                  }
                  div::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #10b981, #059669);
                    border-radius: 3px;
                  }
                  div::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #059669, #047857);
                  }
                `}</style>

                {/* Music Player (if shown) */}
                <AnimatePresence>
                  {showMusicPlayer && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-emerald-300 mb-3 px-2">
                          Music Player
                        </h3>
                        <MusicPlayer variant="compact" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Items by category */}
                {Object.entries(groupedItems).map(([category, items]) => (
                  <motion.div
                    key={category}
                    variants={itemVariants}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-md font-medium text-purple-100 px-2">
                        {category}
                      </h3>
                      <span className="text-xs text-purple-100 bg-purple-100/10 border-purple-100/30 px-2 py-1 rounded-full">
                        {items.length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {items.map((item) => {
                        const isActive = isItemActive(item);
                        const Icon = item.icon;

                        return (
                          <motion.div key={item.title} variants={itemVariants}>
                            <div
                              onClick={() => handleItemClick(item)}
                              className={cn(
                                "flex items-center gap-3 p-3 rounded-xl transition-all duration-300 border relative overflow-hidden group cursor-pointer",
                                "hover:bg-purple-100/10 hover:border-purple-100/70",
                                isActive
                                  ? "bg-purple-100/20 border-purple-100/70 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                                  : "border-transparent hover:border-purple-100/80",
                              )}
                            >
                              {/* Active indicator */}
                              {isActive && (
                                <motion.div
                                  layoutId="mobileMoreSheetActive"
                                  className="absolute inset-0 border-purple-100 rounded-xl"
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30,
                                  }}
                                />
                              )}

                              {/* Hover glow effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-100/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                              <div className="flex-shrink-0 relative z-10">
                                <div
                                  className={cn(
                                    "p-2 rounded-lg transition-colors duration-300",
                                    isActive
                                      ? "border-purple-100/80 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                                      : "border-purple-100/70 group-hover:bg-emerald-500/20",
                                  )}
                                >
                                  <Icon
                                    className={cn(
                                      "h-4 w-4 transition-colors duration-300",
                                      isActive
                                        ? "text-emerald-200"
                                        : "text-emerald-300 group-hover:text-emerald-100",
                                    )}
                                  />
                                </div>
                              </div>

                              <div className="relative z-10 min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <h3
                                    className={cn(
                                      "text-sm font-medium transition-colors duration-300 truncate",
                                      isActive
                                        ? "text-emerald-50"
                                        : "text-emerald-100 group-hover:text-emerald-50",
                                    )}
                                  >
                                    {item.title}
                                  </h3>
                                  {"external" in item && item.external && (
                                    <ExternalLink className="h-3 w-3 text-purple-100/70 flex-shrink-0" />
                                  )}
                                </div>
                              </div>

                              {/* Arrow indicator for navigation items */}
                              {"href" in item && item.href && (
                                <div
                                  className={cn(
                                    "flex-shrink-0 relative z-10 transition-all duration-300",
                                    isActive
                                      ? "opacity-100 translate-x-0"
                                      : "opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0",
                                  )}
                                >
                                  <ExternalLink className="h-3 w-3 text-emerald-300" />
                                </div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}

                {filteredItems.length === 0 && (
                  <motion.div
                    variants={itemVariants}
                    className="text-center py-8"
                  >
                    <div className="text-purple-100/70">No results found</div>
                    <div className="text-purple-100 text-sm mt-1">
                      Try a different search term
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
