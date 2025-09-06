// "use client";

// import { useRef } from "react";
// import { motion, useAnimation, useInView } from "framer-motion";
// import { SectionTitle } from "@/components/common/section-title";
// import { BlogCarousel } from "@/components/blog/blog-carousel";
// import { SectionSeparator } from "../ui/section-separator";
// // import { blogs } from "../../.velite";
// import { TextEffect } from "@/components/motion-primitives/text-effect";
// import { useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { useTransitionRouter } from "next-view-transitions";
// import { ArrowUpRight } from "lucide-react";

// export function BlogSection() {
//   // Filter published blogs and sort by date (newest first)
//   // const publishedBlogs = blogs
//   //   .filter((blog) => blog.published)
//   //   .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
//   //   .slice(0, 6); // Only show the 6 most recent posts

//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, {
//     once: false,
//     amount: 0.1,
//     margin: "-100px 0px",
//   });
//   const controls = useAnimation();

//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
//     }
//   }, [isInView, controls]);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
//     visible: {
//       opacity: 1,
//       y: 0,
//       filter: "blur(0px)",
//       transition: {
//         type: "spring",
//         bounce: 0.3,
//         duration: 0.8,
//       },
//     },
//   };

//   const router = useTransitionRouter();

//   // Optional: Add custom transition effects
//   const fadeTransition = () => {
//     document.documentElement.animate([{ opacity: 1 }, { opacity: 0 }], {
//       duration: 300,
//       easing: "ease",
//       fill: "forwards",
//       pseudoElement: "::view-transition-old(root)",
//     });

//     document.documentElement.animate([{ opacity: 0 }, { opacity: 1 }], {
//       duration: 300,
//       easing: "ease",
//       fill: "forwards",
//       pseudoElement: "::view-transition-new(root)",
//     });
//   };

//   return (
//     <section ref={sectionRef} className="bg-[#002922] relative overflow-hidden">
//       {/* Background Effects */}
//       <div
//         aria-hidden
//         className="absolute inset-0 isolate opacity-65 contain-strict"
//       >
//         <div className="w-[35rem] h-[80rem] translate-y-[10rem] absolute right-0 top-0 rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(160,100%,85%,.05)_0,hsla(160,100%,55%,.01)_50%,hsla(160,100%,45%,0)_80%)]" />
//         <div className="h-[80rem] absolute left-0 bottom-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(160,100%,85%,.04)_0,hsla(160,100%,45%,.01)_80%,transparent_100%)] [translate:5%_-50%]" />
//       </div>

//       <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_10%,transparent_0%,#002922_75%)]"></div>

//       {/* Glowing orbs */}
//       <div className="absolute -top-40 -left-40 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl"></div>
//       <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl"></div>

//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <SectionSeparator />
//       </motion.div>

//       <div className="container pt-12 mx-auto px-4 relative z-10">
//         <TextEffect
//           preset="fade-in-blur"
//           speedSegment={0.3}
//           as="div"
//           className=""
//         >
//           <SectionTitle
//             title="Blog"
//             subtitle="Thoughts, tutorials, and insights"
//           />
//         </TextEffect>

//         {/* <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate={controls}
//           className="relative "
//         >
//           {publishedBlogs.length > 0 ? (
//             <motion.div variants={itemVariants}>
//               <BlogCarousel posts={publishedBlogs} />
//             </motion.div> */}
//           ) : (
//             <motion.div variants={itemVariants} className="text-center mt-8">
//               <div className="inline-block bg-emerald-950/50 backdrop-blur-sm px-8 py-6 rounded-xl border border-emerald-500/10">
//                 <p className="text-emerald-300">No blog posts available</p>
//               </div>
//             </motion.div>
//           )}

//           {/* View All Blog Posts Button */}
//           {publishedBlogs.length > 3 && (
//             <motion.div
//               variants={itemVariants}
//               className="flex justify-center my-6"
//             >
//               <div className="relative group">
//                 <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
//                 <Button
//                   onClick={() => {
//                     router.push("/blog", {
//                       onTransitionReady: fadeTransition,
//                     });
//                   }}
//                   className="relative bg-emerald-950/90 border border-emerald-500/30 text-emerald-400 hover:text-emerald-950 hover:bg-emerald-500 rounded-full px-6 py-3 transition-all duration-300 group-hover:scale-105"
//                   variant="outline"
//                 >
//                   <div className="inline-flex items-center gap-2">
//                     View All Blog Posts
//                     <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//                   </div>
//                 </Button>
//               </div>
//             </motion.div>
//           )}

//           {/* Decorative elements */}
//           <div className="absolute -bottom-10 left-1/4 w-1 h-1 bg-emerald-400 rounded-full animate-ping opacity-70"></div>
//           <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-50 animation-delay-1000"></div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
