"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import type { DialogProps } from "@radix-ui/react-dialog";
import {
  Search,
  X,
  ArrowUp,
  ArrowDown,
  CornerDownLeft,
  ExternalLink,
  Command,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useHotkeys } from "react-hotkeys-hook";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavItems } from "@/constants/navItem";
import { quickActions } from "@/constants/cmdbar";
import { cmdBarLinks } from "@/constants/links";
import MusicPlayer from "../common/music-player";

interface CommandMenuProps extends DialogProps {
  onContactOpen?: () => void;
}

export function CommandMenu({ onContactOpen, ...props }: CommandMenuProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [modKey, setModKey] = React.useState("⌘");
  const [showMusicPlayer, setShowMusicPlayer] = React.useState(false);

  // Get nav items using the hook at the top level
  const navItems = useNavItems();

  // Navigation items from useNavItems (already includes isCurrent)
  const navigationItems = React.useMemo(() => navItems, [navItems]);

  // Enhanced quick actions with music player
  const enhancedQuickActions = React.useMemo(() => [...quickActions], []);

  // Combine all items for navigation
  const allItems = React.useMemo(
    () => [...navigationItems, ...enhancedQuickActions, ...cmdBarLinks],
    [navigationItems, enhancedQuickActions],
  );

  // Filter items based on search
  const filteredItems = React.useMemo(() => {
    if (!search) return allItems;
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        (item.description &&
          item.description.toLowerCase().includes(search.toLowerCase())),
    );
  }, [search, allItems]);

  // Group filtered items
  const groupedItems = React.useMemo(() => {
    const groups: Record<string, typeof filteredItems> = {};
    filteredItems.forEach((item) => {
      if (!groups[item.group]) {
        groups[item.group] = [];
      }
      groups[item.group].push(item);
    });
    return groups;
  }, [filteredItems]);

  React.useEffect(() => {
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    setModKey(isMac ? "⌘" : "Ctrl");
  }, []);

  // Reset selected index when search changes
  React.useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Keyboard shortcuts
  useHotkeys(
    "mod+k",
    (e) => {
      e.preventDefault();
      setOpen((prev) => !prev);
    },
    { enableOnFormTags: true },
  );

  useHotkeys(
    "escape",
    () => {
      if (open) {
        setOpen(false);
        setSearch("");
        setShowMusicPlayer(false);
      }
    },
    { enableOnFormTags: true, enabled: open },
  );

  useHotkeys(
    "arrowup",
    (e) => {
      if (open) {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(0, prev - 1));
      }
    },
    { enableOnFormTags: true, enabled: open },
  );

  useHotkeys(
    "arrowdown",
    (e) => {
      if (open) {
        e.preventDefault();
        setSelectedIndex((prev) =>
          Math.min(filteredItems.length - 1, prev + 1),
        );
      }
    },
    { enableOnFormTags: true, enabled: open },
  );

  useHotkeys(
    "enter",
    (e) => {
      if (open && filteredItems[selectedIndex]) {
        e.preventDefault();
        handleItemSelect(filteredItems[selectedIndex]);
      }
    },
    { enableOnFormTags: true, enabled: open },
  );

  const handleItemSelect = (item: (typeof allItems)[0]) => {
    if ("action" in item && item.action === "contact") {
      onContactOpen?.();
      setOpen(false);
      setSearch("");
    } else if ("action" in item && item.action === "music") {
      setShowMusicPlayer(!showMusicPlayer);
    } else if (item.url) {
      if ("external" in item && item.external) {
        window.open(item.url, "_blank");
      } else {
        router.push(item.url);
        setOpen(false);
        setSearch("");
      }
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed z-50 right-4 top-4"
      >
        <Button
          onClick={() => setOpen(true)}
          className={cn(
            "relative p-2 h-auto",
            "rounded-lg overflow-hidden",
            "bg-gradient-to-b from-emerald-50 to-emerald-100",
            "dark:from-emerald-800/20 dark:to-emerald-900/20",
            "border border-emerald-200/50 dark:border-emerald-800/50",
            "hover:border-emerald-300 dark:hover:border-emerald-700",
            "backdrop-blur-sm",
            "transition-all duration-300 ease-out",
            "group",
            "inline-flex items-center justify-center gap-2",
            "text-xs font-medium text-emerald-800 dark:text-emerald-200",
            "shadow-lg hover:shadow-xl",
          )}
        >
          <Command className="h-3 w-3" />
          <span className="hidden sm:inline">{modKey} K</span>
          <span
            className={cn(
              "absolute inset-0",
              "bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0",
              "translate-x-[-100%]",
              "group-hover:translate-x-[100%]",
              "transition-transform duration-500",
              "ease-out",
            )}
          />
        </Button>
      </motion.div>

      {/* Command Dialog */}
      <AnimatePresence>
        {open && (
          <Dialog open={open} onOpenChange={setOpen} {...props}>
            <DialogContent className="overflow-hidden p-0 shadow-2xl border-0 bg-[#0a1a18] max-w-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-[#0a1a18] rounded-lg"
              >
                {/* Header */}
                <div className="flex items-center gap-3 p-4 border-b border-emerald-900/50">
                  <Search className="h-4 w-4 text-emerald-400/70" />
                  <input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 bg-transparent text-white placeholder:text-emerald-500/60 outline-none text-sm"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setOpen(false);
                      setShowMusicPlayer(false);
                    }}
                    className="h-6 w-6 z-50 p-0 text-emerald-400/70 hover:text-emerald-400"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Music Player (if shown) */}
                <AnimatePresence>
                  {showMusicPlayer && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-b border-emerald-900/50 p-4"
                    >
                      <MusicPlayer variant="compact" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Content */}
                <div
                  className="max-h-96 overflow-y-auto"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#10b981 #002922",
                  }}
                >
                  {Object.entries(groupedItems).map(([groupName, items]) => (
                    <div key={groupName} className="p-2">
                      <div className="px-2 py-1.5 text-xs font-medium text-emerald-400/80 uppercase tracking-wider">
                        {groupName}
                      </div>
                      <div className="space-y-1">
                        {items.map((item, index) => {
                          const globalIndex = filteredItems.indexOf(item);
                          const isSelected = globalIndex === selectedIndex;
                          const Icon = item.icon;
                          const isMusicPlayerActive =
                            "action" in item &&
                            item.action === "music" &&
                            showMusicPlayer;

                          return (
                            <motion.div
                              key={`${item.title}-${index}`}
                              className={cn(
                                "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-150 relative overflow-hidden",
                                "hover:bg-emerald-900/30",
                                isSelected &&
                                  "bg-emerald-900/50 ring-1 ring-emerald-500/50",
                                ("isCurrent" in item && item.isCurrent) ||
                                  (isMusicPlayerActive &&
                                    "bg-emerald-900/40 ring-1 ring-emerald-500/40"),
                              )}
                              onClick={() => handleItemSelect(item)}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              {/* Active page indicator */}
                              {(("isCurrent" in item && item.isCurrent) ||
                                isMusicPlayerActive) && (
                                <motion.div
                                  layoutId="commandMenuActive"
                                  className="absolute inset-0 bg-emerald-500/10 rounded-lg"
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30,
                                  }}
                                />
                              )}

                              <div
                                className={cn(
                                  "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center relative z-10",
                                  ("isCurrent" in item && item.isCurrent) ||
                                    isMusicPlayerActive
                                    ? "bg-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                                    : "bg-emerald-900/70",
                                )}
                              >
                                <Icon
                                  className={cn(
                                    "h-4 w-4",
                                    ("isCurrent" in item && item.isCurrent) ||
                                      isMusicPlayerActive
                                      ? "text-emerald-200"
                                      : "text-emerald-400",
                                  )}
                                />
                              </div>

                              <div className="flex-1 min-w-0 relative z-10">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={cn(
                                      "font-medium text-sm truncate",
                                      ("isCurrent" in item && item.isCurrent) ||
                                        isMusicPlayerActive
                                        ? "text-emerald-50"
                                        : "text-white",
                                    )}
                                  >
                                    {item.title}
                                  </span>
                                  {"isCurrent" in item && item.isCurrent && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs bg-emerald-500/30 text-emerald-300 border-emerald-500/40"
                                    >
                                      Current
                                    </Badge>
                                  )}
                                  {isMusicPlayerActive && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs bg-emerald-500/30 text-emerald-300 border-emerald-500/40"
                                    >
                                      Active
                                    </Badge>
                                  )}
                                  {"external" in item && item.external && (
                                    <ExternalLink className="h-3 w-3 text-emerald-400/70" />
                                  )}
                                </div>
                                <p
                                  className={cn(
                                    "text-xs truncate",
                                    ("isCurrent" in item && item.isCurrent) ||
                                      isMusicPlayerActive
                                      ? "text-emerald-200/80"
                                      : "text-emerald-300/60",
                                  )}
                                >
                                  {item.description}
                                </p>
                              </div>

                              {/* Active dot indicator */}
                              {(("isCurrent" in item && item.isCurrent) ||
                                isMusicPlayerActive) && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute top-2 right-2 h-2 w-2 bg-emerald-400 rounded-full shadow-[0_0_6px_rgba(16,185,129,0.6)] z-10"
                                />
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {filteredItems.length === 0 && (
                    <div className="p-8 text-center">
                      <div className="text-emerald-400/70 text-sm">
                        No results found
                      </div>
                      <div className="text-emerald-500/50 text-xs mt-1">
                        Try searching for something else
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-3 border-t border-emerald-900/50 bg-emerald-950/50">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-xs text-emerald-400/70">
                      <span className="inline-flex items-center justify-center h-5 w-8 border border-emerald-400/40 rounded bg-emerald-900/30 font-mono text-xs mr-1">
                        <ArrowUp className="h-3 w-3" />
                        <ArrowDown className="h-3 w-3" />
                      </span>
                      <span>navigate</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-emerald-400/70">
                      <span className="inline-flex items-center justify-center h-5 w-8 border border-emerald-400/40 rounded bg-emerald-900/30 font-mono text-xs mr-1">
                        <CornerDownLeft className="h-3 w-3" />
                      </span>

                      <span>select</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-emerald-400/70">
                      <span className="inline-flex items-center justify-center h-5 w-8 border border-emerald-400/40 rounded bg-emerald-900/30 font-mono text-xs mr-1">
                        Esc
                      </span>
                      <span>close</span>
                    </div>
                  </div>
{/* 
                  <div className="flex items-center gap-2">
                    {cmdBarLinks.slice(0, 4).map((social) => {
                      const Icon = social.icon;
                      return (
                        <Button
                          key={social.title}
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-emerald-400/70 hover:text-emerald-400"
                          onClick={() => window.open(social.url, "_blank")}
                        >
                          <Icon className="h-3 w-3" />
                        </Button>
                      );
                    })}
                  </div> */}
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
