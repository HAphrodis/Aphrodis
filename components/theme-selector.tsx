"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PaletteIcon } from "lucide-react";

const THEMES = [
  { name: "One Dark Pro", value: "one-dark-pro" },
  { name: "GitHub Dark", value: "github-dark" },
  { name: "Dracula", value: "dracula" },
  { name: "Nord", value: "nord" },
  { name: "Tokyo Night", value: "tokyo-night" },
];

export function ThemeSelector() {
  const [theme, setTheme] = useState("one-dark-pro");

  useEffect(() => {
    // Set data attribute on document for theme switching
    document.documentElement.setAttribute("data-code-theme", theme);

    // Save preference to localStorage
    localStorage.setItem("code-theme", theme);
  }, [theme]);

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("code-theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <PaletteIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Code Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {THEMES.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={theme === t.value ? "bg-zinc-100 dark:bg-zinc-800" : ""}
          >
            {t.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
