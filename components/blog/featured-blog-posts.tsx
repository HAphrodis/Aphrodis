// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState, useEffect } from "react";
// import { blogs } from "../../.velite";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import Image from "next/image";
// import { formatDate } from "@/lib/utils";
// import { ArrowRight, Clock } from "lucide-react";
// import { Button } from "@/components/ui/button";

// export function FeaturedBlogPosts() {
//   const [featuredPosts, setFeaturedPosts] = useState<any[]>([]);

//   useEffect(() => {
//     // Get published posts and sort by date (newest first)
//     const publishedPosts = blogs
//       .filter((blog) => blog.published)
//       .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
//       .slice(0, 3); // Get top 3 posts

//     setFeaturedPosts(publishedPosts);
//   }, []);

//   if (featuredPosts.length === 0) {
//     return null;
//   }

//   return (
//     <section className="py-16 md:py-24 bg-[#002922] relative overflow-hidden">
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.05),transparent_70%)]"></div>

//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row justify-between items-center mb-12">
//           <div>
//             <h2 className="text-3xl font-bold text-white mb-2">
//               Latest from the Blog
//             </h2>
//             <p className="text-emerald-300/80">
//               Thoughts, ideas, and insights on web development
//             </p>
//           </div>

//           <Button
//             asChild
//             variant="outline"
//             className="mt-4 md:mt-0 rounded-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/40"
//           >
//             <Link href="/blog" className="flex items-center gap-2">
//               View All Posts
//               <ArrowRight className="h-4 w-4" />
//             </Link>
//           </Button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {featuredPosts.map((post, index) => (
//             <motion.article
//               key={post.slug}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="group relative flex flex-col h-full"
//             >
//               <Link href={`/blog/${post.slug}`} className="block flex-1 h-full">
//                 <div className="relative h-full rounded-xl bg-emerald-900/30 border border-emerald-500/10 overflow-hidden transition-all duration-300 hover:bg-emerald-900/50 hover:border-emerald-500/30 hover:shadow-[0_0_25px_rgba(16,185,129,0.1)]">
//                   {/* Image */}
//                   <div className="relative h-48 w-full overflow-hidden">
//                     <Image
//                       src={
//                         post.image || "/placeholder.svg?height=200&width=400"
//                       }
//                       alt={post.title}
//                       fill
//                       className="object-cover transition-transform duration-500 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/50 to-transparent" />
//                   </div>

//                   {/* Content */}
//                   <div className="p-6 space-y-4">
//                     <time className="text-sm text-emerald-500">
//                       {formatDate(post.date)}
//                     </time>

//                     <h3 className="text-xl font-bold text-emerald-50 transition-colors duration-300 group-hover:text-emerald-400 line-clamp-2">
//                       {post.title}
//                     </h3>

//                     <p className="text-emerald-300/80 line-clamp-3">
//                       {post.description}
//                     </p>

//                     <div className="flex items-center gap-2 text-sm text-emerald-500 pt-2">
//                       <Clock className="h-4 w-4" />
//                       <span>{post.readingTime || 5} min read</span>
//                     </div>
//                   </div>

//                   {/* Read more indicator */}
//                   <div className="absolute bottom-6 right-6 opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
//                     <div className="flex items-center gap-1 text-emerald-400">
//                       <span className="text-sm font-medium">Read more</span>
//                       <ArrowRight className="h-4 w-4" />
//                     </div>
//                   </div>

//                   {/* Hover effect */}
//                   <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
//                 </div>
//               </Link>
//             </motion.article>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
