"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

type ColorScheme = "emerald" | "blue" | "purple" | "custom";
type ViewMode = "designer" | "developer";

interface ThemeContextType {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  customTheme: Record<string, string>;
  setCustomTheme: (theme: Record<string, string>) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("emerald");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [customTheme, setCustomTheme] = useState<Record<string, string>>({});
  const [viewMode, setViewMode] = useState<ViewMode>("developer");

  useEffect(() => {
    // Apply the selected color scheme and dark mode to the document
    document.documentElement.classList.toggle("dark", isDarkMode);
    document.documentElement.setAttribute("data-color-scheme", colorScheme);
  }, [colorScheme, isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        setColorScheme,
        isDarkMode,
        toggleDarkMode,
        customTheme,
        setCustomTheme,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
