"use client"

import Image from "next/image"
import { getTechIcon } from "@/icons"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  Building2,
  Calendar,
  ExternalLink,
  Info,
  Play,
} from "lucide-react"

import type { Project } from "@/types/project"
import { techItemVariants, techVariants } from "@/lib/animations"
import { Button } from "@/components/ui/button"

import { BorderBeam } from "../magicui/border-beam"
import { formatDate, getFormattedDateRange, isProjectWIP } from "@/lib/format-date"

interface ProjectCardProps extends Project {
  onViewDetails: () => void
  index: number
}

export function ProjectCard({
  title,
  startDate,
  releaseDate,
  url,
  description,
  tools,
  screenshot,
  onViewDetails,
  index,
  client,
  demoVideoUrl,
  category,
  complexity,
}: ProjectCardProps) {
  // Format date for display
  const formattedDate = releaseDate
    ? formatDate(new Date(releaseDate).getTime())
    : formatDate(new Date(startDate || "").getTime())

  // Check if project is new (released in the last 30 days)
  const isNewProject = releaseDate
    ? new Date().getTime() - new Date(releaseDate).getTime() <
      30 * 24 * 60 * 60 * 1000
    : false

  const isWIP = isProjectWIP(releaseDate)

  // Alternate layout direction based on index
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, type: "spring" as const, bounce: 0.3 }}
      className="group relative overflow-hidden rounded-3xl border border-primary/20 bg-white/80 backdrop-blur-xl shadow-lg shadow-primary/5">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/3 to-third/5 opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

      {/* Floating geometric shapes */}
      <div className="absolute top-10 right-10 h-20 w-20 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-xl"></div>
      <div className="absolute bottom-20 left-10 h-16 w-16 rotate-45 bg-gradient-to-br from-third/10 to-primary/10 blur-lg"></div>
      <div className="absolute top-1/2 left-1/3 h-12 w-12 rounded-full bg-secondary/8 blur-md"></div>

      {/* Animated glow orbs */}
      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 blur-3xl transition-all duration-700 group-hover:opacity-100 group-hover:scale-110"></div>
      <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-br from-third/10 to-primary/10 opacity-0 blur-3xl transition-all duration-700 group-hover:opacity-100 group-hover:scale-110"></div>

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #009966 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }}></div>

      {/* Project Number */}
      <div className="absolute top-1/2 -left-5 hidden -translate-y-1/2 text-[120px] font-bold text-primary/8 select-none md:block">
        {(index + 1).toString().padStart(2, "0")}
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6 sm:p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-start md:gap-8">
          {/* Left Column - Image */}
          <motion.div
            className={`md:w-2/5 ${isEven ? "md:order-1" : "md:order-2"}`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}>
            <div className="group/image relative overflow-hidden rounded-xl border border-primary/15 bg-white/60 shadow-lg shadow-primary/10 backdrop-blur-sm">
              {screenshot ? (
                <Image
                  src={screenshot || "/placeholder.svg"}
                  alt={`Screenshot of ${title}`}
                  width={800}
                  height={450}
                  className="aspect-video h-full w-full object-cover transition-all duration-500 group-hover/image:scale-105"
                />
              ) : (
                <div className="flex aspect-video h-full w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                  <span className="text-primary/60">No preview available</span>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/90 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/image:opacity-95">
                <motion.a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40">
                  View Live <ExternalLink className="h-4 w-4" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <div
            className={`md:w-3/5 ${isEven ? "md:order-2" : "md:order-1"} mt-6 md:mt-0`}>
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-primary  text-2xl font-bold">{title}</h3>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Calendar className="h-3 w-3" />
                {getFormattedDateRange(startDate, releaseDate) || formattedDate}
              </div>
            </div>

            <div className="mb-4 flex flex-wrap gap-3 text-sm">
              {client && (
                <div className="flex items-center gap-1 text-secondary">
                  <Building2 className="h-3 w-3" />
                  <span className="truncate font-medium">{client}</span>
                </div>
              )}

              {category && (
                <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary capitalize">
                  {category.replace("-", " ")}
                </div>
              )}
              {complexity && (
                <div className="rounded-full border border-third/20 bg-third/10 px-3 py-1 text-xs font-medium text-third capitalize">
                  {complexity}
                </div>
              )}

              {/* {isPrivate && (
                <motion.span className="flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600">
                  <Lock className="h-3 w-3" />
                  Private
                </motion.span>
              )} */}
              {isWIP && (
                <motion.span className="flex items-center gap-1 rounded-full bg-amber-100 border border-amber-200 px-3 py-1 text-xs font-medium text-amber-700">
                  WIP
                </motion.span>
              )}
              {isNewProject && !isWIP && (
                <motion.span className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white shadow-md shadow-primary/30">
                  New
                </motion.span>
              )}
            </div>

            <p className="leading-relaxed text-gray-700">{description}</p>

            {/* Tools Section */}
            <motion.div
              variants={techVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mt-6 flex flex-wrap gap-2">
              {tools.slice(0, 6).map((tool) => {
                const TechIcon = getTechIcon(tool.name)
                return (
                  <motion.span
                    key={tool.name}
                    variants={techItemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 rounded-full border border-primary/15 bg-white/70 px-4 py-1.5 text-sm text-primary backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-white/90 hover:shadow-md">
                    {TechIcon && <TechIcon className="h-4 w-4" />}
                    {tool.name}
                  </motion.span>
                )
              })}
              {tools.length > 6 && (
                <span className="flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm text-gray-500">
                  +{tools.length - 6} more
                </span>
              )}
            </motion.div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="inline-block p-0.5">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30">
                  View demo
                  <ArrowUpRight className="h-4 w-4" />
                </motion.a>
              </div>

              {demoVideoUrl && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href={demoVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2 text-sm font-medium text-red-600 transition-all hover:border-red-300 hover:bg-red-100">
                  <Play className="h-4 w-4" />
                  Demo Video
                </motion.a>
              )}

              <Button
                onClick={onViewDetails}
                variant="outline"
                className="inline-flex items-center gap-2 rounded-full border border-[#009966] bg-[#009966]/20 px-5 py-2 text-sm font-medium text-gray-700 transition-all hover:border-secondary/30 hover:bg-secondary/20 hover:shadow-md">
                <Info className="mr-2 h-4 w-4" />
                Full Details
              </Button>
            </div>
          </div>
        </div>
      </div>

      <BorderBeam
        duration={30}
        size={500}
        delay={17}
        className="from-transparent via-primary/40 to-transparent"
      />
      <BorderBeam
        duration={30}
        size={500}
        className="from-transparent via-secondary/30 to-transparent"
      />

      <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-third/5 blur-xl" />
      </div>
    </motion.div>
  )
}
