"use client";

import Image from "next/image";
import Link from "next/link";
import { projects } from "@/constants/projects";
import { ConnectButton } from "../shared/connect-button";

export default function ProjectSection() {
  // Get featured projects and sort by release date (newest first)
  const featuredProjects = projects
    .filter((project) => project.isFeatured)
    .sort((a, b) => {
      const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
      const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
      return dateB - dateA;
    });

  // Example stats (replace with your real stats if available)
  // const stats = [
  //   { label: "Projects", value: featuredProjects.length, color: "text-cyan-400" },
  //   { label: "Clients", value: 20, color: "text-pink-400" },
  //   { label: "Awards", value: 5, color: "text-purple-400" },
  //   { label: "Success Rate", value: "99%", color: "text-green-400" },
  // ];

  return (
    <section id="projects-hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute inset-0 pointer-events-none" id="hero3d" />
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="text-center">
          <div className="mb-8 mt-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
                My Projects
              </span>
            </h1>
            <div className="text-md md:text-lg text-gray-300 max-w-3xl mx-auto mb-8">
              <span>
                Explore my featured work in web development, data analysis, and creative technology.
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <ConnectButton />
      
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 mb-5">
          {featuredProjects.map((project) => (
            <div
              key={project.title}
              className="group bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <div className="relative w-full h-48">
                <Image
                  src={project.screenshot || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:opacity-80 transition"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                {project.description && (
                  <p className="text-gray-300 text-sm">{project.description}</p>
                )}
                <div className="flex gap-2 mt-2">
                  <Link
                    href={project.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-cyan-400 hover:underline font-semibold"
                  >
                    View Project
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L6.75 17.25M17.25 6.75H9.75M17.25 6.75V15.25" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}