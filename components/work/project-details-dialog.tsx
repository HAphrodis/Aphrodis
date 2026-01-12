"use client"

import Image from "next/image"
import { getTechIcon } from "@/icons"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Target,
} from "lucide-react"

import type { Project } from "@/types/project"
import { containerVariants, itemVariants } from "@/lib/animations"
import { getFormattedDateRange, isProjectWIP } from "@/lib/format-date"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ProjectDetailsDialogProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectDetailsDialog({
  project,
  isOpen,
  onClose,
}: ProjectDetailsDialogProps) {
  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="mx-auto max-h-[90vh] overflow-hidden border-gray-200 bg-gradient-to-br from-white to-gray-50/80 p-0 text-gray-900 backdrop-blur-2xl sm:max-w-5xl">
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
              className="flex h-full max-h-[95vh] flex-col">
              {/* Hero Section with Image */}
              <motion.div
                variants={itemVariants}
                className="relative h-[200px] w-full flex-shrink-0 md:h-[250px]">
                {project.screenshot ? (
                  <Image
                    src={project.screenshot || "/placeholder.svg"}
                    alt={`Screenshot of ${project.title}`}
                    width={1200}
                    height={1200}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <span className="text-gray-400">No preview available</span>
                  </div>
                )}

                {/* Overlay with title */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-3">
                  <div className="mb-2 flex items-center gap-3">
                    <h2 className="bg-primary bg-clip-text text-3xl font-bold text-transparent">
                      {project.title}
                    </h2>
                  </div>
                  <div className="flex w-fit items-center gap-1 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-sm text-white backdrop-blur-sm ">
                    <Calendar className="h-4 w-4" />
                    {getFormattedDateRange(
                      project.startDate,
                      project.releaseDate
                    )}

                    {isProjectWIP(project.releaseDate) && (
                      <span className="flex items-center gap-1 rounded-full border border-third/30 bg-third/20 px-3 py-1 text-sm text-white backdrop-blur-sm">
                        WIP
                      </span>
                    )}

                    {/* {project.isPrivate && (
                      <span className="flex items-center gap-1 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-sm text-white backdrop-blur-sm">
                        <Lock className="h-3 w-3" />
                        Private
                      </span>
                    )} */}
                  </div>
                </div>
              </motion.div>

              {/* Content Area - This is the scrollable part */}
              <ScrollArea className="flex-grow p-6 max-h-[calc(95vh-250px)] md:max-h-[calc(95vh-200px)]">
                <div className="grid gap-6 md:grid-cols-3">
                  {/* Left Column - Main Description */}
                  <div className="md:col-span-2">
                    <motion.div variants={itemVariants} className="mb-6">
                      <h3 className="mb-2 text-lg font-semibold text-primary">
                        About this project
                      </h3>
                      <p className="leading-relaxed text-gray-700">
                        {project.longDescription}
                      </p>
                    </motion.div>

                    <motion.div
                      variants={containerVariants}
                      className="space-y-8">
                      {/* Features */}
                      {project.features && project.features.length > 0 && (
                        <motion.div variants={itemVariants}>
                          <h3 className="mb-3 text-lg font-semibold text-primary">
                            Key Features
                          </h3>
                          <ul className="space-y-2 text-gray-700">
                            {project.features.map((feature, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + index * 0.05 }}
                                className="flex items-start gap-2">
                                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                                <span>{feature}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}

                      {/* In Progress Features */}
                      {project.inProgress && project.inProgress.length > 0 && (
                        <motion.div variants={itemVariants}>
                          <h3 className="mb-3 text-lg font-semibold text-third">
                            In Progress Features
                          </h3>
                          <ul className="space-y-2 text-gray-700">
                            {project.inProgress.map((feature, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + index * 0.05 }}
                                className="flex items-start gap-2">
                                <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-third" />
                                <span>{feature}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}

                      {/* Challenges */}
                      {project.challenges && project.challenges.length > 0 && (
                        <motion.div variants={itemVariants}>
                          <h3 className="mb-3 text-lg font-semibold text-secondary">
                            Challenges & Solutions
                          </h3>
                          <ul className="space-y-2 text-gray-700">
                            {project.challenges.map((challenge, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.05 }}
                                className="flex items-start gap-2">
                                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-secondary/50 bg-secondary/10">
                                  <span className="text-xs text-secondary">
                                    {index + 1}
                                  </span>
                                </div>
                                <span>{challenge}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}

                      {/* Outcomes */}
                      {project.outcomes && project.outcomes.length > 0 && (
                        <motion.div variants={itemVariants}>
                          <h3 className="mb-3 text-lg font-semibold text-primary">
                            Outcomes
                          </h3>
                          <ul className="space-y-2 text-gray-700">
                            {project.outcomes.map((outcome, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.05 }}
                                className="flex items-start gap-2">
                                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center text-primary">
                                  <ArrowRight className="h-4 w-4" />
                                </div>
                                <span>{outcome}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}

                      {/* Room for Improvement */}
                      {project.roomForImprovement &&
                        Object.keys(project.roomForImprovement).length > 0 && (
                          <motion.div variants={itemVariants}>
                            <h3 className="mb-3 text-lg font-semibold text-secondary">
                              Room for Improvement
                            </h3>
                            <ul className="space-y-2 text-gray-700">
                              {Object.entries(project.roomForImprovement).map(
                                ([key, value], index) => (
                                  <motion.li
                                    key={key}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 + index * 0.05 }}
                                    className="flex items-start gap-2">
                                    <Target className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary" />
                                    <span>
                                      <span className="font-semibold text-secondary">
                                        {key}:
                                      </span>{" "}
                                      {value}
                                    </span>
                                  </motion.li>
                                )
                              )}
                            </ul>
                          </motion.div>
                        )}

                      {/* Awards & Recognition */}
                      {project.awards && project.awards.length > 0 && (
                        <motion.div variants={itemVariants}>
                          <h3 className="mb-3 text-lg font-semibold text-third">
                            Awards & Recognition
                          </h3>
                          <ul className="space-y-2 text-gray-700">
                            {project.awards.map((award, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.9 + index * 0.05 }}
                                className="flex items-start gap-2">
                                <div className="mt-0.5 text-third">🏆</div>
                                <span>{award}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}

                      {/* Metrics Section */}
                      {project.metrics && (
                        <motion.div variants={itemVariants}>
                          <h3 className="mb-3 text-lg font-semibold text-primary">
                            Project Metrics
                          </h3>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {project.metrics.users && (
                              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                                <div className="text-sm text-primary/80">
                                  Users
                                </div>
                                <div className="font-medium text-primary">
                                  {project.metrics.users}
                                </div>
                              </div>
                            )}
                            {project.metrics.transactions && (
                              <div className="rounded-lg border border-secondary/20 bg-secondary/5 p-3">
                                <div className="text-sm text-secondary/80">
                                  Transactions
                                </div>
                                <div className="font-medium text-secondary">
                                  {project.metrics.transactions}
                                </div>
                              </div>
                            )}
                            {project.metrics.performance && (
                              <div className="rounded-lg border border-third/20 bg-third/5 p-3">
                                <div className="text-sm text-third/80">
                                  Performance
                                </div>
                                <div className="font-medium text-third">
                                  {project.metrics.performance}
                                </div>
                              </div>
                            )}
                            {project.metrics.uptime && (
                              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                                <div className="text-sm text-primary/80">
                                  Uptime
                                </div>
                                <div className="font-medium text-primary">
                                  {project.metrics.uptime}
                                </div>
                              </div>
                            )}
                            {project.metrics.conversionRate && (
                              <div className="rounded-lg border border-secondary/20 bg-secondary/5 p-3">
                                <div className="text-sm text-secondary/80">
                                  Conversion Rate
                                </div>
                                <div className="font-medium text-secondary">
                                  {project.metrics.conversionRate}
                                </div>
                              </div>
                            )}
                            {project.metrics.loadTime && (
                              <div className="rounded-lg border border-third/20 bg-third/5 p-3">
                                <div className="text-sm text-third/80">
                                  Load Time
                                </div>
                                <div className="font-medium text-third">
                                  {project.metrics.loadTime}
                                </div>
                              </div>
                            )}
                            {project.metrics.customMetric && (
                              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                                <div className="text-sm text-primary/80">
                                  {project.metrics.customMetric.label}
                                </div>
                                <div className="font-medium text-primary">
                                  {project.metrics.customMetric.value}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {/* Impact Section */}
                      {project.impact && project.impact.length > 0 && (
                        <motion.div variants={itemVariants}>
                          <h3 className="mb-3 text-lg font-semibold text-third">
                            Impact & Results
                          </h3>
                          <ul className="space-y-2 text-gray-700">
                            {project.impact.map((impact, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.0 + index * 0.05 }}
                                className="flex items-start gap-2">
                                <div className="mt-0.5 text-third">🚀</div>
                                <span>{impact}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}

                      {/* Testimonial Section */}
                      {project.testimonial && (
                        <motion.div variants={itemVariants}>
                          <h3 className="mb-3 text-lg font-semibold text-secondary">
                            Client Testimonial
                          </h3>
                          <div className="rounded-lg border border-secondary/20 bg-secondary/5 p-4">
                            <blockquote className="mb-3 text-gray-700 italic">
                              &quot;{project.testimonial.text}&quot;
                            </blockquote>
                            <div className="text-sm">
                              <div className="font-medium text-secondary">
                                {project.testimonial.author}
                              </div>
                              <div className="text-gray-600">
                                {project.testimonial.role}
                                {project.testimonial.company &&
                                  ` at ${project.testimonial.company}`}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>

                  {/* Right Column - Technologies and Actions */}
                  <div className="border-primary/40 md:border-l  md:pl-6">
                    {/* Client Information */}
                    {project.client && (
                      <motion.div variants={itemVariants} className="mb-6">
                        <h3 className="mb-3 text-lg font-semibold text-primary">
                          Client
                        </h3>
                        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                          <div className="font-medium text-primary">
                            {project.client}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <motion.div variants={itemVariants} className="mb-6">
                      <h3 className="mb-3 text-lg font-semibold text-primary">
                        Main Technologies Used:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool, index) => {
                          const TechIcon = getTechIcon(tool.name)
                          return (
                            <motion.span
                              key={tool.name}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 + index * 0.03 }}
                              className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm text-gray-700 shadow-sm backdrop-blur-sm">
                              {TechIcon && (
                                <TechIcon className="h-4 w-4 text-primary" />
                              )}
                              {tool.name}
                            </motion.span>
                          )
                        })}
                      </div>
                    </motion.div>

                    {/* Project Stats */}
                    <motion.div variants={itemVariants} className="mb-6">
                      <h3 className="mb-3 text-lg font-semibold text-primary">
                        Project Details
                      </h3>
                      <div className="space-y-3">
                        <div className="rounded-lg border border-gray-200 bg-white/80 p-3 shadow-sm">
                          <div className="text-sm text-gray-600">Duration</div>
                          <div className="text-lg font-medium text-gray-900">
                            {project.projectDuration ||
                              (project.startDate && project.releaseDate
                                ? `${Math.ceil((new Date(project.releaseDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24))} days`
                                : "Ongoing")}
                          </div>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white/80 p-3 shadow-sm">
                          <div className="text-sm text-gray-600">Status</div>
                          <div className="text-lg font-medium text-gray-900 capitalize">
                            {project.status ||
                              (isProjectWIP(project.releaseDate)
                                ? "Work in Progress"
                                : "Completed")}
                          </div>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white/80 p-3 shadow-sm">
                          <div className="text-sm text-gray-600">Category</div>
                          <div className="text-lg font-medium text-gray-900 capitalize">
                            {project.category.replace("-", " ")}
                          </div>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white/80 p-3 shadow-sm">
                          <div className="text-sm text-gray-600">
                            Complexity
                          </div>
                          <div className="text-lg font-medium text-gray-900 capitalize">
                            {project.complexity}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                      variants={containerVariants}
                      className="mt-8 space-y-3">
                      <Button
                        asChild
                        className="w-full rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 hover:shadow-xl">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2">
                          View Live Project
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>

                      {/* Documentation URL Button */}
                      {project.documentationUrl && (
                        <Button
                          asChild
                          variant="outline"
                          className="w-full rounded-full border-secondary bg-white text-secondary shadow-sm hover:bg-secondary hover:text-white">
                          <a
                            href={project.documentationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2">
                            📚 Documentation
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}

                      {/* Demo Video URL Button */}
                      {project.demoVideoUrl && (
                        <Button
                          asChild
                          variant="outline"
                          className="w-full rounded-full border-third bg-white text-third shadow-sm hover:bg-third hover:text-white">
                          <a
                            href={project.demoVideoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2">
                            🎥 Demo Video
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}

                    
                    </motion.div>
                  </div>
                </div>

                {/* Add some bottom padding for better scrolling experience */}
                <div className="h-6"></div>
              </ScrollArea>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
