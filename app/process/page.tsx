"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Code2,
  Workflow,
  GitBranch,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Boxes,
  Puzzle,
} from "lucide-react";

const processes = [
  {
    id: 1,
    title: "Discovery & Planning",
    description:
      "Understanding requirements, defining scope, and creating a roadmap for successful project delivery.",
    icon: <Brain className="w-6 h-6" />,
    steps: [
      "Requirement Analysis",
      "User Research",
      "Technical Feasibility",
      "Project Timeline",
      "Resource Planning",
    ],
    tools: ["Notion", "Miro", "Figma", "Draw.io"],
  },
  {
    id: 2,
    title: "Design & Architecture",
    description:
      "Creating scalable solutions with modern architecture patterns and best practices.",
    icon: <Boxes className="w-6 h-6" />,
    steps: [
      "System Design",
      "Database Schema",
      "API Design",
      "UI/UX Wireframes",
      "Component Architecture",
    ],
    tools: ["Figma", "Draw.io", "Excalidraw", "Storybook"],
  },
  {
    id: 3,
    title: "Development Workflow",
    description:
      "Structured approach to writing clean, maintainable, and scalable code.",
    icon: <Workflow className="w-6 h-6" />,
    steps: [
      "Feature Branch Workflow",
      "Test-Driven Development",
      "Code Review Process",
      "CI/CD Pipeline",
      "Documentation",
    ],
    tools: ["Git", "GitHub", "Jest", "GitHub Actions"],
  },
  {
    id: 4,
    title: "Problem-Solving Framework",
    description:
      "Systematic approach to tackling complex technical challenges and debugging issues.",
    icon: <Puzzle className="w-6 h-6" />,
    steps: [
      "Problem Analysis",
      "Solution Design",
      "Implementation",
      "Testing & Validation",
      "Optimization",
    ],
    tools: ["Chrome DevTools", "Postman", "VS Code", "LogRocket"],
  },
];

const technologies = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "TailwindCSS"],
    icon: <Code2 className="w-5 h-5" />,
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
    icon: <GitBranch className="w-5 h-5" />,
  },
  {
    category: "DevOps",
    items: ["Git", "Docker", "Vercel", "GitHub Actions"],
    icon: <Rocket className="w-5 h-5" />,
  },
  {
    category: "Testing",
    items: ["Jest", "React Testing Library", "Cypress", "Postman"],
    icon: <CheckCircle2 className="w-5 h-5" />,
  },
];

export default function ProcessPage() {
  const [hoveredProcess, setHoveredProcess] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen bg-[#002922] text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(4,120,87,0.1),transparent_70%)]" />
      <motion.div
        initial={{ backgroundPositionY: "0%" }}
        animate={{ backgroundPositionY: "100%" }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25px 25px, rgba(4, 120, 87, 0.15) 2%, transparent 0%)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 bg-clip-text text-transparent sm:text-6xl"
          >
            Process & Methodology
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-emerald-300/60 max-w-2xl mx-auto"
          >
            A systematic approach to building robust, scalable, and user-centric
            solutions
          </motion.p>
        </div>

        {/* Process Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {processes.map((process, index) => (
            <motion.div
              key={process.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredProcess(process.id)}
              onHoverEnd={() => setHoveredProcess(null)}
            >
              <Card className="group relative overflow-hidden border-emerald-500/10 bg-emerald-950/40 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                      {process.icon}
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-emerald-400">
                        {process.title}
                      </CardTitle>
                      <CardDescription className="text-emerald-300/60 mt-1">
                        {process.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Process Steps */}
                  <div className="space-y-3">
                    {process.steps.map((step, stepIndex) => (
                      <motion.div
                        key={step}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay:
                            hoveredProcess === process.id ? stepIndex * 0.1 : 0,
                        }}
                      >
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-sm">
                          {stepIndex + 1}
                        </div>
                        <ArrowRight className="w-4 h-4 text-emerald-500/40" />
                        <span className="text-emerald-100/80">{step}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Tools */}
                  <div className="flex flex-wrap gap-2">
                    {process.tools.map((tool) => (
                      <Badge
                        key={tool}
                        variant="outline"
                        className="border-emerald-500/20 text-emerald-400 hover:border-emerald-500/40"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Technologies Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-center text-emerald-400 mb-8">
            Tech Stack & Tools
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="p-6 rounded-xl border border-emerald-500/10 bg-emerald-950/40 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    {tech.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-emerald-400">
                    {tech.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tech.items.map((item) => (
                    <Badge
                      key={item}
                      className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
