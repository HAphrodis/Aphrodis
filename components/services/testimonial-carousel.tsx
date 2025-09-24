"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation, Variants } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/constants/my-services";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const backgroundControls = useAnimation();

  // Animated background colors based on current testimonial
  useEffect(() => {
    backgroundControls.start({
      background: [
        "radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)",
        "radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)",
        "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)",
      ],
      transition: {
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    });
  }, [backgroundControls]);

  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonials.length) % testimonials.length,
    );
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
    setDragOffset(0);
    controls.set({ x: 0 });
  };

  const handleDragMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const newOffset = clientX - dragStartX;
    setDragOffset(newOffset);
    controls.set({ x: newOffset });
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    if (Math.abs(dragOffset) > 100) {
      if (dragOffset > 0) {
        handlePrevious();
      } else {
        handleNext();
      }
    } else {
      controls.start({
        x: 0,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      });
    }
  };

  const variants:Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Animated background */}
      <motion.div
        animate={backgroundControls}
        className="absolute inset-0 rounded-3xl opacity-50"
      />

      {/* Large decorative quotes */}
      <div className="absolute -top-20 -left-20 text-emerald-500/10 transform rotate-12 hidden md:block">
        <Quote size={120} />
      </div>

      <div className="absolute bottom-4 -right-8 text-emerald-500/10 transform -rotate-12 hidden md:block">
        <Quote size={120} />
      </div>

      {/* Main testimonial container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-3xl bg-emerald-950/30 backdrop-blur-sm border border-emerald-500/10 p-8 md:p-12"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        // onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {/* Animated glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

        {/* Testimonial content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="md:grid md:grid-cols-3 gap-8 items-center"
            style={{ touchAction: "pan-y" }}
            // animate={controls}
          >
            {/* Left column - Image and info */}
            <div className="md:col-span-1 flex flex-col items-center md:items-start mb-8 md:mb-0">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse"></div>
                <div className="relative size-24 md:size-32 mb-4 overflow-hidden rounded-full border-2 border-emerald-500/30">
                  <Image
                    src={
                      testimonials[currentIndex].image ||
                      "/placeholder.svg?height=128&width=128"
                    }
                    alt={testimonials[currentIndex].name}
                    fill
                    className="object-cover"
                  />

                  {/* Animated overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 3,
                    }}
                  />
                </div>
              </div>

              <div className="text-center md:text-left">
                <h4 className="text-emerald-400 font-bold text-lg">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-white/60 text-sm">
                  {testimonials[currentIndex].title}
                </p>

                {/* Star rating */}
                <div className="flex items-center justify-center md:justify-start mt-2 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < 5
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-400",
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right column - Quote */}
            <div className="md:col-span-2 relative">
              <div className="absolute -top-2 -left-2 text-emerald-500/20">
                <Quote size={40} />
              </div>

              <motion.blockquote
                className="text-lg md:text-xl text-white/90 italic pt-8 pl-6 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {testimonials[currentIndex].quote}
                </motion.div>

                {/* Message icon with animation */}
                <motion.div
                  className="absolute -bottom-4 -right-4 bg-emerald-500/10 p-2 rounded-full"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <MessageSquare className="h-5 w-5 text-emerald-400" />
                </motion.div>
              </motion.blockquote>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className="group"
              aria-label={`Go to testimonial ${index + 1}`}
            >
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-emerald-400 w-8 h-2"
                    : "bg-emerald-500/30 group-hover:bg-emerald-500/50"
                }`}
              />

              {index === currentIndex && (
                <motion.div
                  className="h-2 w-8 rounded-full bg-emerald-400/50 absolute"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 6,
                    repeat: 1,
                    repeatType: "loop",
                    ease: "linear",
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center mt-8 gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          className="rounded-full border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          className="rounded-full border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
