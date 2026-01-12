/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { projects } from "@/constants/projects"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Calendar, Clock, ExternalLink, Info } from "lucide-react"
import { FaGithub } from "react-icons/fa6"

import type { Project } from "@/types/project"
import { formatDate, isProjectWIP } from "@/lib/format-date"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { BorderBeam } from "../magicui/border-beam"
import { ProjectDetailsDialog } from "./project-details-dialog"

export default function MobileProjectSection() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Filter featured projects and sort by release date (newest first)
  const featuredProjects = projects
    .filter((project) => project.isFeatured)
    .sort((a, b) => {
      const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0
      const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0
      return dateB - dateA
    })

  const [activeProject, setActiveProject] = useState<Project>(
    featuredProjects[0]
  )
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const observers = useRef<IntersectionObserver[]>([])

  useEffect(() => {
    // Cleanup previous observers
    observers.current.forEach((observer) => observer.disconnect())
    observers.current = []

    if (!isMobile) {
      // Create new observers for each project card
      const projectCards = document.querySelectorAll(".project-card")
      projectCards.forEach((card, index) => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveProject(featuredProjects[index])
              }
            })
          },
          {
            threshold: 0.3, // Reduced threshold for better mobile experience
            rootMargin: "-20% 0px -20% 0px", // Reduced margin for better triggering
          }
        )

        observer.observe(card)
        observers.current.push(observer)
      })
    }

    return () => {
      observers.current.forEach((observer) => observer.disconnect())
    }
  }, [featuredProjects, isMobile]) // Add isMobile dependency

  const handleOpenProjectDetails = (project: Project) => {
    setSelectedProject(project)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  // Format date for display
  const formatProjectDate = (project: Project) => {
    if (project.releaseDate) {
      const isWIP = isProjectWIP(project.releaseDate)
      if (isWIP) {
        return `To be released: ${formatDate(new Date(project.releaseDate).getTime())}`
      }
      return `Released: ${formatDate(new Date(project.releaseDate).getTime())}`
    }
    return project.startDate
  }

  // Calculate project duration
  const getProjectDuration = (project: Project) => {
    if (project.startDate && project.releaseDate) {
      const start = new Date(project.startDate)
      const end = new Date(project.releaseDate)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays < 30) {
        return `${diffDays} days`
      } else {
        const diffMonths = Math.floor(diffDays / 30)
        return `${diffMonths} month${diffMonths > 1 ? "s" : ""}`
      }
    }
    return null
  }

  const ProjectDetails = ({ project }: { project: Project }) => (
    <motion.div
      className="mt-6 space-y-6 rounded-xl border border-gray-200 bg-white/95 p-4 shadow-lg backdrop-blur-sm md:mt-0 md:p-6"
      {...(!isMobile && {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.5, ease: "easeOut" },
      })}>
      <div className="space-y-3">
        <motion.div
          className="flex items-center gap-4"
          {...(!isMobile && {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
          })}>
          <div className="h-1 w-4 rounded-full bg-primary" />
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 md:text-2xl">
            {project.title}
          </h2>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center gap-3 text-xs text-gray-600 md:gap-4 md:text-sm"
          {...(!isMobile && {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.2 },
          })}>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-primary md:h-4 md:w-4" />
            <span>{formatProjectDate(project)}</span>
          </div>

          {/* {getProjectDuration(project) && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-secondary md:h-4 md:w-4" />
              <span>Duration: {getProjectDuration(project)}</span>
            </div>
          )} */}

          {/* {project.isPrivate && (
            <span className="flex items-center gap-1 rounded-full border border-gray-300 bg-gray-100 px-2 py-1 text-xs text-gray-700 md:px-3">
              <Lock className="h-3 w-3" />
              Private
            </span>
          )} */}
        </motion.div>
      </div>

      <motion.p
        className="text-sm leading-relaxed text-gray-700 md:text-base"
        {...(!isMobile && {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.3 },
        })}>
        {project.description}
      </motion.p>

      <motion.div
        className="space-y-2"
        {...(!isMobile && {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.4 },
        })}>
        {(project.features ?? []).slice(0, 8).map((feature, index) => (
          <motion.div
            key={index}
            className="flex items-start gap-2"
            {...(!isMobile && {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.4 + index * 0.05 },
            })}>
            <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary md:h-2 md:w-2" />
            <p className="text-sm leading-relaxed text-gray-700">{feature}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-wrap gap-2 md:gap-3"
        {...(!isMobile && {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.6 },
        })}>
        <Button
          asChild
          size="sm"
          className="rounded-full bg-primary text-white shadow-lg transition-all duration-200 hover:bg-primary/90 hover:shadow-xl">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2">
            View demo
            <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
          </a>
        </Button>

        {!project.isPrivate && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full border-secondary bg-white text-secondary shadow-sm transition-all duration-200 hover:bg-secondary hover:text-white">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2">
              <FaGithub className="h-3 w-3 md:h-4 md:w-4" />
              Source Code
            </a>
          </Button>
        )}

        <Button
          onClick={() => handleOpenProjectDetails(project)}
          variant="outline"
          size="sm"
          className="rounded-full border-primary bg-white text-primary shadow-sm transition-all duration-200 hover:bg-primary hover:text-white">
          <Info className="mr-1.5 h-3 w-3 md:h-4 md:w-4" />
          Details
        </Button>
      </motion.div>
    </motion.div>
  )

  return (
    <section className="min-h-screen bg-secondary/[0.21] relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/3 -left-20 h-60 w-60 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 h-40 w-40 rounded-full bg-third/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}></motion.div>
      <div className="container relative mx-auto px-4 py-12 pt-16 md:px-0 md:py-16 md:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-4xl md:text-4xl font-bold text-gray-900 mb-6">
            Some of our
            <span className="bg-primary bg-clip-text text-transparent">
              {" "}
              projects
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore a selection of our featured projects that showcase our
            expertise in delivering innovative and impactful solutions across
            various industries{" "}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:gap-16 lg:grid-cols-2">
          {/* Scrolling Content - Screenshots with enhanced mobile design */}
          <div className="space-y-8 md:space-y-32">
            {featuredProjects.slice(0, 5).map((project, index) => (
              <motion.div key={index}>
                <Card className="project-card group relative border border-gray-200 bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 md:p-3">
                  <BorderBeam
                    duration={30}
                    size={500}
                    className="from-transparent via-primary/90 to-transparent"
                  />

                  <div className="relative aspect-video overflow-hidden rounded-lg border border-gray-200 transition-all duration-500 group-hover:border-primary/40">
                    <Image
                      src={project.screenshot || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />

                    {/* Enhanced project number indicator */}
                    <motion.div
                      className="absolute right-3 bottom-3 rounded-full border border-gray-300 bg-white/90 px-2 py-1 font-mono text-xs text-gray-700 backdrop-blur-sm md:right-4 md:bottom-4 md:px-3"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}>
                      {(index + 1).toString().padStart(2, "0")}
                    </motion.div>

                    {/* Enhanced badges with animations */}
                    {project.releaseDate &&
                      !isProjectWIP(project.releaseDate) &&
                      new Date().getTime() -
                        new Date(project.releaseDate).getTime() <
                        30 * 24 * 60 * 60 * 1000 && (
                        <motion.div
                          className="absolute top-3 left-3 rounded-full bg-primary px-2 py-1 text-xs font-bold text-white shadow-lg md:top-4 md:left-4 md:px-3"
                          initial={{ scale: 0, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            delay: 0.3,
                            type: "spring",
                            stiffness: 200,
                          }}>
                          NEW
                        </motion.div>
                      )}

                    {isProjectWIP(project.releaseDate) && (
                      <motion.div
                        className="absolute top-3 left-3 rounded-full bg-third px-2 py-1 text-xs font-bold text-white shadow-lg md:top-4 md:left-4 md:px-3"
                        initial={{ scale: 0, rotate: 10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: 0.3,
                          type: "spring",
                          stiffness: 200,
                        }}>
                        WIP
                      </motion.div>
                    )}
                  </div>
                </Card>

                {/* Mobile project details */}
                <div className="lg:hidden">
                  <ProjectDetails project={project} />
                </div>
              </motion.div>
            ))}

            <motion.div
              className="flex justify-center pt-4 md:pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}>
              <Button
                asChild
                className="rounded-full border-2 border-primary bg-primary px-6 py-2 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-primary hover:shadow-xl">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2">
                  View All Projects
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Sticky Content - Desktop project details with AnimatePresence */}
          <div className="sticky top-20 hidden h-fit lg:block">
            <AnimatePresence mode="wait">
              <ProjectDetails project={activeProject} />
            </AnimatePresence>
          </div>
        </div>
      </div>

      <ProjectDetailsDialog
        project={selectedProject}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </section>
  )
}
