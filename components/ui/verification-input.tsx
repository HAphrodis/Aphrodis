// components\ui\verification-input.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface VerificationInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  onComplete?: () => void;
  hasError?: boolean;
}

export function VerificationInput({
  length = 6,
  value = "",
  onChange,
  disabled = false,
  onComplete,
  hasError = false,
}: VerificationInputProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [focused, setFocused] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  // Focus the first input on mount
  useEffect(() => {
    if (!disabled && inputs.current[0]) {
      inputs.current[0].focus();
    }
  }, [disabled]);

  // Check if all inputs are filled and trigger onComplete
  useEffect(() => {
    if (value.length === length) {
      setIsComplete(true);
      // Only trigger onComplete if there's no error and we have a complete code
      if (!hasError && onComplete) {
        // Add a small delay for the animation to play
        const timer = setTimeout(() => {
          onComplete();
        }, 500);
        return () => clearTimeout(timer);
      }
    } else {
      setIsComplete(false);
    }
  }, [value, length, onComplete, hasError]);

  const handleInputChange = (index: number, inputValue: string) => {
    const newValue = value.split("");
    newValue[index] = inputValue.slice(-1);
    const combinedValue = newValue.join("");
    onChange(combinedValue);

    // Move to next input if we have a value
    if (inputValue && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    onChange(pastedData);

    // Focus the next empty input
    const nextEmptyIndex =
      pastedData.length < length ? pastedData.length : length - 1;
    inputs.current[nextEmptyIndex]?.focus();
  };

  return (
    <div className="gap- flex">
      {[...Array(length)].map((_, index) => (
        <div key={index} className="relative w-14">
          <Input
            ref={(el) => {
              inputs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={disabled}
            className="border-main_blue ring-offset-main_blue focus:border-main_blue dark:border-main_blue dark:ring-offset-main_blue dark:focus:border-main_blue h-11 w-11 bg-white text-center text-lg font-semibold text-black dark:bg-white dark:text-black"
          />
        </div>
      ))}

      {/* Success animation */}
      <AnimatePresence>
        {isComplete && !hasError && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-1/2 -right-10 -translate-y-1/2"
          >
            <CheckCircle2 className="h-8 w-8 text-[#11922f]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated background pulse when complete */}
      <AnimatePresence>
        {isComplete && !hasError && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            className="absolute inset-0 -z-10 rounded-xl bg-[#11922f]/20"
          />
        )}
      </AnimatePresence>

      {/* Add error shake animation */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 -z-10 rounded-xl bg-red-500/10"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
