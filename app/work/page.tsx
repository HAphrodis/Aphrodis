"use client"

import { useMemo, useState } from "react"
import { projects } from "@/constants/projects"
import { AnimatePresence, motion } from "framer-motion"
import { Filter, Search, X } from "lucide-react"

import type {
  Project,
  ProjectCategory,
  ProjectComplexity,
  ProjectStatus,
} from "@/types/project"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ParticlesBackground } from "@/components/shared/particles-background"
import { ProjectCard } from "@/components/work/project-card"
import { ProjectDetailsDialog } from "@/components/work/project-details-dialog"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<
    ProjectCategory | "all"
  >("all")
  const [selectedComplexity, setSelectedComplexity] = useState<
    ProjectComplexity | "all"
  >("all")
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | "all">(
    "all"
  )

  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tools.some((tool) =>
          tool.name.toLowerCase().includes(searchTerm.toLowerCase())
        )

      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory
      const matchesComplexity =
        selectedComplexity === "all" ||
        project.complexity === selectedComplexity
      const matchesStatus =
        selectedStatus === "all" || project.status === selectedStatus

      return (
        matchesSearch && matchesCategory && matchesComplexity && matchesStatus
      )
    })
  }, [searchTerm, selectedCategory, selectedComplexity, selectedStatus])

  const categories = Array.from(new Set(projects.map((p) => p.category)))
  const complexities = Array.from(new Set(projects.map((p) => p.complexity)))
  const statuses = Array.from(
    new Set(projects.map((p) => p.status).filter(Boolean))
  ) as ProjectStatus[]

  const handleOpenProjectDetails = (project: Project) => {
    setSelectedProject(project)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSelectedComplexity("all")
    setSelectedStatus("all")
  }

  const hasActiveFilters = useMemo(() => {
    return (
      searchTerm !== "" ||
      selectedCategory !== "all" ||
      selectedComplexity !== "all" ||
      selectedStatus !== "all"
    )
  }, [searchTerm, selectedCategory, selectedComplexity, selectedStatus])

  const getActiveFilters = useMemo(() => {
    const filters = []
    if (selectedCategory !== "all")
      filters.push({
        type: "category",
        value: selectedCategory,
        label: selectedCategory.replace("-", " "),
      })
    if (selectedComplexity !== "all")
      filters.push({
        type: "complexity",
        value: selectedComplexity,
        label: selectedComplexity,
      })
    if (selectedStatus !== "all")
      filters.push({
        type: "status",
        value: selectedStatus,
        label: selectedStatus.replace("-", " "),
      })
    return filters
  }, [selectedCategory, selectedComplexity, selectedStatus])

  const clearFilter = (type: string) => {
    switch (type) {
      case "category":
        setSelectedCategory("all")
        break
      case "complexity":
        setSelectedComplexity("all")
        break
      case "status":
        setSelectedStatus("all")
        break
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-secondary/10">
      
      <ParticlesBackground />
      {/* Creative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Shapes */}
        <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div
          className="absolute top-1/4 -right-16 h-32 w-32 rounded-full bg-secondary/15 blur-2xl animate-bounce"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 h-24 w-24 rounded-full bg-third/20 blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 h-28 w-28 rounded-full bg-primary/8 blur-2xl animate-bounce"
          style={{ animationDuration: "4s", animationDelay: "2s" }}
        />

        {/* Geometric Patterns */}
        <div
          className="absolute top-20 left-1/3 h-16 w-16 rotate-45 bg-gradient-to-br from-secondary/20 to-transparent blur-sm animate-spin"
          style={{ animationDuration: "20s" }}
        />
        <div className="absolute bottom-40 right-1/4 h-12 w-12 rotate-12 bg-gradient-to-tr from-third/25 to-transparent blur-sm animate-pulse" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#00996608_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 pb-20 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-8 pt-16">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold text-primary">
                Projects Overview
              </h2>
              <p className="text-sm text-slate-600">
                {filteredProjects.length} of {projects.length} projects
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Filters Popover */}
              <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="default"
                    size="sm"
                    className="border-primary bg-primary text-white hover:bg-primary/90 shadow-lg">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                    {hasActiveFilters && (
                      <Badge
                        variant="secondary"
                        className="ml-2 h-4 w-4 bg-white/20 p-0 text-xs text-white">
                        {getActiveFilters.length}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96 border-slate-200 bg-white/95 p-0 backdrop-blur-xl shadow-xl">
                  <ScrollArea className="h-auto max-h-[500px]">
                    <div className="p-4">
                      <div className="mb-6 flex items-center justify-between">
                        <h3 className="font-semibold text-primary">
                          Filter Projects
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsFiltersOpen(false)}
                          className="h-6 w-6 p-0 text-slate-400 hover:text-primary">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Filter Sections */}
                      <div className="space-y-6">
                        {/* Category Filters */}
                        <div>
                          <label className="mb-3 block text-sm font-medium text-slate-700">
                            Category
                          </label>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant={
                                selectedCategory === "all"
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() => setSelectedCategory("all")}
                              className={
                                selectedCategory === "all"
                                  ? "h-8 bg-primary text-xs text-white hover:bg-primary/90"
                                  : "h-8 border-slate-200 text-xs text-slate-600 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                              }>
                              All
                            </Button>
                            {categories.map((category) => (
                              <Button
                                key={category}
                                variant={
                                  selectedCategory === category
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                                className={
                                  selectedCategory === category
                                    ? "h-8 bg-primary text-xs text-white hover:bg-primary/90"
                                    : "h-8 border-slate-200 text-xs text-slate-600 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                                }>
                                {category.replace("-", " ")}
                              </Button>
                            ))}
                          </div>
                        </div>

                        {/* Complexity & Status */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="mb-3 block text-sm font-medium text-slate-700">
                              Complexity
                            </label>
                            <div className="space-y-2">
                              <Button
                                variant={
                                  selectedComplexity === "all"
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => setSelectedComplexity("all")}
                                className={`h-8 w-full justify-start text-xs ${
                                  selectedComplexity === "all"
                                    ? "bg-primary text-white hover:bg-primary/90"
                                    : "border-slate-200 text-slate-600 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                                }`}>
                                All
                              </Button>
                              {complexities.map((complexity) => (
                                <Button
                                  key={complexity}
                                  variant={
                                    selectedComplexity === complexity
                                      ? "default"
                                      : "outline"
                                  }
                                  size="sm"
                                  onClick={() =>
                                    setSelectedComplexity(complexity)
                                  }
                                  className={`h-8 w-full justify-start text-xs ${
                                    selectedComplexity === complexity
                                      ? "bg-primary text-white hover:bg-primary/90"
                                      : "border-slate-200 text-slate-600 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                                  }`}>
                                  {complexity}
                                </Button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="mb-3 block text-sm font-medium text-slate-700">
                              Status
                            </label>
                            <div className="space-y-2">
                              <Button
                                variant={
                                  selectedStatus === "all"
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => setSelectedStatus("all")}
                                className={`h-8 w-full justify-start text-xs ${
                                  selectedStatus === "all"
                                    ? "bg-primary text-white hover:bg-primary/90"
                                    : "border-slate-200 text-slate-600 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                                }`}>
                                All
                              </Button>
                              {statuses.map((status) => (
                                <Button
                                  key={status}
                                  variant={
                                    selectedStatus === status
                                      ? "default"
                                      : "outline"
                                  }
                                  size="sm"
                                  onClick={() => setSelectedStatus(status)}
                                  className={`h-8 w-full justify-start text-xs ${
                                    selectedStatus === status
                                      ? "bg-primary text-white hover:bg-primary/90"
                                      : "border-slate-200 text-slate-600 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                                  }`}>
                                  {status.replace("-", " ")}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Featured Toggle & Actions */}
                        <div className="space-y-3 border-t border-slate-200 pt-4">
                          <Button
                            size="sm"
                            onClick={clearFilters}
                            className="h-8 w-full text-xs ">
                            Clear All Filters
                          </Button>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-slate-200 bg-white/80 pl-10 text-slate-700 placeholder:text-slate-400 focus:border-primary/40 focus:ring-primary/20 shadow-sm backdrop-blur-sm"
              />
            </div>
          </div>

          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-slate-600">Active filters:</span>
                {getActiveFilters.map((filter, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
                    onClick={() => clearFilter(filter.type)}>
                    {filter.label}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-6 px-2 text-xs text-slate-500 hover:text-slate-700">
                  Clear all
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mx-auto">
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              <motion.div
                key="projects-grid"
                variants={containerVariants}
                className="flex flex-col gap-16">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.title}
                    {...project}
                    index={index}
                    onViewDetails={() => handleOpenProjectDetails(project)}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="py-16 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 p-4">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-primary">
                  No projects found
                </h3>
                <p className="mb-6 text-slate-600">
                  Try adjusting your filters or search terms
                </p>
                <Button
                  onClick={clearFilters}
                  className="bg-primary text-white hover:bg-primary/90 shadow-lg">
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectDetailsDialog
        project={selectedProject}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </div>
  )
}
