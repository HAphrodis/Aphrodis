// components\about\animated-timeline.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  // useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";

interface TimelineEntry {
  title: string;
  subtitle: string;
  date: string;
  content: React.ReactNode;
}

export const AnimatedTimeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 25%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans" ref={containerRef}>
      <div ref={ref} className="relative mx-auto">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-16 md:gap-4">
            <div className="sticky flex flex-col md:flex-row z-40   items-center top-32 self-start max-w-xs lg:max-w-xs md:w-full">
              <div className="h-10  absolute left-0 md:left-0 w-10 rounded-full bg-[#002922] flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-emerald-500 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-16 md:text-2xl font-bold text-white">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-16 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl md:text-xl mb-2 text-left font-bold text-white">
                {item.title}
              </h3>
              <p className="text-emerald-400 font-semibold mb-2">
                {item.subtitle}
              </p>
              <p className="text-sm text-white/50 mb-4">{item.date}</p>
              <div className="text-white/70">{item.content}</div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-[19px] md:left-[19px] top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-0% via-white/20 to-transparent to-99% [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-linear-to-t from-emerald-500 via-emerald-400 to-transparent from-0% via-50% rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
