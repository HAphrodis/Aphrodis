// app\links\page.tsx
"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { useEffect, useState } from "react";
import { primaryLinks, socialLinks } from "@/constants/links";
import { ParticlesBackground } from "@/components/shared/particles-background";
import PageHeader from "@/components/shared/page-header";

export default function LinksPage() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <TooltipProvider>
      <div className="relative min-h-screen overflow-hidden bg-[#002922]">
        <PageHeader
          title="My"
          highlightedTitle="Links"
          subtitle="Connect with me on various platforms"
        />
        {/* Animated background elements */}
        <div className=" top-0 z-[-2]  w-screen  bg-[radial-gradient(#ffffff33_1px,transparent_1px)]  bg-[size:20px_20px]">
          <div className="absolute inset-0 top-62 overflow-hidden">
            <ParticlesBackground />
          </div>

          <div className="relative px-2 sm:px-4 py-16">
            <div className="mx-auto max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="backdrop-blur-sm overflow-hidden border-emerald-800/20 bg-emerald-900/10 shadow-2xl">
                  <div className="relative">
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-90">
                      <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,225,0))]" />
                    </div>

                    <div className="relative h-32 sm:h-48 overflow-hidden">
                      {/* Animated shapes */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {[...Array(20)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute h-32 w-32 rounded-full bg-emerald-500/5"
                            animate={{
                              x: [
                                Math.random() * windowSize.width,
                                Math.random() * windowSize.width,
                              ],
                              y: [
                                Math.random() * windowSize.height,
                                Math.random() * windowSize.height,
                              ],
                              scale: [1, 1.5, 1],
                            }}
                            transition={{
                              duration: Math.random() * 10 + 10,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                          />
                        ))}
                      </div>

                      {/* Profile image with glow effect */}
                      <motion.div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="relative">
                          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-75 blur" />
                          <Image
                            src="/profile.jpg"
                            alt="Profile"
                            width={140}
                            height={140}
                            className="relative h-20 w-20 sm:h-36 sm:w-36 rounded-full border-4 border-emerald-200/20 object-cover shadow-xl"
                          />
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  <motion.div
                    className="px-4 pb-8 pt-4 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h1 className="mb-2 text-2xl sm:text-3xl font-bold text-white">
                      ISHIMWE Jean Baptiste
                    </h1>
                    <p className="mb-2 text-emerald-400">
                      Full Stack Developer
                    </p>
                    <p className="mb-8 text-sm text-emerald-300/80">
                      Building digital experiences with code and creativity
                    </p>

                    {/* Primary Links */}
                    <div className="mb-8 grid sm:grid-cols-2  gap-4">
                      {primaryLinks.map((link, index) => (
                        <motion.div
                          key={link.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                className={`group relative h-12 w-full border-transparent text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg ${link.color}`}
                                asChild
                              >
                                <Link
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex  items-center justify-center gap-1"
                                >
                                  <link.icon className="h-6 w-6" />
                                  <span className="text-sm font-medium">
                                    {link.title}
                                  </span>
                                </Link>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{link.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </motion.div>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="grid gap-3">
                      {socialLinks.map((link, index) => (
                        <motion.div
                          key={link.title}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                className={`group relative h-12 w-full border-emerald-800/20 bg-emerald-900/20 text-emerald-500 backdrop-blur-sm transition-all duration-300 hover:scale-102 hover:shadow-lg ${link.color}`}
                                asChild
                              >
                                <Link
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between px-4"
                                >
                                  <div className="flex items-center gap-3">
                                    <link.icon className="h-5 w-5" />
                                    <span>{link.title}</span>
                                  </div>
                                  <ExternalLink className="h-4 w-4 opacity-50 transition-opacity group-hover:opacity-100" />
                                </Link>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{link.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
