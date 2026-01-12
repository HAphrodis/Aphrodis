"use client";
import React, { useEffect, useState } from "react";

type Experience = {
  date: string;
  title: string;
  company: string;
  location: string;
  url?: string;
  description?: string;
  responsibilities?: string[];
  color: string;
};

const experiences: Experience[] = [
  {
    date: "Aug 2022 - Feb 2024",
    title: "Communications Officer",
    company: "URPHSA",
    location: "Kigali, RW",
    url: "https://www.urphsa.org/",
    responsibilities: [
      "Designed social graphics and print-ready assets using Photoshop and Illustrator",
      "Edited short-form promotional videos and motion clips with Premiere Pro and After Effects",
      "Prepared export-ready assets optimized for web and mobile (size, format, accessibility)",
      "Tracked campaign performance and produced weekly analytics reports with action items",
    ],
    color: "blue",
  },
  {
    date: "Jul 2023 - Present",
    title: "Graphic Designer & Social Media",
    company: "La Prima Coffee Shop",
    location: "Muhanga, RW",
    url: "https://www.laprimaltd.com/",
    responsibilities: [
      "Created branded menus, posters, social ads and in-store promotional materials",
      "Produced and edited short promotional videos and reels using Premiere Pro",
      "Managed social publishing schedule and responded to community enquiries",
      "Delivered print-ready files and ensured consistent on-brand visuals across touchpoints",
    ],
    color: "green",
  },
  {
    date: "Feb 2024 - Present",
    title: "Graphic Designer",
    company: "Empower Rwanda",
    location: "Kigali, RW",
    url: "https://empowerrwanda.org/",
    responsibilities: [
      "Designed print and digital collateral (reports, flyers, social cards) in Illustrator and InDesign",
      
    ],
    color: "purple",
  },
  {
    date: "Mar 2024 - Present",
    title: "Web Designer & Developer",
    company: "Hezain",
    location: "Remote",
    url: "https://hezain.org/",
    responsibilities: [
      "Designed responsive UI prototypes in Figma and converted them to responsive sites (HTML/CSS, Tailwind or Next.js)",
      "Implemented pages, components and CMS integrations; optimized images and assets for web delivery",
      "Improved site performance and accessibility; collaborated with designers to produce publishable assets",
    ],
    color: "orange",
  },
  {
    date: "Aug 2023 - May 2025",
    title: "Graphic Designer & Web Developer",
    company: "HPO Rwanda",
    location: "Kigali, RW",
    url: "https://www.hporwanda.org/",
    responsibilities: [
      "Produced campaign banners, social templates and event materials in Photoshop and Illustrator",
      "Built and maintained responsive site sections; ensured media and images were optimized for fast load",
      "Created motion clips and short video edits to support program launches and events",
    ],
    color: "teal",
  },
  {
    date: "Sep 2024 - Present",
    title: "Communications & Branding Officer",
    company: "RPHA (Rwanda Public Health Association)",
    location: "Kigali, RW",
    responsibilities: [
      "Led a branding refresh and produced comprehensive brand toolkits for internal teams",
      "Designed reports, infographics and digital toolkits using Illustrator and InDesign",
      "Developed and maintained landing pages and microsites; coordinated with developers to publish assets",
      "Produced social content and short-form videos; managed editorial calendar and publishing",
      "Trained staff on brand guidelines, file preparation and content best practices",
    ],
    color: "pink",
  },
];

export default function TimelinePage() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLDivElement>(".timeline-item");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-6");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    items.forEach((el) => {
      el.classList.add("opacity-0", "translate-y-6");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-16">
      <section className="container mx-auto px-4">
       
       
        <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Key experiences and projects that shaped my journey.
        </p>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-900/50" />

          <div className="space-y-12 md:space-y-24">
            {(() => {
              const colorMap: Record<string, { border: string; text: string; bg: string; ring: string }> = {
                blue: { border: "border-blue-500", text: "text-blue-600", bg: "bg-blue-100", ring: "ring-blue-400" },
                green: { border: "border-green-500", text: "text-green-600", bg: "bg-green-100", ring: "ring-green-400" },
                purple: { border: "border-purple-500", text: "text-purple-600", bg: "bg-purple-100", ring: "ring-purple-400" },
                orange: { border: "border-orange-500", text: "text-orange-600", bg: "bg-orange-100", ring: "ring-orange-400" },
                teal: { border: "border-teal-500", text: "text-teal-600", bg: "bg-teal-100", ring: "ring-teal-400" },
                pink: { border: "border-pink-500", text: "text-pink-600", bg: "bg-pink-100", ring: "ring-pink-400" },
              };

              function ExperienceCard({ exp, idx }: { exp: any; idx: number }) {
                const cols = colorMap[exp.color] || colorMap.blue;
                return (
                  <div className={`timeline-card relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 ${cols.border} transform transition-all duration-700 ${active === idx ? "scale-[1.02] ring-4 " + cols.ring : ""}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className={`text-sm font-semibold ${cols.text}`}>{exp.date}</p>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-2">{exp.title}</h3>
                        <div className="mt-3 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                          <span className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z" />
                            </svg>
                            <strong className="font-medium">{exp.company}</strong>
                          </span>
                          <span className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13 21.314l-4.657-4.657A8 8 0 1117.657 16.657z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{exp.location}</span>
                          </span>
                        </div>
                      </div>

                      <div className="ml-4 flex-shrink-0">
                        <button
                          onClick={() => setActive(idx === active ? null : idx)}
                          aria-pressed={active === idx}
                          className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors shadow-sm focus:outline-none ${active === idx ? "scale-110" : ""}`}
                          title="Highlight experience"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 12l20-7-7 20-4-9-9-4z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {exp.responsibilities ? (
                      <ul className="mt-4 list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                        {exp.responsibilities.map((r: string, i: number) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300 mt-4">{exp.description}</p>
                    )}
                  </div>
                );
              }

              return experiences.map((exp, idx) => {
                const isLeft = idx % 2 === 0; // alternate left/right starting with left
                return (
                  <div key={exp.date + idx} className="timeline-item flex flex-col md:flex-row items-center relative">
                    {/* Left column (desktop) */}
                    <div className={isLeft ? "hidden md:block md:w-1/2 md:pr-12" : "hidden md:block md:w-1/2 md:pr-12"}>
                      {isLeft && <ExperienceCard exp={exp} idx={idx} />}
                    </div>

                    {/* Icon */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full text-white border-4 border-white dark:border-gray-900 shadow-lg ${exp.color === 'blue' ? 'bg-blue-500' : exp.color === 'green' ? 'bg-green-500' : exp.color === 'purple' ? 'bg-purple-500' : exp.color === 'orange' ? 'bg-orange-500' : exp.color === 'teal' ? 'bg-teal-500' : 'bg-pink-500'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                        </svg>
                      </div>
                    </div>

                    {/* Right column / Mobile card */}
                    <div className="w-full md:w-1/2">
                      {/* Mobile: show card full width */}
                      <div className="md:hidden px-0">
                        <ExperienceCard exp={exp} idx={idx} />
                      </div>

                      {/* Desktop right column */}
                      <div className={isLeft ? "hidden md:block md:w-full md:pl-12" : "hidden md:block md:w-full md:pl-12"}>
                        {!isLeft && <ExperienceCard exp={exp} idx={idx} />}
                      </div>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </section>
    </main>
  );
}
