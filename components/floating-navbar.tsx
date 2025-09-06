"use client";

import * as React from "react";
import { Home, Grid, BookOpen, Image, User2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  href: string;
}

const navItems: NavItem[] = [
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
    label: "Blog",
    icon: BookOpen,
    href: "/blog",
  },
  {
    label: "Gallery",
    icon: Image,
    href: "/gallery",
  },
];

export function FloatingNavbar() {
  const [activeItem, setActiveItem] = React.useState("About");

  return (
    <header className="fixed left-0 right-0 top-4 z-50 mx-auto max-w-2xl px-4">
      <nav className="absolute left-1/2 -translate-x-1/2">
        <ul className="flex items-center gap-1 rounded-full border border-white/30 bg-white/5 px-2 backdrop-blur-md">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem(item.label);
                }}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/80 transition-colors hover:text-white",
                  activeItem === item.label && "bg-white/10 text-white",
                )}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
