"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { motion, } from "framer-motion";
import {
  User2,
  Grid,
  ImageIcon,
  Menu,
  Contact,
  Home,
  Briefcase,
  Award,
} from "lucide-react";

import { MobileMoreSheet } from "@/components/common/mobile-more-sheet";

// Simplified nav items without nested dropdowns
const navItems = [
  {
    label: "Home",
    icon: Home,
    href: "/",
  },
  {
    label: "About",
    icon: User2,
    href: "/about",
  },
  {
    label: "Experience",
    icon: Award,
    href: "/experience",
  },
  {
    label: "Work",
    icon: Briefcase,
    href: "/work",
  },
  {
    label: "Blogs",
    icon: Grid,
    href: "/blogs",
  },
  {
    label: "Services",
    icon: ImageIcon,
    href: "/services",
   
  },
  {
    label: "Contacts",
    icon: Contact,
    href: "/contact",
  },
];

// Mobile nav items
const mobileNavItems = [
  {
    label: "Menu",
    icon: Menu,
    href: "#",
    action: "more",
  },
];


export function FloatingNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showMobileMoreSheet, setShowMobileMoreSheet] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const handleDropdownToggle = (label: string) => {
  //   setActiveDropdown(activeDropdown === label ? null : label);
  // };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  // Check if current page is related to dropdown items
  const isDropdownActive = (label: string) => {
    if (label === "Services") {
      return pathname === "/services";
    }
    if (label === "More") {
      return [
        "/links",
        "/attributions",
        "/guestbook",
        "/checklist",
        "/lab",
        "/bookmarks",
      ].includes(pathname);
    }
    return false;
  };

  // Handle mobile item click
  const handleMobileItemClick = (item: (typeof mobileNavItems)[0]) => {
    if (item.action === "more") {
      setShowMobileMoreSheet(true);
    }
  };

  // const renderDropdownContent = (label: string) => {
  //   switch (label) {
  //     case "More":
  //       return <MoreDropdown />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <>
      {/* Top Navigation - Visible on large screens */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed left-0 right-0 top-0 z-50 mx-auto hidden max-w-4xl px-4 md:block",
          scrolled
            ? ""
            : "bg-transparent py-4 backdrop-blur-md"
        )}
      >
        <nav className="relative">
          <motion.div
            className={cn(
              "absolute left-1/2 -translate-x-1/2 transition-all duration-300",
              scrolled && "bg-white shadow-lg w-screen px-10",
            )}
            // whileHover={{ scale: scrolled ? 0.98 : 1.02 }}
            // transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {/* Background with enhanced glassmorphism. */}
            <div
              className={cn(
                " inset-0 transition-all duration-300",
                scrolled
                  ? ""
                  : " border-purple-100/20 bg-[#04877F]/20 backdrop-blur-md absolute rounded-full border ",
              )}
            />

            {/* Animated background glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/5 via-purple-400/10 to-emerald-500/5 opacity-0 transition-opacity duration-500 hover:opacity-100" />

            <div className="flex justify-between gap-4 items-center">
            
            <div className="flex-shrink-0 gap-2">
           <div className="flex items-center gap-4 px-6 py-2"> 
                   <Link 
                      href="https://github.com/HAphrodis"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "p-2 rounded-full border transition",
                        scrolled
                          ? "text-gray-700 hover:text-green-400 border-gray-700"
                          : "text-white border-white"
                      )}
                    > 
                      <FaGithub className="w-3 h-3" />
                    </Link> 
                    <Link
                      href="https://www.linkedin.com/in/aphrodis-hakuzweyezu-675677304"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "p-2 rounded-full border transition",
                        scrolled
                          ? "text-gray-700 hover:text-green-400 border-gray-700"
                          : "text-white border-white"
                      )}
                    >
                      <FaLinkedin className="w-3 h-3" />
                    </Link>
                    <Link
                      href="https://www.instagram.com/hakuzweyezu_aphrodis"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "p-2 rounded-full border transition",
                        scrolled
                          ? "text-gray-700 hover:text-green-400 border-gray-700"
                          : "text-white border-white"
                      )}
                    >
                      <FaInstagram className="w-3 h-3" />
                    </Link>
                    <Link
                      href="https://x.com/Aphossy1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "p-2 rounded-full border transition",
                        scrolled
                          ? "text-gray-700 hover:text-green-400 border-gray-700"
                          : "text-white border-white"
                      )}
                    >
                      <FaXTwitter className="w-3 h-3" />
                    </Link>
                    <Link
                      href="tel:0784343073"
                      className={cn(
                        "p-2 rounded-full border transition",
                        scrolled
                          ? "text-gray-700 hover:text-green-400 border-gray-700"
                          : "text-white border-white"
                      )}
                    >
                      <FaPhone className="w-3 h-3" />
                    </Link>
                    <Link
                      href="mailto:hakuzweaphossy@gmail"
                      className={cn(
                        "p-2 rounded-full border transition",
                        scrolled
                          ? "text-gray-700 hover:text-green-400 border-gray-700"
                          : "text-white border-white"
                      )}
                    >
                      <FaEnvelope className="w-3 h-3" />
                    </Link>
                  </div>
            </div>

            <ul className="relative flex items-center gap-1 px-2 py-1">
  
              {navItems.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="relative"
                >
                   
                    <Link href={item.href} onClick={closeDropdown}>
                      <motion.div
                        className={cn(
                          "flex items-center gap-1 rounded-xl gag-3 px-4 py-2.5 text-sm font-medium transition-all duration-300 relative overflow-hidden",
                          "",
                          pathname === item.href &&
                            "px-2 py-1.5 text-emerald-100",
                            scrolled
                                ? "text-gray-700 hover:border-b-2 hover:border-green-400 hover:text-green-400"
                                : "text-white hover:text-emerald-100 hover:border-b-2"
                            )}
                        // whileHover={{ scale: 1.05 }}
                        // whileTap={{ scale: 0.95 }}
                      >
                        {/* Active indicator */}
                        {pathname === item.href && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute inset-0 border-b-2 p-3 rounded-xl"
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 30,
                            }}
                          />
                        )}

                        <span className="relative z-10 flex items-center gap-2">
                          {item.icon && <item.icon className="h-4 w-4" />}
                          {item.label}
                        </span>
                      </motion.div>
                    </Link>
                </motion.li>
              ))}
              
            </ul>
            </div>
          </motion.div>
        </nav>

        {/* Click outside to close dropdown */}
        {activeDropdown && (
          <div className="fixed inset-0 z-40" onClick={closeDropdown} />
        )}
      </motion.header>

      {/* Bottom Navigation - Visible on mobile */}
       <div className="fixed top-0 right-3 h-full z-50 md:hidden flex flex-col items-end">
        
        <TooltipProvider>
          <Dock
            className="text-white font-bold"
            iconSize={48}
            iconMagnification={56}
            iconDistance={100}
            
          >
            {mobileNavItems.map((item) => (
              <DockIcon key={item.label} className="px-0">
                <Tooltip>
                  <TooltipTrigger asChild>
                    {item.action ? (
                      <button
                        onClick={() => handleMobileItemClick(item)}
                        aria-label={item.label}
                        className={cn(
                          "flex h-full w-full items-center justify-center transition-all duration-100",
                          "text-white",
                          item.action === "more" &&
                            isDropdownActive("More") &&
                            "text-white shadow-[0_0_8px_rgba(16,185,129,0.4)]",
                        )}
                      >
                        <item.icon className="h-[50px] w-[50px]" />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        target="_blank"
                         rel="noopener noreferrer"
                        aria-label={item.label}
                        className={cn(
                          "flex h-full w-full items-center justify-center transition-all duration-100",
                          "text-emerald-100/70 hover:text-emerald-100",
                          pathname === item.href &&
                            "text-emerald-100 shadow-[0_0_8px_rgba(16,185,129,0.4)]",
                        )}
                      >
                        <item.icon className="h-[50px] w-[50px]"/>
                      </Link>
                    )}
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="bg-black/90 text-emerald-100 border-purple-100/20"
                  >
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
          </Dock>
        </TooltipProvider>
      </div>

      {/* Mobile More Sheet */}
      <MobileMoreSheet
        isOpen={showMobileMoreSheet}
        onClose={() => setShowMobileMoreSheet(false)}
      />
    </>
  );
}
