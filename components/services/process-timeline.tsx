"use client";

import { motion } from "framer-motion";
import { workProcess } from "@/constants/my-services";

export function ProcessTimeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-emerald-500/20 transform md:-translate-x-1/2"></div>

      <div className="space-y-12 relative">
        {workProcess.map((step, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-emerald-950 border-2 border-emerald-500 rounded-full transform md:-translate-x-1/2 z-10 flex items-center justify-center">
                <span className="text-emerald-400 font-bold text-sm">
                  {index + 1}
                </span>
              </div>

              {/* Content */}
              <div
                className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"}`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-emerald-950/30 backdrop-blur-sm p-6 rounded-xl border border-emerald-500/10 hover:border-emerald-500/30 transition-all hover:shadow-[0_0_25px_rgba(16,185,129,0.05)]"
                >
                  <h3 className="text-xl font-bold text-emerald-400 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/70">{step.description}</p>

                  {step.points && (
                    <ul
                      className={`mt-4 space-y-2 ${isEven ? "md:ml-auto" : ""}`}
                    >
                      {step.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start gap-2">
                          <span className="text-emerald-400 text-lg leading-none">
                            •
                          </span>
                          <span className="text-white/80">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              </div>

              {/* Empty div for layout on mobile */}
              <div className="hidden md:block w-full md:w-1/2"></div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
