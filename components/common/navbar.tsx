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
  PhoneCall,
  Contact,
  Home,
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
    label: "Work",
    icon: Grid,
    href: "/work",
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
    label: "Github",
    icon: FaGithub,
    href: "https://github.com/HAphrodis",
  },
  {
    label: "Linkedin",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/aphrodis-hakuzweyezu-675677304",
  },
  {
    label: "Instagrm",
    icon: FaInstagram,
    href: "https://www.instagram.com/hakuzweyezu_aphrodis",
  },
  {
    label: "Twitter",
    icon: FaXTwitter,
    href: "https://x.com/Aphossy1?t=EO14AukrdFvPyCna4a-tmQ&s=09",
  },
  {
    label: "Phone Number",
    icon: PhoneCall,
    href: "tel:0784343073",
  },
  {
    label: "Email",
    icon: FaEnvelope,
    href: "mailto:hakuzweaphossy@gmail",
  },
  {
    label: "More",
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
        className="fixed left-0 right-0 top-4 z-50 mx-auto hidden max-w-4xl px-4 md:block"
      >
        <nav className="relative">
          <motion.div
            className={cn(
              "absolute left-1/2 -translate-x-1/2 transition-all duration-300",
              scrolled && "scale-95",
            )}
            whileHover={{ scale: scrolled ? 0.98 : 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {/* Background with enhanced glassmorphism. */}
            <div
              className={cn(
                "absolute inset-0 rounded-full border transition-all duration-300",
                scrolled
                  ? "border-purple-100/10 bg-emerald-900/20 backdrop-blur-xl shadow-lg"
                  : "border-purple-100/10 bg-emerald-900/10 backdrop-blur-md",
              )}
            />

            {/* Animated background glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/5 via-emerald-400/10 to-emerald-500/5 opacity-0 transition-opacity duration-500 hover:opacity-100" />

            <div className="flex justify-between gap-4 items-center">
            
            <div className="flex-shrink-0 gap-2">
           <div className="flex items-center gap-4 px-6 py-2 rounded-full shadow-lg backdrop-blur-sm">
      
       <Link
            href="https://github.com/HAphrodis"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group p-2 rounded-full text-white border border-white transition-transform duration-300"
            aria-label="GitHub Profile"
          >
            <FaGithub className="w-4 h-4" />
            <span className="absolute -inset-1 rounded-full opacity-50 transition duration-300" aria-hidden="true"></span>
          </Link>

      <Link
            href="https://www.linkedin.com/in/aphrodis-hakuzweyezu-675677304"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group p-2 rounded-full text-white border border-white transition-transform duration-300"
            aria-label="Linkedin Profile"
          >
            <FaLinkedin className="w-4 h-4" />
            <span className="absolute -inset-1 rounded-full opacity-50 transition duration-300" aria-hidden="true"></span>
          </Link>
      <Link
            href="https://www.instagram.com/hakuzweyezu_aphrodis"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group p-2 rounded-full text-white border border-white transition-transform duration-300"
            aria-label="Instagrm Profile"
          >
            <FaInstagram className="w-4 h-4" />
            <span className="absolute -inset-1 rounded-full opacity-50 transition duration-300" aria-hidden="true"></span>
          </Link>
     <Link
            href="https://x.com/Aphossy1"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group p-2 rounded-full text-white border border-white transition-transform duration-300"
            aria-label="Twitter Profile"
          >
            <FaXTwitter className="w-4 h-4" />
            <span className="absolute -inset-1 rounded-full opacity-50 transition duration-300" aria-hidden="true"></span>
          </Link>

        <Link
            href="tel:0784343073"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group p-2 rounded-full text-white border border-white transition-transform duration-300"
            aria-label="Phone Number"
          >
            <FaPhone className="w-4 h-4" />
            <span className="absolute -inset-1 rounded-full opacity-50 transition duration-300" aria-hidden="true"></span>
          </Link>
       
        <Link
            href="mailto:hakuzweaphossy@gmail"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group p-2 rounded-full text-white border border-white transition-transform duration-300"
            aria-label="My Email"
          >
            <FaEnvelope className="w-4 h-4" />
            <span className="absolute -inset-1 rounded-full opacity-50 transition duration-300" aria-hidden="true"></span>
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
                          "text-emerald-100/80 hover:text-emerald-100 hover:border-b-2",
                          pathname === item.href &&
                            "px-2 py-1.5 text-emerald-100",
                        )}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
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
      <div className="fixed top-1 left-0 right-0 z-50 md:hidden">
        <TooltipProvider>
          <Dock
            className="mx-auto h-12 border border-purple-100/30 bg-emerald-900/10 px-3 backdrop-blur-lg"
            iconSize={32}
            iconMagnification={40}
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
                          "flex h-full w-full items-center justify-center rounded-full transition-all duration-100",
                          "text-emerald-100/70 hover:text-emerald-100",
                          item.action === "more" &&
                            isDropdownActive("More") &&
                            "bg-emerald-500/20 text-emerald-100 shadow-[0_0_8px_rgba(16,185,129,0.4)]",
                        )}
                      >
                        <item.icon className="h-[18px] w-[18px]" />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        target="_blank"
                         rel="noopener noreferrer"
                        aria-label={item.label}
                        className={cn(
                          "flex h-full w-full items-center justify-center rounded-full transition-all duration-100",
                          "text-emerald-100/70 hover:text-emerald-100",
                          pathname === item.href &&
                            "bg-emerald-500/20 text-emerald-100 shadow-[0_0_8px_rgba(16,185,129,0.4)]",
                        )}
                      >
                        <item.icon className="h-[18px] w-[100px]"/>
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
