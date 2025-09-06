import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    title: "Posso Mushrooms Shop",
    url: "https://www.possomushrooms.shop/",
    screenshot: "/posso-mushrooms.png",
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
    url: "https://caterclassic-ordering-app.vercel.app",
    screenshot: "/caterclassic.png",
    description: "A modern web app for seamless food ordering and catering services.",
    isFeatured: true,
    releaseDate: "2024-03-01",
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