// "use client";

// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useGesture } from "@use-gesture/react";
// import { cn } from "@/lib/utils";
// // import type { Blog } from "../../.velite";

// interface BlogCarouselProps {
//   posts: [];
// }

// export function BlogCarousel({ posts }: BlogCarouselProps) {
//   const [currentPage, setCurrentPage] = useState(0);
//   const [itemsPerPage, setItemsPerPage] = useState(3);
//   const [direction, setDirection] = useState(0);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragDirection, setDragDirection] = useState<number>(0);
//   const [swipeProgress, setSwipeProgress] = useState(0);

//   const totalPages = Math.ceil(posts.length / itemsPerPage);

//   useEffect(() => {
//     const updateItemsPerPage = () => {
//       if (window.innerWidth < 768) {
//         setItemsPerPage(1);
//       } else if (window.innerWidth < 1024) {
//         setItemsPerPage(2);
//       } else {
//         setItemsPerPage(3);
//       }
//     };

//     updateItemsPerPage();
//     window.addEventListener("resize", updateItemsPerPage);
//     return () => window.removeEventListener("resize", updateItemsPerPage);
//   }, []);

//   const handlePrev = () => {
//     if (currentPage > 0) {
//       setDirection(-1);
//       setCurrentPage((prev) => prev - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages - 1) {
//       setDirection(1);
//       setCurrentPage((prev) => prev + 1);
//     }
//   };

//   const bind = useGesture(
//     {
//       onDrag: ({
//         direction: [xDir],
//         movement: [x],
//         distance,
//         cancel,
//         velocity: [vx],
//       }) => {
//         setDragDirection(xDir);
//         setSwipeProgress(Math.min(Math.abs(x) / 200, 1));

//         // More sensitive swipe detection
//         if (distance[0] > 80 || Math.abs(vx) > 0.5) {
//           if (xDir > 0 && currentPage > 0) {
//             handlePrev();
//           } else if (xDir < 0 && currentPage < totalPages - 1) {
//             handleNext();
//           }
//           cancel();
//         }
//         setIsDragging(true);
//       },
//       onDragEnd: () => {
//         setIsDragging(false);
//         setSwipeProgress(0);
//         setDragDirection(0);
//       },
//     },
//     {
//       drag: {
//         axis: "x",
//         from: () => [0, 0],
//         threshold: 10,
//       },
//     },
//   );

//   const getVisiblePosts = () => {
//     const start = currentPage * itemsPerPage;
//     return posts.slice(start, start + itemsPerPage);
//   };

//   const visiblePosts = getVisiblePosts();

//   // Don't render if there are no posts
//   if (posts.length === 0) {
//     return null;
//   }

//   // Fixed height container to prevent jumping
//   const getContainerHeight = () => {
//     if (itemsPerPage === 1) return "h-[520px]"; // Mobile
//     if (itemsPerPage === 2) return "h-[480px]"; // Tablet
//     return "h-[510px]"; // Desktop
//   };

//   const slideVariants = {
//     enter: (direction: number) => ({
//       x: direction > 0 ? 300 : -300,
//       opacity: 0,
//     }),
//     center: {
//       x: 0,
//       opacity: 1,
//       transition: {
//         x: { type: "spring", stiffness: 400, damping: 40 },
//         opacity: { duration: 0.3 },
//       },
//     },
//     exit: (direction: number) => ({
//       x: direction > 0 ? -300 : 300,
//       opacity: 0,
//       transition: {
//         x: { type: "spring", stiffness: 400, damping: 40 },
//         opacity: { duration: 0.3 },
//       },
//     }),
//   };

//   // Swipe indicator animations
//   const leftIndicatorVariants = {
//     hidden: { opacity: 0, x: -30, scale: 0.8 },
//     visible: {
//       opacity:
//         dragDirection > 0 && currentPage > 0
//           ? Math.min(swipeProgress * 2, 1)
//           : 0,
//       x: dragDirection > 0 ? -30 + swipeProgress * 15 : -30,
//       scale: dragDirection > 0 ? 0.8 + swipeProgress * 0.2 : 0.8,
//     },
//   };

//   const rightIndicatorVariants = {
//     hidden: { opacity: 0, x: 30, scale: 0.8 },
//     visible: {
//       opacity:
//         dragDirection < 0 && currentPage < totalPages - 1
//           ? Math.min(swipeProgress * 2, 1)
//           : 0,
//       x: dragDirection < 0 ? 30 - swipeProgress * 15 : 30,
//       scale: dragDirection < 0 ? 0.8 + swipeProgress * 0.2 : 0.8,
//     },
//   };

//   return (
//     <div className="relative ">
//       {/* Swipe indicators */}
//       <motion.div
//         className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-emerald-500/90 text-emerald-950 rounded-full p-3 shadow-lg backdrop-blur-sm border border-emerald-400/50"
//         variants={leftIndicatorVariants}
//         initial="hidden"
//         animate="visible"
//         transition={{ duration: 0.2 }}
//       >
//         <ChevronLeft className="h-5 w-5" />
//       </motion.div>

//       <motion.div
//         className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-emerald-500/90 text-emerald-950 rounded-full p-3 shadow-lg backdrop-blur-sm border border-emerald-400/50"
//         variants={rightIndicatorVariants}
//         initial="hidden"
//         animate="visible"
//         transition={{ duration: 0.2 }}
//       >
//         <ChevronRight className="h-5 w-5" />
//       </motion.div>

//       {/* Fixed height container to prevent jumping */}
//       <div
//         className={cn(
//           "relative overflow-hidden  rounded-xl",
//           getContainerHeight(),
//           isDragging ? "cursor-grabbing" : "cursor-grab",
//         )}
//         ref={containerRef}
//         {...bind()}
//       >
//         <AnimatePresence initial={false} custom={direction} mode="wait">
//           <motion.div
//             key={currentPage}
//             custom={direction}
//             variants={slideVariants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             className="absolute  inset-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2"
//             style={{ pointerEvents: isDragging ? "none" : "auto" }}
//           >
//             {visiblePosts.map((index) => (
//               <motion.div
//                 // key={`${post.slug}-${currentPage}-${index}`}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{
//                   duration: 0.4,
//                   delay: index * 0.1,
//                   ease: "easeOut",
//                 }}
//                 className="h-full"
//               >
//                 {/* <BlogCard
//                   title={post.title}
//                   description={post.description}
//                   date={new Date(post.date)}
//                   image={post.image || "/blog-cover.webp"}
//                   slug={post.slug}
//                 /> */}
//               </motion.div>
//             ))}
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Enhanced Navigation Buttons */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center mt-8 gap-6">
//           {/* Previous Button */}
//           <div className="relative group">
//             <div
//               className={cn(
//                 "absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full blur opacity-0 transition duration-300",
//                 currentPage > 0 && "group-hover:opacity-40",
//               )}
//             />
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={handlePrev}
//               disabled={currentPage === 0}
//               className={cn(
//                 "relative w-9 h-9 rounded-full border-emerald-500/30 bg-emerald-950/50 backdrop-blur-sm transition-all duration-300",
//                 currentPage > 0
//                   ? "text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-emerald-300 hover:scale-110"
//                   : "opacity-40 cursor-not-allowed text-emerald-600",
//               )}
//             >
//               <ChevronLeft className="h-5 w-5" />
//             </Button>
//           </div>

//           {/* Page Indicators */}
//           <div className="flex items-center gap-3 px-4 py-2 bg-emerald-950/30 backdrop-blur-sm rounded-full border border-emerald-500/20">
//             {Array.from({ length: totalPages }).map((_, i) => (
//               <motion.button
//                 key={i}
//                 onClick={() => {
//                   setDirection(i > currentPage ? 1 : -1);
//                   setCurrentPage(i);
//                 }}
//                 className={cn(
//                   "rounded-full transition-all duration-300 relative overflow-hidden",
//                   i === currentPage
//                     ? "bg-emerald-400 w-8 h-2 shadow-[0_0_15px_rgba(16,185,129,0.6)]"
//                     : "bg-emerald-800/60 w-3 h-3 hover:bg-emerald-600 hover:scale-125",
//                 )}
//                 whileHover={{ scale: i === currentPage ? 1 : 1.25 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 {i === currentPage && (
//                   <motion.div
//                     className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-emerald-500 rounded-full"
//                     layoutId="activeIndicator"
//                     transition={{ type: "spring", stiffness: 400, damping: 30 }}
//                   />
//                 )}
//               </motion.button>
//             ))}
//           </div>

//           {/* Next Button */}
//           <div className="relative group">
//             <div
//               className={cn(
//                 "absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full blur opacity-0 transition duration-300",
//                 currentPage < totalPages - 1 && "group-hover:opacity-40",
//               )}
//             />
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={handleNext}
//               disabled={currentPage === totalPages - 1}
//               className={cn(
//                 "relative w-9 h-9 rounded-full border-emerald-500/30 bg-emerald-950/50 backdrop-blur-sm transition-all duration-300",
//                 currentPage < totalPages - 1
//                   ? "text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-emerald-300 hover:scale-110"
//                   : "opacity-40 cursor-not-allowed text-emerald-600",
//               )}
//             >
//               <ChevronRight className="h-5 w-5" />
//             </Button>
//           </div>
//         </div>
//       )}

//       {/* Progress indicator */}
//       {/* {totalPages > 1 && (
//         <div className="mt-4 flex justify-center">
//           <div className="text-xs text-emerald-400/60 bg-emerald-950/30 px-3 py-1 rounded-full border border-emerald-500/10">
//             {currentPage + 1} of {totalPages}
//           </div>
//         </div>
//       )} */}
//     </div>
//   );
// }
