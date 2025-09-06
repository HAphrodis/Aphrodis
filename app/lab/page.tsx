"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Code2,
  Rocket,
  Sparkles,
  Zap,
  Search,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import PageHeader from "@/components/shared/page-header";

interface Project {
  id: number;
  title: string;
  description: string;
  category: "demo" | "experiment" | "snippet" | "exploration";
  tags: string[];
  demoUrl?: string;
  sourceUrl?: string;
  image?: string;
  status: "completed" | "in-progress" | "experimental";
}

const projects: Project[] = [
  {
    id: 1,
    title: "3D Card Hover Effect",
    description:
      "Interactive card with dynamic 3D rotation based on mouse position using vanilla JavaScript.",
    category: "demo",
    tags: ["JavaScript", "CSS", "3D Transform"],
    demoUrl: "https://codepen.io/yourusername/pen/xyz",
    sourceUrl: "https://github.com/yourusername/3d-card",
    image: "/cover.jpg",
    status: "completed",
  },
  {
    id: 2,
    title: "WebGL Particle System",
    description:
      "Experimenting with WebGL to create an interactive particle system with physics simulation.",
    category: "experiment",
    tags: ["WebGL", "Three.js", "JavaScript"],
    demoUrl: "https://codepen.io/yourusername/pen/abc",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Custom React Hooks Collection",
    description:
      "A collection of useful custom React hooks for common UI patterns and functionality.",
    category: "snippet",
    tags: ["React", "TypeScript", "Hooks"],
    sourceUrl: "https://github.com/yourusername/react-hooks",
    status: "completed",
  },
  {
    id: 4,
    title: "Web Audio Visualizer",
    description:
      "Exploring the Web Audio API to create real-time audio visualization effects.",
    category: "exploration",
    tags: ["Web Audio API", "Canvas", "JavaScript"],
    status: "experimental",
  },
];

const categoryIcons = {
  demo: <Rocket className="w-4 h-4" />,
  experiment: <Sparkles className="w-4 h-4" />,
  snippet: <Code2 className="w-4 h-4" />,
  exploration: <Zap className="w-4 h-4" />,
};

const statusColors = {
  completed: "bg-emerald-500",
  "in-progress": "bg-blue-500",
  experimental: "bg-purple-500",
};

export default function LabPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative min-h-screen bg-[#002922] text-white">
      <PageHeader
        title="Lab & Playground"
        subtitle="A collection of experiments, demos, and code snippets exploring various web technologies"
      />

      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(4,120,87,0.1),transparent_70%)]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25px 25px, rgba(4, 120, 87, 0.15) 2%, transparent 0%)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Header */}

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500/60" />
            <Input
              type="text"
              placeholder="Search projects, technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-emerald-950/50 border-emerald-500/20 text-emerald-100 placeholder:text-emerald-500/60"
            />
          </div>

          <Tabs
            defaultValue="all"
            className="w-full"
            onValueChange={setSelectedCategory}
          >
            <TabsList className="w-full max-w-2xl mx-auto bg-emerald-950/50 border border-emerald-500/20">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-emerald-500 data-[state=active]:text-emerald-950"
              >
                All
              </TabsTrigger>
              {Object.entries(categoryIcons).map(([category, icon]) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-emerald-500 data-[state=active]:text-emerald-950"
                >
                  <span className="flex items-center gap-2">
                    {icon}
                    <span className="capitalize">{category}</span>
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group relative overflow-hidden border-emerald-500/10 bg-emerald-950/40 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300">
                  {project.image && (
                    <div className="relative aspect-video overflow-hidden rounded-t-lg">
                      <Image
                        width={800}
                        height={800}
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 to-transparent" />
                    </div>
                  )}

                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge
                        className={cn(
                          "px-2 py-0.5 text-white border-none",
                          statusColors[project.status],
                        )}
                      >
                        {project.status}
                      </Badge>
                      <div className="flex items-center gap-1 text-emerald-500">
                        {categoryIcons[project.category]}
                        <span className="text-xs capitalize">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-xl text-emerald-400">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-emerald-300/60">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-emerald-500/20 text-emerald-400 hover:border-emerald-500/40"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="flex gap-3">
                    {project.demoUrl && (
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
                        asChild
                      >
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Demo
                        </a>
                      </Button>
                    )}
                    {project.sourceUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/40"
                        asChild
                      >
                        <a
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaGithub className="w-4 h-4 mr-2" />
                          Source Code
                        </a>
                      </Button>
                    )}
                  </CardFooter>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-emerald-400"
          >
            No projects found matching your criteria.
          </motion.div>
        )}
      </div>
    </div>
  );
}
