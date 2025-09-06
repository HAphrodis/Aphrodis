// "use client";

// import { ArrowUpRight, Calendar, ExternalLink, Info, Lock } from "lucide-react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { getTechIcon } from "@/constants/techIcons";
// import { FaGithub } from "react-icons/fa6";
// import { BorderBeam } from "../magicui/border-beam";
// import { Button } from "@/components/ui/button";
// import type { Project } from "@/types/project";
// import { formatDate } from "@/lib/utils";
// import { getFormattedDateRange } from "@/lib/formatDate";

// interface ProjectCardProps extends Project {
//   onViewDetails: () => void;
//   index: number;
// }

// export function ProjectCard({
//   title,
//   startDate,
//   releaseDate,
//   url,
//   description,
//   tools,
//   isPrivate = false,
//   screenshot,
//   onViewDetails,
//   index,
//   githubUrl,
// }: ProjectCardProps) {
//   // Format date for display
//   const formattedDate = releaseDate
//     ? formatDate(new Date(releaseDate).getTime())
//     : formatDate(new Date(startDate || "").getTime());

//   // Check if project is new (released in the last 30 days)
//   const isNewProject = releaseDate
//     ? new Date().getTime() - new Date(releaseDate).getTime() <
//       30 * 24 * 60 * 60 * 1000
//     : false;

//   const techVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.05,
//       },
//     },
//   };

//   const techItemVariants = {
//     hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
//     visible: {
//       opacity: 1,
//       y: 0,
//       filter: "blur(0px)",
//       transition: {
//         type: "spring",
//         bounce: 0.3,
//         duration: 0.6,
//       },
//     },
//   };

//   // Alternate layout direction based on index
//   const isEven = index % 2 === 0;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
//       whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//       viewport={{ once: true, margin: "-100px" }}
//       transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
//       className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950/90 to-emerald-900/40 backdrop-blur-xl"
//     >
//       {/* Background Gradient Effect */}
//       <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

//       {/* Animated glow orbs */}
//       <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-400/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
//       <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-emerald-400/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

//       {/* Project Number */}
//       <div className="absolute -left-5 top-1/2 -translate-y-1/2 text-[120px] font-bold text-emerald-500/10 select-none hidden md:block">
//         {(index + 1).toString().padStart(2, "0")}
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 p-6 sm:p-8 md:p-10">
//         <div className="flex flex-col md:flex-row md:items-start md:gap-8">
//           {/* Left Column - Image */}
//           <motion.div
//             className={`md:w-2/5 ${isEven ? "md:order-1" : "md:order-2"}`}
//             whileHover={{ scale: 1.02 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="relative group/image rounded-xl overflow-hidden border border-emerald-500/10 bg-emerald-950/50 shadow-lg shadow-emerald-900/20">
//               {screenshot ? (
//                 <Image
//                   src={screenshot || "/placeholder.svg"}
//                   alt={`Screenshot of ${title}`}
//                   width={800}
//                   height={450}
//                   className="h-full w-full object-cover transition-all duration-500 group-hover/image:scale-105"
//                 />
//               ) : (
//                 <div className="h-full w-full aspect-video bg-gradient-to-br from-emerald-950 to-emerald-900 flex items-center justify-center">
//                   <span className="text-emerald-500/40">
//                     No preview available
//                   </span>
//                 </div>
//               )}

//               {/* Hover Overlay */}
//               <div className="absolute rounded-xl inset-0 bg-emerald-950/80 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover/image:opacity-90 flex items-center justify-center">
//                 <motion.a
//                   href={url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   whileHover={{ scale: 1.1 }}
//                   className="px-6 py-3 bg-emerald-500 text-emerald-950 rounded-full font-medium flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
//                 >
//                   View Live <ExternalLink className="h-4 w-4" />
//                 </motion.a>
//               </div>
//             </div>
//           </motion.div>

//           {/* Right Column - Content */}
//           <div
//             className={`md:w-3/5 ${isEven ? "md:order-2" : "md:order-1"} mt-6 md:mt-0`}
//           >
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
//               <div className="flex items-center gap-3">
//                 <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
//                   {title}
//                 </h3>
//                 <div className="flex gap-2">
//                   {isPrivate && (
//                     <motion.span
//                       whileHover={{ scale: 1.05 }}
//                       className="flex items-center gap-1 rounded-full bg-emerald-950/50 px-3 py-1 text-sm text-emerald-500 border border-emerald-500/20"
//                     >
//                       <Lock className="h-3 w-3" />
//                       Private
//                     </motion.span>
//                   )}
//                   {isNewProject && (
//                     <motion.span
//                       whileHover={{ scale: 1.05 }}
//                       className="flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-sm text-emerald-950 font-medium shadow-[0_0_15px_rgba(16,185,129,0.3)]"
//                     >
//                       New
//                     </motion.span>
//                   )}
//                 </div>
//               </div>
//               <div className="flex items-center gap-1 text-sm text-emerald-500/80">
//                 <Calendar className="h-3 w-3" />
//                 {getFormattedDateRange(startDate, releaseDate) || formattedDate}
//               </div>
//             </div>

//             <p className="text-white/80 leading-relaxed">{description}</p>

//             {/* Tools Section */}
//             <motion.div
//               variants={techVariants}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, margin: "-50px" }}
//               className="mt-6 flex flex-wrap gap-2"
//             >
//               {tools.map((tool) => {
//                 const TechIcon = getTechIcon(tool.name);
//                 return (
//                   <motion.span
//                     key={tool.name}
//                     variants={techItemVariants}
//                     whileHover={{ scale: 1.05 }}
//                     className="flex items-center gap-2 rounded-full bg-emerald-950/50 px-4 py-1.5 text-sm text-emerald-400 border border-emerald-500/10 hover:border-emerald-500/30 transition-colors backdrop-blur-sm"
//                   >
//                     {TechIcon && <TechIcon className="w-4 h-4" />}
//                     {tool.name}
//                   </motion.span>
//                 );
//               })}
//             </motion.div>

//             {/* Action Buttons */}
//             <div className="mt-6 flex flex-wrap items-center gap-3">
//               <div className=" p-0.5 inline-block">
//                 <motion.a
//                   whileHover={{ scale: 1.05 }}
//                   href={url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-medium text-emerald-950 transition-colors hover:bg-emerald-400"
//                 >
//                   View Project
//                   <ArrowUpRight className="h-4 w-4" />
//                 </motion.a>
//               </div>

//               {!isPrivate && (
//                 <motion.a
//                   whileHover={{ scale: 1.05 }}
//                   href={githubUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 px-5 py-2 text-sm font-medium text-emerald-400 transition-all hover:bg-emerald-500/10 hover:border-emerald-500/40"
//                 >
//                   <FaGithub className="h-4 w-4" />
//                   Source Code
//                 </motion.a>
//               )}

//               <Button
//                 onClick={onViewDetails}
//                 variant="outline"
//                 className="border border-emerald-500/20  hover:border-emerald-500/40 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-medium text-emerald-950 transition-colors hover:bg-emerald-400"
//               >
//                 <Info className="h-4 w-4 mr-2" />
//                 Full Details
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <BorderBeam
//         duration={30}
//         size={500}
//         delay={17}
//         className="from-transparent via-emerald-400/70 to-transparent"
//       />
//       <BorderBeam
//         duration={30}
//         size={500}
//         className="from-transparent  via-green-500/70 to-transparent"
//       />

//       {/* Hover Glow Effect */}
//       <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100">
//         <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent blur-xl" />
//       </div>
//     </motion.div>
//   );
// }
