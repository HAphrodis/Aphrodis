"use client";

import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const DirectionContext = createContext<{
  direction: "rtl" | "ltr" | null;
  setAnimationDirection: (tab: number | null) => void;
} | null>(null);

const CurrentTabContext = createContext<{
  currentTab: number | null;
} | null>(null);

export const Dropdown: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTab, setCurrentTab] = useState<null | number>(null);
  const [direction, setDirection] = useState<"rtl" | "ltr" | null>(null);

  const setAnimationDirection = (tab: number | null) => {
    if (typeof currentTab === "number" && typeof tab === "number") {
      setDirection(currentTab > tab ? "rtl" : "ltr");
    } else if (tab === null) {
      setDirection(null);
    }

    setCurrentTab(tab);
  };

  return (
    <DirectionContext.Provider value={{ direction, setAnimationDirection }}>
      <CurrentTabContext.Provider value={{ currentTab }}>
        <span
          onMouseLeave={() => setAnimationDirection(null)}
          className={"relative flex h-fit gap-2"}
        >
          {children}
        </span>
      </CurrentTabContext.Provider>
    </DirectionContext.Provider>
  );
};

export const TriggerWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { currentTab } = useContext(CurrentTabContext)!;
  const { setAnimationDirection } = useContext(DirectionContext)!;

  return (
    <>
      {React.Children.map(children, (e, i) => (
        <motion.button
          onMouseEnter={() => setAnimationDirection(i + 1)}
          onClick={() => setAnimationDirection(i + 1)}
          className={cn(
            "flex h-10 items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 relative overflow-hidden",
            "text-white/80 hover:text-white hover:bg-white/10",
            currentTab === i + 1 &&
              "bg-emerald-500/20 text-white [&>svg]:rotate-180",
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Active background */}
          {currentTab === i + 1 && (
            <motion.div
              layoutId="dropdownActiveIndicator"
              className="absolute inset-0 bg-emerald-500/20 rounded-full"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}

          <span className="relative z-10">{e}</span>
        </motion.button>
      ))}
    </>
  );
};

export const Trigger: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <>
      <span className={cn("", className)}>{children}</span>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative top-[1px] ml-1 h-3 w-3 transition-transform duration-300"
        aria-hidden="true"
        animate={{ rotate: 0 }}
        whileHover={{ rotate: 180 }}
      >
        <path d="m6 9 6 6 6-6" />
      </motion.svg>
    </>
  );
};

export const Tabs: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const { currentTab } = useContext(CurrentTabContext)!;
  const { direction } = useContext(DirectionContext)!;

  return (
    <>
      <AnimatePresence>
        {currentTab && (
          <motion.div
            id="overlay-content"
            initial={{
              opacity: 0,
              scale: 0.95,
              y: -10,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: -10,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className="absolute left-0 top-[calc(100%_+_8px)] w-auto z-50"
          >
            <div className="absolute -top-[8px] left-0 right-0 h-[8px]" />
            <div className={cn("overflow-hidden", className)}>
              <AnimatePresence mode="wait">
                {currentTab !== null && (
                  <motion.div
                    key={currentTab}
                    initial={{
                      opacity: 0,
                      x:
                        direction === "ltr"
                          ? 20
                          : direction === "rtl"
                            ? -20
                            : 0,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      x:
                        direction === "ltr"
                          ? -20
                          : direction === "rtl"
                            ? 20
                            : 0,
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {React.Children.toArray(children)[currentTab - 1]}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const Tab: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <div className={cn("h-full w-full", className)}>{children}</div>;
};
