"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Code2,
  Smartphone,
  Radio,
  Rocket,
  Brain,
  CheckCircle2,
  Timer,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import type { JSX } from "react";

interface Goal {
  id: number;
  title: string;
  description: string;
  category: "learning" | "development" | "open-source";
  status: "planned" | "in-progress" | "completed";
  timeline: string;
  icon: JSX.Element;
  technologies?: string[];
}

const goals: Goal[] = [
  {
    id: 1,
    title: "Master Vue.js Ecosystem",
    description:
      "Deep dive into Vue 3, Vuex, Vue Router, and Nuxt.js. Build real-world applications to solidify knowledge.",
    category: "learning",
    status: "planned",
    timeline: "Q1 2025",
    icon: <Radio className="w-5 h-5" />,
    technologies: ["Vue.js", "Nuxt.js", "Vuex"],
  },
  {
    id: 2,
    title: "Explore Vite & Astro",
    description:
      "Learn and implement projects using Vite for fast development and Astro for content-focused websites.",
    category: "learning",
    status: "in-progress",
    timeline: "Q1-Q2 2025",
    icon: <Rocket className="w-5 h-5" />,
    technologies: ["Vite", "Astro"],
  },
  {
    id: 3,
    title: "Backend Evolution with NestJS & Hono",
    description:
      "Enhance backend development skills with NestJS framework and explore Hono for edge computing.",
    category: "learning",
    status: "planned",
    timeline: "Q2 2025",
    icon: <Brain className="w-5 h-5" />,
    technologies: ["NestJS", "HonoJS"],
  },
  {
    id: 4,
    title: "First Mobile App",
    description:
      "Develop and publish first cross-platform mobile application for Android & iOS using React Native.",
    category: "development",
    status: "planned",
    timeline: "Q2-Q3 2025",
    icon: <Smartphone className="w-5 h-5" />,
    technologies: ["React Native", "Expo"],
  },
  {
    id: 5,
    title: "DentRW V2",
    description:
      "Rebuild DentRW with enhanced features, better UI/UX, and modern tech stack. Open source the project.",
    category: "open-source",
    status: "planned",
    timeline: "Q3 2025",
    icon: <Code2 className="w-5 h-5" />,
    technologies: ["Next.js", "TailwindCSS", "TypeScript"],
  },
];

const categoryColors = {
  learning: "bg-blue-500",
  development: "bg-purple-500",
  "open-source": "bg-emerald-500",
};

const statusIcons = {
  planned: <Timer className="w-4 h-4" />,
  "in-progress": <ArrowRight className="w-4 h-4" />,
  completed: <CheckCircle2 className="w-4 h-4" />,
};

export default function RoadmapPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredGoals = selectedCategory
    ? goals.filter((goal) => goal.category === selectedCategory)
    : goals;

  const calculateProgress = () => {
    const completed = goals.filter(
      (goal) => goal.status === "completed",
    ).length;
    return (completed / goals.length) * 100;
  };

  return (
    <div className="relative min-h-screen bg-[#002922] text-white">
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
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent sm:text-5xl"
          >
            2025 Roadmap
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-emerald-300/60"
          >
            Tracking my journey through learning, development, and open-source
            contributions
          </motion.p>

          {/* Overall Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 max-w-md mx-auto"
          >
            <div className="flex justify-between text-sm text-emerald-400 mb-2">
              <span>Overall Progress</span>
              <span>{Math.round(calculateProgress())}%</span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
          </motion.div>
        </div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Badge
            variant="outline"
            className={`cursor-pointer px-4 py-2 text-sm ${
              !selectedCategory ? "bg-emerald-500/20 border-emerald-500" : ""
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Badge>
          {Object.keys(categoryColors).map((category) => (
            <Badge
              key={category}
              variant="outline"
              className={`cursor-pointer px-4 py-2 text-sm ${
                selectedCategory === category
                  ? "bg-emerald-500/20 border-emerald-500"
                  : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
          ))}
        </motion.div>

        {/* Goals Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredGoals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-950/90 to-emerald-900/40 backdrop-blur-xl border border-emerald-500/10 hover:border-emerald-500/30 transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative p-6 space-y-4">
                {/* Category Badge */}
                <Badge
                  className={`${
                    categoryColors[goal.category]
                  } text-white border-none px-2 py-0.5 text-xs uppercase tracking-wider`}
                >
                  {goal.category}
                </Badge>

                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    {goal.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-400">
                      {goal.title}
                    </h3>
                    <p className="text-sm text-emerald-300/60">
                      {goal.timeline}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-white/80">{goal.description}</p>

                {/* Technologies */}
                {goal.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {goal.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full bg-emerald-950/50 text-emerald-400 border border-emerald-500/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Status */}
                <div className="flex items-center gap-2 text-sm">
                  <div className="text-emerald-400">
                    {statusIcons[goal.status]}
                  </div>
                  <span className="text-emerald-300/60 capitalize">
                    {goal.status}
                  </span>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent blur-xl" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
