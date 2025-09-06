// "use client";

// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Button } from "@/components/ui/button";
// import {
//   Calendar,
//   Lock,
//   ExternalLink,
//   ArrowRight,
//   CheckCircle2,
// } from "lucide-react";
// import { FaGithub } from "react-icons/fa6";
// import { getTechIcon } from "@/constants/techIcons";
// import type { Project } from "@/types/project";
// import { getFormattedDateRange } from "@/lib/formatDate";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";

// interface ProjectDetailsDialogProps {
//   project: Project | null;
//   isOpen: boolean;
//   onClose: () => void;
// }

// export function ProjectDetailsDialog({
//   project,
//   isOpen,
//   onClose,
// }: ProjectDetailsDialogProps) {
//   if (!project) return null;

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
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

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <Dialog open={isOpen} onOpenChange={onClose}>
//           <DialogContent className="sm:max-w-5xl max-h-[95vh] mx-auto bg-gradient-to-br from-emerald-950 to-emerald-900/90 border-emerald-800/30 text-white backdrop-blur-xl p-0 overflow-hidden">
//             <motion.div
//               initial="hidden"
//               animate="visible"
//               exit="hidden"
//               variants={containerVariants}
//               className="flex flex-col h-full max-h-[95vh]"
//             >
//               {/* Hero Section with Image */}
//               <motion.div
//                 variants={itemVariants}
//                 className="relative w-full h-[200px] md:h-[250px] flex-shrink-0"
//               >
//                 {project.screenshot ? (
//                   <Image
//                     src={project.screenshot || "/placeholder.svg"}
//                     alt={`Screenshot of ${project.title}`}
//                     width={1200}
//                     height={600}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gradient-to-br from-emerald-900 to-emerald-800 flex items-center justify-center">
//                     <span className="text-emerald-500/40">
//                       No preview available
//                     </span>
//                   </div>
//                 )}

//                 {/* Overlay with title */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 to-transparent flex flex-col justify-end p-6">
//                   <div className="flex items-center gap-3 mb-2">
//                     <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
//                       {project.title}
//                     </h2>
//                     {project.isPrivate && (
//                       <span className="flex items-center gap-1 rounded-full bg-emerald-950/50 px-3 py-1 text-sm text-emerald-500 border border-emerald-500/20">
//                         <Lock className="h-3 w-3" />
//                         Private
//                       </span>
//                     )}
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-emerald-500/80">
//                     <Calendar className="h-4 w-4" />
//                     {getFormattedDateRange(
//                       project.startDate,
//                       project.releaseDate,
//                     )}
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Content Area - This is the scrollable part */}
//               <ScrollArea className="flex-grow p-6">
//                 <div className="grid md:grid-cols-3 gap-6">
//                   {/* Left Column - Main Description */}
//                   <div className="md:col-span-2">
//                     <motion.div variants={itemVariants} className="mb-6">
//                       <h3 className="text-lg font-semibold text-emerald-400 mb-2">
//                         About this project
//                       </h3>
//                       <p className="text-emerald-100/80 leading-relaxed">
//                         {project.longDescription}
//                       </p>
//                     </motion.div>

//                     <motion.div
//                       variants={containerVariants}
//                       className="space-y-8"
//                     >
//                       {/* Features */}
//                       {project.features && project.features.length > 0 && (
//                         <motion.div variants={itemVariants}>
//                           <h3 className="text-lg font-semibold text-emerald-400 mb-3">
//                             Key Features
//                           </h3>
//                           <ul className="space-y-2 text-emerald-100/80">
//                             {project.features.map((feature, index) => (
//                               <motion.li
//                                 key={index}
//                                 initial={{ opacity: 0, x: -10 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ delay: 0.3 + index * 0.05 }}
//                                 className="flex items-start gap-2"
//                               >
//                                 <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
//                                 <span>{feature}</span>
//                               </motion.li>
//                             ))}
//                           </ul>
//                         </motion.div>
//                       )}

//                       {/* Challenges */}
//                       {project.challenges && project.challenges.length > 0 && (
//                         <motion.div variants={itemVariants}>
//                           <h3 className="text-lg font-semibold text-emerald-400 mb-3">
//                             Challenges & Solutions
//                           </h3>
//                           <ul className="space-y-2 text-emerald-100/80">
//                             {project.challenges.map((challenge, index) => (
//                               <motion.li
//                                 key={index}
//                                 initial={{ opacity: 0, x: -10 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ delay: 0.4 + index * 0.05 }}
//                                 className="flex items-start gap-2"
//                               >
//                                 <div className="h-5 w-5 rounded-full border border-emerald-500/50 flex items-center justify-center flex-shrink-0 mt-0.5">
//                                   <span className="text-xs text-emerald-500">
//                                     {index + 1}
//                                   </span>
//                                 </div>
//                                 <span>{challenge}</span>
//                               </motion.li>
//                             ))}
//                           </ul>
//                         </motion.div>
//                       )}

//                       {/* Outcomes */}
//                       {project.outcomes && project.outcomes.length > 0 && (
//                         <motion.div variants={itemVariants}>
//                           <h3 className="text-lg font-semibold text-emerald-400 mb-3">
//                             Outcomes
//                           </h3>
//                           <ul className="space-y-2 text-emerald-100/80">
//                             {project.outcomes.map((outcome, index) => (
//                               <motion.li
//                                 key={index}
//                                 initial={{ opacity: 0, x: -10 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ delay: 0.5 + index * 0.05 }}
//                                 className="flex items-start gap-2"
//                               >
//                                 <div className="h-5 w-5 text-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
//                                   <ArrowRight className="h-4 w-4" />
//                                 </div>
//                                 <span>{outcome}</span>
//                               </motion.li>
//                             ))}
//                           </ul>
//                         </motion.div>
//                       )}
//                     </motion.div>
//                   </div>

//                   {/* Right Column - Technologies and Actions */}
//                   <div className="md:border-l border-emerald-800/30 md:pl-6">
//                     <motion.div variants={itemVariants} className="mb-6">
//                       <h3 className="text-lg font-semibold text-emerald-400 mb-3">
//                         Technologies Used
//                       </h3>
//                       <div className="flex flex-wrap gap-2">
//                         {project.tools.map((tool, index) => {
//                           const TechIcon = getTechIcon(tool.name);
//                           return (
//                             <motion.span
//                               key={tool.name}
//                               initial={{ opacity: 0, y: 10 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               transition={{ delay: 0.3 + index * 0.03 }}
//                               className="flex items-center gap-2 rounded-full bg-emerald-950/50 px-4 py-2 text-sm text-emerald-400 border border-emerald-500/10 backdrop-blur-sm"
//                             >
//                               {TechIcon && <TechIcon className="w-4 h-4" />}
//                               {tool.name}
//                             </motion.span>
//                           );
//                         })}
//                       </div>
//                     </motion.div>

//                     {/* Project Stats */}
//                     <motion.div variants={itemVariants} className="mb-6">
//                       <h3 className="text-lg font-semibold text-emerald-400 mb-3">
//                         Project Stats
//                       </h3>
//                       <div className="grid grid-cols-2 gap-3">
//                         <div className="bg-emerald-950/50 border border-emerald-800/30 rounded-lg p-3">
//                           <div className="text-sm text-emerald-500/80">
//                             Duration
//                           </div>
//                           <div className="text-lg font-medium text-white">
//                             {project.startDate && project.releaseDate
//                               ? `${Math.ceil((new Date(project.releaseDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24 * 7))} weeks`
//                               : "Ongoing"}
//                           </div>
//                         </div>
//                         <div className="bg-emerald-950/50 border border-emerald-800/30 rounded-lg p-3">
//                           <div className="text-sm text-emerald-500/80">
//                             Status
//                           </div>
//                           <div className="text-lg font-medium text-white">
//                             {project.releaseDate ? "Completed" : "In Progress"}
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>

//                     {/* Action Buttons */}
//                     <motion.div
//                       variants={containerVariants}
//                       className="space-y-3 mt-8"
//                     >
//                       <Button
//                         asChild
//                         className="w-full rounded-full bg-emerald-500 text-emerald-950 hover:bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
//                       >
//                         <a
//                           href={project.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center justify-center gap-2"
//                         >
//                           View Live Project
//                           <ExternalLink className="h-4 w-4" />
//                         </a>
//                       </Button>

//                       {!project.isPrivate && (
//                         <Button
//                           asChild
//                           variant="outline"
//                           className="w-full rounded-full border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/40"
//                         >
//                           <a
//                             href="https://github.com"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center justify-center gap-2"
//                           >
//                             <FaGithub className="h-4 w-4" />
//                             View Source Code
//                           </a>
//                         </Button>
//                       )}
//                     </motion.div>
//                   </div>
//                 </div>

//                 {/* Add some bottom padding for better scrolling experience */}
//                 <div className="h-6"></div>
//               </ScrollArea>
//             </motion.div>
//           </DialogContent>
//         </Dialog>
//       )}
//     </AnimatePresence>
//   );
// }
