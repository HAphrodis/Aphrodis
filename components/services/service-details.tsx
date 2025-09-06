/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import type { Service } from "@/constants/my-services";

interface ServiceDetailsProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
}

export function ServiceDetails({
  service,
  isOpen,
  onClose,
}: ServiceDetailsProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "features" | "process" | "faq"
  >("overview");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-emerald-800/30 text-white flex flex-col">
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="bg-purple-500/10 p-3 rounded-lg">
              <service.icon className="h-6 w-6 text-[#D8B4FE]" />
            </div>
            <DialogTitle className="text-2xl font-bold">
              {service.title}
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Tabs */}
        <div className="mt-4 border-b border-purple-800/30 flex-shrink-0">
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {["overview", "features", "process", "faq"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors relative ${
                  activeTab === tab
                    ? "text-purple-300/40"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto pr-2">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <p className="text-white/80 leading-relaxed">
                  {service.longDescription || service.description}
                </p>

                {service.benefits && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-purple-300/40 mb-4">
                      Benefits
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {service.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-purple-300/40 mt-0.5 flex-shrink-0" />
                          <span className="text-white/80">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {service.idealFor && (
                  <div className="mt-6 p-4 bg-emerald-900/20 rounded-lg border border-emerald-500/10">
                    <h3 className="text-lg font-semibold text-purple-300/40 mb-2">
                      Ideal For
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-white/80">
                      {service.idealFor.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "features" && (
              <motion.div
                key="features"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {service.features ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.features.map((feature, index) => (
                      <div
                        key={index}
                        className="p-4 bg-emerald-900/20 rounded-lg border border-emerald-500/10 hover:border-emerald-500/30 transition-colors"
                      >
                        <h4 className="text-lg font-medium text-purple-300/40 mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-white/70">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/60 italic">
                    Feature details coming soon.
                  </p>
                )}
              </motion.div>
            )}

            {activeTab === "process" && (
              <motion.div
                key="process"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {service.process ? (
                  <div className="space-y-8">
                    {service.process.map((step, index) => (
                      <div key={index} className="relative pl-12">
                        <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-purple-300/40 font-bold">
                          {index + 1}
                        </div>
                        <div className="border-l-2 border-emerald-500/20 pl-6 pb-8 -ml-4 mt-8">
                          <h4 className="text-lg font-medium text-purple-300/40 -mt-8 mb-2">
                            {step.title}
                          </h4>
                          <p className="text-white/70">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/60 italic">
                    Process details coming soon.
                  </p>
                )}
              </motion.div>
            )}

            {activeTab === "faq" && (
              <motion.div
                key="faq"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {service.faq ? (
                  <div className="space-y-4">
                    {service.faq.map((item, index) => (
                      <div
                        key={index}
                        className="p-4 bg-emerald-900/20 rounded-lg border border-emerald-500/10 hover:border-emerald-500/30 transition-colors"
                      >
                        <h4 className="text-lg font-medium text-purple-300/40 mb-2">
                          {item.question}
                        </h4>
                        <p className="text-white/70">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/60 italic">
                    FAQ details coming soon.
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-emerald-800/30 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
          <p className="text-white/60 text-sm">
            Interested in this service? Let&apos;s discuss how I can help you.
          </p>
          <Button
            asChild
            className="bg-white text-green-400 hover:border-b-2 rounded-xl"
          >
            <Link href="/contact" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" /> Get in Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
