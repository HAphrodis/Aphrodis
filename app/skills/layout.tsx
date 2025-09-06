"use client";

import type React from "react";

import { useState, useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [easterEgg, setEasterEgg] = useState("");
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    let keys = "";
    const handleKeyPress = (e: KeyboardEvent) => {
      keys += e.key;
      if (keys.includes("e")) {
        setEasterEgg("You found the emerald!");
        setTimeout(() => setEasterEgg(""), 3000);
      }
      if (keys.length > 10) keys = keys.slice(1);
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    const handleKonamiCode = (e: KeyboardEvent) => {
      const konamiCode = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
      if (konamiCode.indexOf(e.key) === konamiCode.length - 1) {
        setTheme(theme === "default" ? "retro" : "default");
      }
    };

    window.addEventListener("keydown", handleKonamiCode);
    return () => window.removeEventListener("keydown", handleKonamiCode);
  }, [theme]);

  return (
    <main className={theme === "retro" ? "retro" : ""}>
      {easterEgg && (
        <div className="fixed top-0 left-0 w-full bg-emerald-500 text-[#002922] p-2 text-center z-50">
          {easterEgg}
        </div>
      )}
      {children}

      {/* <Loade /> */}
    </main>
  );
}
