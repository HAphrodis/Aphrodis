import {
  Code,
  Palette,
  BookOpen,
  Briefcase,
  Lightbulb,
  Layers,
  Terminal,
  ImageIcon,
  FileCode,
  Cpu,
  Music,
  Video,
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiVercel,
  SiGithub,
  SiFigma,
  SiNotion,
  SiFramer,
} from "react-icons/si";
import type { Bookmark } from "@/types/bookmark";

export const bookmarks: Bookmark[] = [
  // Development Tools
  {
    title: "GitHub",
    url: "https://github.com",
    description: "Where I host my code and collaborate with other developers",
    category: "Development",
    icon: SiGithub,
  },
  {
    title: "Vercel",
    url: "https://vercel.com",
    description: "My go-to platform for deploying web applications",
    category: "Development",
    icon: SiVercel,
  },
  {
    title: "CodeSandbox",
    url: "https://codesandbox.io",
    description: "Online code editor for quick prototyping and sharing",
    category: "Development",
    icon: Code,
  },
  {
    title: "Stack Overflow",
    url: "https://stackoverflow.com",
    description: "Where I find solutions to coding problems",
    category: "Development",
    icon: Terminal,
  },

  // Design Tools
  {
    title: "Figma",
    url: "https://figma.com",
    description: "My primary design tool for UI/UX work",
    category: "Design",
    icon: SiFigma,
  },
  {
    title: "Dribbble",
    url: "https://dribbble.com",
    description: "Where I find design inspiration",
    category: "Design",
    icon: Palette,
  },
  {
    title: "Coolors",
    url: "https://coolors.co",
    description: "Color scheme generator for my projects",
    category: "Design",
    icon: Palette,
  },
  {
    title: "Unsplash",
    url: "https://unsplash.com",
    description: "High-quality free stock photos for my projects",
    category: "Design",
    icon: ImageIcon,
  },

  // Productivity
  {
    title: "Notion",
    url: "https://notion.so",
    description: "Where I organize my projects and take notes",
    category: "Productivity",
    icon: SiNotion,
  },
  {
    title: "Trello",
    url: "https://trello.com",
    description: "Visual tool for managing my projects and tasks",
    category: "Productivity",
    icon: Layers,
  },
  {
    title: "Calendly",
    url: "https://calendly.com",
    description: "Scheduling tool for meetings and appointments",
    category: "Productivity",
    icon: Briefcase,
  },

  // Learning Resources
  {
    title: "freeCodeCamp",
    url: "https://www.freecodecamp.org",
    description: "Where I learned the fundamentals of web development",
    category: "Learning",
    icon: BookOpen,
  },
  {
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    description: "My go-to reference for web technologies",
    category: "Learning",
    icon: FileCode,
  },
  {
    title: "React Docs",
    url: "https://react.dev",
    description: "Official documentation for React",
    category: "Learning",
    icon: SiReact,
  },
  {
    title: "Next.js Docs",
    url: "https://nextjs.org/docs",
    description: "Official documentation for Next.js",
    category: "Learning",
    icon: SiNextdotjs,
  },
  {
    title: "Tailwind CSS Docs",
    url: "https://tailwindcss.com/docs",
    description: "Official documentation for Tailwind CSS",
    category: "Learning",
    icon: SiTailwindcss,
  },

  // Frameworks & Libraries
  {
    title: "React",
    url: "https://react.dev",
    description: "A JavaScript library for building user interfaces",
    category: "Frameworks",
    icon: SiReact,
  },
  {
    title: "Next.js",
    url: "https://nextjs.org",
    description: "The React framework for production",
    category: "Frameworks",
    icon: SiNextdotjs,
  },
  {
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "A utility-first CSS framework",
    category: "Frameworks",
    icon: SiTailwindcss,
  },
  {
    title: "Framer Motion",
    url: "https://www.framer.com/motion",
    description: "A production-ready motion library for React",
    category: "Frameworks",
    icon: SiFramer,
  },

  // AI Tools
  {
    title: "ChatGPT",
    url: "https://chat.openai.com",
    description: "AI assistant that helps me with coding and content creation",
    category: "AI Tools",
    icon: Lightbulb,
  },
  {
    title: "Midjourney",
    url: "https://www.midjourney.com",
    description: "AI image generation for creative projects",
    category: "AI Tools",
    icon: ImageIcon,
  },
  {
    title: "Vercel AI SDK",
    url: "https://sdk.vercel.ai/docs",
    description: "Tools for building AI-powered applications",
    category: "AI Tools",
    icon: Cpu,
  },

  // Entertainment
  {
    title: "Spotify",
    url: "https://open.spotify.com",
    description: "Where I find music to code to",
    category: "Entertainment",
    icon: Music,
  },
  {
    title: "YouTube",
    url: "https://www.youtube.com",
    description: "Where I watch coding tutorials and tech reviews",
    category: "Entertainment",
    icon: Video,
  },
  {
    title: "Netflix",
    url: "https://www.netflix.com",
    description: "My go-to streaming service for movies and shows",
    category: "Entertainment",
    icon: Video,
  },
];
