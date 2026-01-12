// constants/projects-refined.ts
import type { Project } from "@/types/project";

export const projects: Project[] = [
  
  {
    title: "HPO Rwanda - Health Promotion Website",
    category: "ngo-nonprofit",
    complexity: "medium",
    startDate: "2025-06-12",
    releaseDate: "2025-09-05",
    projectDuration: "85 days",
    teamSize: 2,
    url: "https://www.hporwanda.org",
    githubUrl: "https://github.com/hporwanda/hporwanda-website",
    screenshot: "/projects/hporwanda.jpg",
    description:
      "Digital platform for youth-led NGO promoting health, nutrition, SRHR, and environmental sustainability across Rwanda.",
    client: "Health Promotion Organization (HPO) Rwanda",
    keyTechnologies: ["Next.js", "TanStack Query", "Motion", "TypeScript"],
    team: [
      {
        name: "Ishimwe Jean Baptiste",
        role: "Full Stack Developer & Project Lead",
        email: "ijbapte@gmail.com",
        githubUrl: "https://github.com/hbapte",
        profileUrl: "https://www.hbapte.me",
        linkedInUrl: "https://www.linkedin.com/in/hbapte",
      },
      {
        name: "Hakuzweyezu Aphrodis",
        role: "Frontend Developer",
        githubUrl: "https://github.com/HAphrodis",
        email: "possowiba01@gmail.com",
        linkedInUrl:
          "https://www.linkedin.com/in/aphrodis-hakuzweyezu-675677304",
      },
    ],
    tools: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "TailwindCSS" },
      { name: "Motion" },
      { name: "TanStack Query" },
      { name: "Radix UI" },
    ],
    features: [
      "🎯 Mission-driven storytelling with impact metrics",
      "📱 Mobile-first responsive design",
      "🎮 Interactive Cards Game launch showcase",
      "🤝 Partnership and donation call-to-actions",
      "📊 SDG alignment and progress tracking",
      "🌍 Multi-program showcase (SRHR, NCD prevention)",
    ],
    // metrics: {
    //   users: "8,000+ monthly visitors",
    //   customMetric: {
    //     label: "Program Participants",
    //     value: "2,000+ reached",
    //   },
    // },
    // impact: [
    //   "Increased program visibility by 250%",
    //   "Facilitated partnerships with 15+ organizations",
    //   "Enhanced community engagement across Kigali",
    // ],
    outcomes: [
      "Created compelling digital presence for HPO Rwanda",
      "Facilitated public engagement through clear navigation",
      "Set scalable foundation for future enhancements",
    ],
    isPrivate: true,
    isFeatured: false,
  },

  {
    title: "URPHSA - University Association Website",
    category: "ngo-nonprofit",
    complexity: "complex",
    startDate: "2025-01-11",
    releaseDate: "2025-04-26",
    projectDuration: "105 days",
    teamSize: 2,
    url: "https://www.urphsa.org/",
    githubUrl: "https://github.com/hbaptee/urphsa-v2",
    screenshot: "/projects/urphsa.jpg",
    description:
      "Comprehensive platform for University of Rwanda Public Health Student Association with admin panel, blog management, and member engagement features.",
    client: "University of Rwanda - Public Health Student Association",
    keyTechnologies: ["Next.js", "MongoDB", "Hygraph CMS", "Redis", "Resend"],
    tools: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "TailwindCSS" },
      { name: "MongoDB" },
      { name: "Redis" },
      { name: "Hygraph" },
      { name: "Resend" },
      { name: "Sentry" },
      { name: "Better Stack" },
    ],
    team: [
      {
        name: "Ishimwe Jean Baptiste",
        role: "Full Stack Developer & Project Lead",
        email: "ijbapte@gmail.com",
        githubUrl: "https://github.com/hbapte",
        profileUrl: "https://www.hbapte.me",
        linkedInUrl: "https://www.linkedin.com/in/hbapte",
      },
      {
        name: "Hakuzweyezu Aphrodis",
        role: "Fullstack Developer",
        githubUrl: "https://github.com/HAphrodis",
        email: "possowiba01@gmail.com",
        linkedInUrl:
          "https://www.linkedin.com/in/aphrodis-hakuzweyezu-675677304",
      },
    ],
    features: [
      "📚 Dynamic blog system with category management",
      "👥 Committee member profiles and organizational structure",
      "📊 Admin dashboard for content and subscriber management",
      "📧 Newsletter system with automated campaigns",
      "🖼️ Dynamic gallery for events and activities",
      "📱 Mobile-optimized responsive design",
      "🔍 SEO optimization with structured data",
      "⚡ Redis-powered caching and rate limiting",
    ],
    // metrics: {
    //   users: "3,000+ student members",
    //   performance: "98+ Lighthouse score",
    //   customMetric: {
    //     label: "Blog Engagement",
    //     value: "500+ monthly readers",
    //   },
    // },
    // impact: [
    //   "Centralized communication for 3,000+ students",
    //   "Streamlined organizational management by 80%",
    //   "Enhanced public health advocacy reach",
    // ],
    outcomes: [
      "Delivered modern online presence for URPHSA",
      "Enabled centralized communication of initiatives",
      "Streamlined content management workflows",
    ],
    isPrivate: true,
    isFeatured: true,
  },

  {
    title: "ACGL Group Ltd - Corporate Website",
    category: "corporate",
    complexity: "medium",
    startDate: "2025-01-18",
    releaseDate: "2025-03-10",
    projectDuration: "52 days",
    teamSize: 2,
    url: "https://acgl-group-ltd.vercel.app",
    githubUrl: "https://github.com/hbapte/acgl-group-ltd",
    screenshot: "/projects/acgl.jpg",
    description:
      "Modern corporate website for architecture, construction, geo-mapping, and property services company with quote request system.",
    client: "ACGL Group Ltd",
    keyTechnologies: ["Next.js", "MongoDB", "Resend", "Motion"],
    team: [
      {
        name: "Ishimwe Jean Baptiste",
        role: "Full Stack Developer & Project Lead",
        email: "ijbapte@gmail.com",
        githubUrl: "https://github.com/hbapte",
        profileUrl: "https://www.hbapte.me",
        linkedInUrl: "https://www.linkedin.com/in/hbapte",
      },
      {
        name: "Hakuzweyezu Aphrodis",
        role: "Frontend Developer",
        githubUrl: "https://github.com/HAphrodis",
        email: "possowiba01@gmail.com",
        linkedInUrl:
          "https://www.linkedin.com/in/aphrodis-hakuzweyezu-675677304",
      },
    ],
    tools: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "TailwindCSS" },
      { name: "Motion" },
      { name: "MongoDB" },
      { name: "Resend" },
      { name: "Zustand" },
    ],
    features: [
      "🏗️ Comprehensive service pages (Architecture, Construction, Geo-Mapping)",
      "💼 Professional quote request system",
      "📧 Automated client communication via Resend",
      "🎨 Smooth animations and professional design",
      "📱 Mobile-optimized responsive layout",
      "🔍 SEO-friendly structure and content",
    ],
    // metrics: {
    //   customMetric: {
    //     label: "Quote Requests",
    //     value: "100+ monthly inquiries",
    //   },
    // },
    // impact: [
    //   "Improved online visibility for construction services",
    //   "Streamlined client inquiry process by 90%",
    //   "Enhanced professional brand credibility",
    // ],
    outcomes: [
      "Successfully launched professional corporate website",
      "Improved ACGL Group's online visibility and outreach",
      "Delivered scalable platform for future enhancements",
    ],
    isPrivate: true,
  },
  // Legacy projects with updated structure
  {
    title: "La Prima Coffee Shop Website",
    category: "corporate",
    complexity: "complex",
    startDate: "2024-08-14",
    releaseDate: "2024-09-03",
    projectDuration: "20 days",
    teamSize: 1,
    url: "https://www.laprimaltd.com",
    githubUrl: "https://github.com/HAphrodis/La-prima-ltd",
    screenshot: "/projects/laprimaa.jpg",
    description:
      "Full-featured coffee shop platform with online ordering, table booking, real-time tracking, and admin dashboard.",
    client: "La Prima Coffee Shop, Muhanga District",
    keyTechnologies: ["Next.js", "MongoDB", "Socket.io", "Auth.js"],
    tools: [
      { name: "Next.js" },
      { name: "MongoDB" },
      { name: "Socket.io" },
      { name: "Auth.js" },
      { name: "Cloudinary" },
      { name: "TailwindCSS" },
    ],
    features: [
      "☕ Dynamic menu with real-time pricing",
      "🛒 Online ordering with cart management",
      "📅 Table booking with availability checks",
      "📊 Admin dashboard with analytics",
      "🔔 Real-time order tracking via Socket.io",
      "🧾 Invoice generation with PDF export",
    ],
    // metrics: {
    //   customMetric: {
    //     label: "Orders Processed",
    //     value: "1,000+ monthly",
    //   },
    // },
    // impact: [
    //   "Digitized coffee shop operations completely",
    //   "Increased online orders by 200%",
    //   "Improved customer satisfaction through real-time updates",
    // ],
    outcomes: [
      "Delivered fully functional ordering platform",
      "Enabled efficient order management",
      "Launched modern mobile-first platform",
    ],
    isPrivate: true,
  },
  {
    title: "MY BRAND - Personal Portfolio Platform",
    startDate: "2024-01-15",
    releaseDate: "2024-03-20",
    category: "portfolio",
    complexity: "complex",
    projectDuration: "2 months",
    teamSize: 1,
    status: "completed",
    isPrivate: false,
    isFeatured: false,
    url: "https://www.aphrodis.online/",
    githubUrl: "https://github.com/hbapte/portfolio-v2",
    screenshot: "/projects/portfolio-preview.png",
    description:
      "Portfolio project with admin dashboard and authentication, blogs, cloudinary integration, mocha/chai testing and swagger documentation",
    longDescription:
      "MY BRAND is a comprehensive portfolio platform that showcases my work while demonstrating full-stack development capabilities. It features a robust admin dashboard for content management, secure authentication system, and a blog platform with rich media support through Cloudinary integration. The project was built with a focus on code quality, with extensive test coverage using Mocha and Chai, and complete API documentation with Swagger.",
    features: [
      "Secure authentication with JWT",
      "Admin dashboard for content management",
      "Blog platform with rich text editing and image uploads",
      "Cloudinary integration for media management",
      "Comprehensive API documentation with Swagger",
      "Extensive test coverage with Mocha and Chai",
    ],
    challenges: [
      "Implementing secure authentication while maintaining good UX",
      "Building a responsive admin dashboard that works across all devices",
      "Setting up efficient CI/CD pipelines with comprehensive testing",
      "Optimizing image uploads and processing with Cloudinary",
    ],
    outcomes: [
      "Successfully deployed a full-stack application with above 80% test coverage",
      "Created a reusable architecture that can be adapted for client projects",
      "Improved skills in automated testing and API documentation",
      "Received positive feedback from other developers on code organization",
    ],
    tools: [
      { name: "Figma" },
      { name: "Express" },
      { name: "Node.js" },
      { name: "TypeScript" },
      { name: "Cloudinary" },
      { name: "Render" },
      { name: "MongoDB" },
    ],
  },
  {
    title: "Classic Catering - Catering Service Website",
    category: "corporate",
    complexity: "medium",
    startDate: "2024-10-01",
    releaseDate: "2024-11-15",
    projectDuration: "20 days",
    githubUrl: "https://github.com/hbapte/portfolio-v2",
    teamSize: 1,
    url: "https://www.classiccatering.rw/",
    screenshot: "/projects/classic.png",
    description:
      "Responsive website for Classic Catering Rwanda showcasing menus, event packages, gallery, and contact/booking forms.",
    client: "Classic Catering Rwanda",
    keyTechnologies: ["Next.js", "TypeScript", "TailwindCSS"],
    tools: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "TailwindCSS" },
      { name: "Cloudinary" },
    ],
    features: [
      "📋 Menu and packages with pricing",
      "📸 Event gallery with lightbox",
      "📅 Booking/contact form with email notifications",
      "📱 Mobile-first responsive design",
    ],
    outcomes: [
      "Delivered modern web presence to showcase catering services",
      "Improved lead generation via booking form",
    ],
    isPrivate: false,
    isFeatured: false,
  },
];

// Featured projects for homepage/portfolio highlights
export const featuredProjects = projects.filter(
  (project) => project.isFeatured,
);

// Projects by category for organized display
export const projectsByCategory = {
  "e-commerce": projects.filter((p) => p.category === "e-commerce"),
  healthcare: projects.filter((p) => p.category === "healthcare"),
  "ngo-nonprofit": projects.filter((p) => p.category === "ngo-nonprofit"),
  corporate: projects.filter((p) => p.category === "corporate"),
  education: projects.filter((p) => p.category === "education"),
  portfolio: projects.filter((p) => p.category === "portfolio"),
  saas: projects.filter((p) => p.category === "saas"),
  marketplace: projects.filter((p) => p.category === "marketplace"),
};

// Project statistics for portfolio overview
export const projectStats = {
  total: projects.length,
  completed: projects.filter((p) => p.status === "completed").length,
  inProgress: projects.filter((p) => p.status === "in-progress").length,
  featured: featuredProjects.length,
  categories: Object.keys(projectsByCategory).length,
  totalTeamSize: projects.reduce((sum, p) => sum + (p.teamSize || 1), 0),
};
