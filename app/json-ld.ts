export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.hbapte.me/#website",
      url: "https://www.hbapte.me",
      name: "Ishimwe Jean Baptiste Portfolio",
      description:
        "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Building scalable applications and exceptional user experiences.",
      inLanguage: "en",
      publisher: {
        "@id": "https://www.hbapte.me/#person",
      },
      author: {
        "@id": "https://www.hbapte.me/#person",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.hbapte.me/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Person",
      "@id": "https://www.hbapte.me/#person",
      name: "Ishimwe Jean Baptiste",
      alternateName: "Hbapte",
      url: "https://www.hbapte.me",
      image: {
        "@type": "ImageObject",
        url: "https://www.hbapte.me/profile-image.jpg",
        width: 400,
        height: 400,
      },
      sameAs: [
        "https://github.com/hbapte",
        "https://www.linkedin.com/in/hbapte",
        "https://x.com/HBaptee",
        "https://www.instagram.com/hbapte",
        "https://bsky.app/profile/hbapte.bsky.social",
        "https://linktr.ee/hbapte",
      ],
      jobTitle: "Full Stack Developer",
      worksFor: {
        "@type": "Organization",
        name: "Freelance",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kigali",
        addressCountry: "Rwanda",
      },
      email: "ijbapte@gmail.com",
      telephone: "+250785577189",
      knowsAbout: [
        "JavaScript",
        "TypeScript",
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "PostgreSQL",
        "GraphQL",
        "TailwindCSS",
        "Full Stack Development",
        "Web Development",
        "Software Engineering",
      ],
      alumniOf: [
        {
          "@type": "Organization",
          name: "Andela Rwanda",
          description: "Fullstack Javascript Development Program",
        },
        {
          "@type": "Organization",
          name: "ALX Africa",
          description: "Software Engineering Program",
        },
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.hbapte.me/#service",
      name: "Full Stack Development Services",
      provider: {
        "@id": "https://www.hbapte.me/#person",
      },
      serviceType: "Web Development",
      areaServed: {
        "@type": "Place",
        name: "Worldwide",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Development Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Frontend Development",
              description:
                "React, Next.js, TypeScript, TailwindCSS development",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Backend Development",
              description:
                "Node.js, Express, MongoDB, PostgreSQL, GraphQL APIs",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Full Stack Applications",
              description:
                "Complete web application development from frontend to backend",
            },
          },
        ],
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://www.hbapte.me/#webpage",
      url: "https://www.hbapte.me",
      name: "Ishimwe Jean Baptiste - Full Stack Developer Portfolio",
      isPartOf: {
        "@id": "https://www.hbapte.me/#website",
      },
      about: {
        "@id": "https://www.hbapte.me/#person",
      },
      description:
        "Portfolio showcasing full stack development projects and professional experience",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.hbapte.me",
          },
        ],
      },
    },
  ],
};
