import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    title: "Aphrodis's Portfolio",
    url: "https://www.aphrodis.online/",
    screenshot: "/screenshot.png",
    description: "An e-commerce platform for fresh mushrooms and mushroom products.",
    isFeatured: true,
    releaseDate: "2024-01-01",
    tech: [
      { name: "TypeScript" },
      { name: "MongoDB" },
      { name: "Cloudinary" },
      { name: "Node.js" },
      { name: "Figma" },
      { name: "Render" },
    ],
  },
  {
    title: "CaterClassic Ordering App",
    url: "https://aphrodis-murex.vercel.app",
    screenshot: "/screenshot.png",
    description: "A modern web app for seamless food ordering and catering services.",
    isFeatured: true,
    releaseDate: "2025-09-15",
    tech: [
      { name: "JavaScript" },
      { name: "MongoDB" },
      { name: "Cloudinary" },
      { name: "Node.js" },
      { name: "Figma" },
      { name: "Render" },
    ],
  },
];