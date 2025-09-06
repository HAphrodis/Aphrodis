// constants\my-services.tsx
import type React from "react";
import {
  Monitor,
  Code,
  Paintbrush,
  Cpu,
  HeadphonesIcon,
  SearchIcon,
  Palette,
} from "lucide-react";

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  points?: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  title: string;
  quote: string;
  image?: string;
}

export interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  longDescription?: string;
  tags?: string[];
  benefits?: string[];
  idealFor?: string[];
  features?: ServiceFeature[];
  process?: ProcessStep[];
  faq?: FAQ[];
}

export const services: Service[] = [
  {
    icon: Monitor,
    title: "UI/UX Design",
    description:
      "Creating intuitive and visually appealing user interfaces that enhance user experience and engagement.",
    longDescription:
      "I specialize in creating user-centered designs that not only look beautiful but also provide seamless interactions. My approach combines aesthetic appeal with functional design principles to create interfaces that users love to interact with.",
    tags: ["Figma", "Adobe XD", "Wireframing", "Prototyping", "User Research"],
    benefits: [
      "Improved user engagement and satisfaction",
      "Reduced bounce rates and increased conversions",
      "Consistent brand experience across platforms",
      "Accessible designs for all users",
      "Data-driven design decisions",
    ],
    idealFor: [
      "Startups looking to create a strong first impression",
      "Established businesses needing a design refresh",
      "Companies struggling with user engagement",
      "Projects requiring complex information architecture",
    ],
    features: [
      {
        title: "User Research",
        description:
          "Understanding your users' needs, behaviors, and pain points to inform design decisions.",
      },
      {
        title: "Wireframing",
        description:
          "Creating low-fidelity layouts to establish information hierarchy and basic functionality.",
      },
      {
        title: "Visual Design",
        description:
          "Developing high-fidelity designs with attention to color, typography, and visual elements.",
      },
      {
        title: "Prototyping",
        description:
          "Building interactive prototypes to test and refine user flows before development.",
      },
      {
        title: "Usability Testing",
        description:
          "Evaluating designs with real users to identify and address usability issues.",
      },
      {
        title: "Design Systems",
        description:
          "Creating consistent component libraries and design guidelines for scalable products.",
      },
    ],
    process: [
      {
        title: "Discovery",
        description:
          "Understanding your business goals, target audience, and project requirements.",
        points: [
          "Stakeholder interviews",
          "Competitive analysis",
          "User research",
        ],
      },
      {
        title: "Information Architecture",
        description:
          "Organizing content and functionality in a logical and intuitive structure.",
        points: ["Site mapping", "User flows", "Content hierarchy"],
      },
      {
        title: "Wireframing",
        description:
          "Creating low-fidelity layouts to establish the basic structure and functionality.",
        points: [
          "Layout exploration",
          "Content placement",
          "Interaction patterns",
        ],
      },
      {
        title: "Visual Design",
        description:
          "Developing the visual language and applying it to the wireframes.",
        points: [
          "Color palette",
          "Typography",
          "UI components",
          "Visual hierarchy",
        ],
      },
      {
        title: "Prototyping & Testing",
        description:
          "Building interactive prototypes and testing them with users.",
        points: [
          "Interactive prototypes",
          "Usability testing",
          "Feedback collection",
        ],
      },
      {
        title: "Handoff & Support",
        description:
          "Providing developers with all necessary assets and specifications.",
        points: ["Design specs", "Asset delivery", "Implementation support"],
      },
    ],
    faq: [
      {
        question: "How long does the UI/UX design process typically take?",
        answer:
          "The timeline varies depending on project complexity, but most projects take 4-8 weeks from discovery to final deliverables.",
      },
      {
        question: "Do you provide design files that developers can use?",
        answer:
          "Yes, I provide complete design specifications, assets, and documentation to ensure smooth implementation.",
      },
      {
        question: "Can you work with our existing brand guidelines?",
        answer:
          "I can work within your established brand guidelines or help develop new ones if needed.",
      },
      {
        question:
          "Do you offer ongoing design support after project completion?",
        answer:
          "Yes, I offer maintenance packages to provide ongoing design support and updates as your product evolves.",
      },
    ],
  },

   {
    icon: Palette,
    title: "Graphic Design",
    description:
      "Delivering creative visual designs that communicate your brand story and captivate your audience.",
    longDescription:
      "From logos and branding to marketing materials and social media graphics, I provide professional graphic design services tailored to your business needs. My designs are crafted to not only look visually stunning but also to communicate effectively and align with your brand identity.",
    tags: ["Adobe Illustrator", "Photoshop", "Canva", "Branding", "Print Design"],
    benefits: [
      "Strong and consistent brand identity",
      "High-quality visuals for digital and print media",
      "Custom graphics tailored to your audience",
      "Boosted marketing impact",
      "Creative designs that stand out",
    ],
    idealFor: [
      "Businesses wanting a unique and memorable brand identity",
      "Startups needing logos and branding assets",
      "Companies running marketing campaigns",
      "Individuals or businesses needing professional print or digital materials",
    ],
    features: [
      {
        title: "Logo & Branding",
        description:
          "Designing logos and brand assets that reflect your company’s values and identity.",
      },
      {
        title: "Marketing Materials",
        description:
          "Creating brochures, flyers, posters, and other promotional designs.",
      },
      {
        title: "Social Media Graphics",
        description:
          "Designing engaging graphics optimized for different platforms.",
      },
      {
        title: "Print Design",
        description:
          "Crafting designs for business cards, packaging, and other print-ready assets.",
      },
      {
        title: "Illustrations",
        description:
          "Custom illustrations that add a creative and personal touch to your brand.",
      },
    ],
    faq: [
      {
        question: "Do you offer logo design packages?",
        answer:
          "Yes, I provide logo design packages that include multiple concepts, revisions, and final files in all formats.",
      },
      {
        question: "Can you design for both print and digital?",
        answer:
          "Absolutely, I create designs suitable for both digital platforms and high-quality print production.",
      },
      {
        question: "Do you provide editable design files?",
        answer:
          "Yes, I provide source files upon request so you can make future edits if needed.",
      },
    ],
  },

   {
    icon: Code,
    title: "Web Development",
    description:
      "Building robust and scalable web applications with modern technologies and best practices.",
    longDescription:
      "I develop custom web applications that are not only visually appealing but also performant, secure, and scalable. Using modern frameworks and best practices, I create solutions that help businesses achieve their goals and provide exceptional user experiences.",
    tags: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
    ],
    benefits: [
      "Custom solutions tailored to your specific needs",
      "Responsive designs that work on all devices",
      "Optimized performance for better user experience",
      "SEO-friendly implementation",
      "Secure and scalable architecture",
    ],
    idealFor: [
      "Businesses needing custom web applications",
      "Startups launching new digital products",
      "Companies looking to modernize legacy systems",
      "Projects requiring complex functionality",
    ],
    features: [
      {
        title: "Frontend Development",
        description:
          "Building responsive, interactive user interfaces with modern JavaScript frameworks.",
      },
      {
        title: "Backend Development",
        description:
          "Creating robust APIs and server-side logic to power your applications.",
      },
      {
        title: "Database Design",
        description:
          "Designing efficient database schemas and implementing data management solutions.",
      },
      {
        title: "Authentication & Authorization",
        description:
          "Implementing secure user authentication and role-based access control.",
      },
      {
        title: "Third-party Integrations",
        description:
          "Connecting your application with external services and APIs.",
      },
      {
        title: "Performance Optimization",
        description:
          "Ensuring your application loads quickly and runs smoothly for all users.",
      },
    ],
  },
  {
    icon: Paintbrush,
    title: "Web Design & Redesign",
    description:
      "Crafting beautiful and functional websites that align with your brand and business objectives.",
    tags: [
      "Responsive Design",
      "WordPress",
      "E-commerce",
      "Landing Pages",
      "Portfolio Sites",
    ],
    benefits: [
      "Professional online presence",
      "Mobile-friendly designs",
      "Improved conversion rates",
      "Easy content management",
      "Search engine optimization",
    ],
  },
  
  {
    icon: Cpu,
    title: "Software Development",
    description:
      "Developing custom software solutions for various needs, from web applications to desktop software.",
    tags: [
      "Full-stack",
      "API Development",
      "Database Design",
      "System Architecture",
      "Testing",
    ],
    benefits: [
      "Tailored solutions for specific business needs",
      "Improved operational efficiency",
      "Scalable and maintainable codebase",
      "Integration with existing systems",
      "Ongoing support and updates",
    ],
  },
  {
    icon: HeadphonesIcon,
    title: "IT Support",
    description:
      "Providing reliable technical support and maintenance to keep your systems running smoothly.",
    tags: [
      "Troubleshooting",
      "System Maintenance",
      "Security",
      "Data Backup",
      "User Training",
    ],
    benefits: [
      "Minimized downtime",
      "Proactive issue prevention",
      "Enhanced security measures",
      "Regular system updates",
      "Technical guidance and training",
    ],
  },
  {
    icon: SearchIcon,
    title: "SEO Services",
    description:
      "Optimizing websites for better search engine rankings and increased organic traffic.",
    tags: [
      "Keyword Research",
      "On-page SEO",
      "Technical SEO",
      "Content Strategy",
      "Analytics",
    ],
    benefits: [
      "Improved search engine visibility",
      "Increased organic traffic",
      "Higher conversion rates",
      "Competitive advantage",
      "Data-driven optimization",
    ],
  },
];

export const workProcess: ProcessStep[] = [
  {
    title: "Discovery & Planning",
    description:
      "Understanding your goals, requirements, and expectations to create a solid project foundation.",
    points: [
      "Initial consultation to understand your needs",
      "Research and analysis of your industry and competitors",
      "Defining project scope, timeline, and deliverables",
      "Creating a detailed project plan",
    ],
  },
  {
    title: "Design & Prototyping",
    description:
      "Creating visual concepts and interactive prototypes to bring your ideas to life.",
    points: [
      "Wireframing and information architecture",
      "Visual design and branding elements",
      "Interactive prototyping for user testing",
      "Iterative refinement based on feedback",
    ],
  },
  {
    title: "Development & Implementation",
    description:
      "Building your solution with clean, efficient code and best practices.",
    points: [
      "Frontend and backend development",
      "Database design and implementation",
      "Integration with third-party services",
      "Regular progress updates and reviews",
    ],
  },
  {
    title: "Testing & Quality Assurance",
    description:
      "Rigorous testing to ensure your solution works flawlessly across all devices and scenarios.",
    points: [
      "Functional testing of all features",
      "Cross-browser and cross-device compatibility testing",
      "Performance optimization",
      "Security testing and vulnerability assessment",
    ],
  },
  {
    title: "Deployment & Launch",
    description:
      "Carefully deploying your solution to production and ensuring a smooth launch.",
    points: [
      "Server configuration and deployment",
      "Final checks and pre-launch testing",
      "Domain and DNS setup",
      "Monitoring for any issues during launch",
    ],
  },
  {
    title: "Support & Maintenance",
    description:
      "Providing ongoing support and maintenance to keep your solution running smoothly.",
    points: [
      "Regular updates and security patches",
      "Performance monitoring and optimization",
      "Content updates and feature enhancements",
      "Technical support and troubleshooting",
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    title: "Founder, TechStart",
    quote:
      "Working with Ishimwe was an absolute pleasure. He took our vague concept and transformed it into a stunning, functional website that perfectly represents our brand. His attention to detail and technical expertise are truly impressive.",
    image: "/avatar.webp",
  },
  {
    name: "Michael Chen",
    title: "CTO, DataFlow Systems",
    quote:
      "We hired Ishimwe to redesign our outdated web application, and the results exceeded our expectations. He not only improved the visual design but also enhanced the performance and user experience. Our team and customers love the new system.",
    image: "/placeholder.svg",
  },
  {
    name: "Emily Rodriguez",
    title: "Marketing Director, GrowthHub",
    quote:
      "Ishimwe's SEO services have transformed our online presence. Within just three months, we saw a significant increase in organic traffic and conversions. His data-driven approach and clear communication made the entire process smooth and effective.",
    image: "/placeholder.svg",
  },
  {
    name: "David Okafor",
    title: "Small Business Owner",
    quote:
      "As a small business owner with limited technical knowledge, I was worried about creating an online store. Ishimwe guided me through the entire process, created a beautiful e-commerce site, and even trained me on how to manage it. Highly recommended!",
    image: "/placeholder.svg",
  },
];
