// "use client"

// import { Button } from "@/components/ui/button"
// import {
//   Monitor,
//   Code,
//   Paintbrush,
//   Cpu,
//   HeadphonesIcon,
//   SearchIcon,
//   Mail,
// } from "lucide-react"
// import { useState } from "react"
// import { motion } from "framer-motion"
// import { BorderBeam } from "@/components/magicui/border-beam"
// import PageHeader from "@/components/shared/page-header"
// import { ThemeToggle } from "@/components/shared/theme-toggle"
// import { useTheme } from "@/providers/theme-provider2"
// import LiveChat from "@/components/LiveChat"

// export default function ServicesPage() {
//   const [hoveredService, setHoveredService] = useState<number | null>(null)

//   const { theme } = useTheme()

//   const themeStyles = {
//     emerald: {
//       background: "bg-[#002922]",
//       grid: "bg-[radial-gradient(#ffffff33_1px,#00091d_1px)]",
//       cardFrom: "from-emerald-800/50",
//       cardTo: "to-emerald-900/50",
//       accent: "bg-emerald-500",
//       text: "text-emerald-200/80",
//       glow: "bg-emerald-500/20",
//       icon: "text-emerald-400",
//       beam: "from-transparent via-green-500 to-transparent"
//     },
//     cyberpunk: {
//       background: "bg-[#13091F]",
//       grid: "bg-[radial-gradient(#ff00ee33_1px,#13091F_1px)]",
//       cardFrom: "from-purple-900/50",
//       cardTo: "to-pink-800/50",
//       accent: "bg-purple-500",
//       text: "text-purple-200/80",
//       glow: "bg-pink-500/20",
//       icon: "text-purple-400",
//       beam: "from-transparent via-pink-500 to-transparent"
//     },
//     ocean: {
//       background: "bg-[#001B3D]",
//       grid: "bg-[radial-gradient(#00f2ff33_1px,#001B3D_1px)]",
//       cardFrom: "from-blue-800/50",
//       cardTo: "to-cyan-900/50",
//       accent: "bg-blue-500",
//       text: "text-blue-200/80",
//       glow: "bg-cyan-500/20",
//       icon: "text-blue-400",
//       beam: "from-transparent via-cyan-500 to-transparent"
//     }
//   }

//   const currentTheme = themeStyles[theme]

//   const services = [
//     { icon: Monitor, title: "UI/UX Design", description: "Creating intuitive and visually appealing user interfaces" },
//     { icon: Code, title: "Web Development", description: "Building robust and scalable web applications" },
//     { icon: Paintbrush, title: "Web Design & Redesign", description: "Crafting beautiful and functional websites" },
//     { icon: Cpu, title: "Software Development", description: "Developing custom software solutions for various needs" },
//     { icon: HeadphonesIcon, title: "IT Support", description: "Providing reliable technical support and maintenance" },
//     { icon: SearchIcon, title: "SEO Services", description: "Optimizing websites for better search engine rankings" },
//     // {
//     //   icon: MoreHorizontal,
//     //   title: "Other Services",
//     //   description: "Additional specialized services tailored to your needs",
//     // },
//   ]

//   return (
//     <div className={`flex flex-col min-h-screen overflow-hidden ${currentTheme.background}`}>

//         <PageHeader title="My" highlightedTitle="Services" subtitle="Explore range of services to elevate your digital presence." />

//         <main className="flex-grow">
//         <div className={`top-0 z-[-2] w-screen bg-[radial-gradient(#ffffff49_1px,transparent_1px)] bg-[size:30px_30px]`}>
//           <section className="w-full py-12 md:py-12">
//             <div className="container mx-auto px-4 md:px-6">
//               <motion.div
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
//               >
//                 {services.map((service, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: index * 0.1 }}
//                     className="group relative"
//                     onMouseEnter={() => setHoveredService(index)}
//                     onMouseLeave={() => setHoveredService(null)}
//                   >
//                     <motion.div
//                       className={`absolute inset-0 ${currentTheme.cardFrom} rounded-2xl`}
//                       animate={{
//                         rotate: hoveredService === index ? 6 : 3,
//                         scale: hoveredService === index ? 1.05 : 1,
//                       }}
//                       transition={{ duration: 0.3 }}
//                     />
//                     <motion.div
//                       className={`relative bg-gradient-to-br ${currentTheme.cardFrom} ${currentTheme.cardTo} p-6 rounded-2xl backdrop-blur-sm`}
//                       animate={{
//                         y: hoveredService === index ? -8 : 0,
//                         boxShadow:
//                           hoveredService === index
//                             ? "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
//                             : "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)",
//                       }}
//                       transition={{ duration: 0.3 }}
//                     >

//                       <motion.div
//                         animate={{
//                           scale: hoveredService === index ? 1.1 : 1,
//                         }}
//                         transition={{ duration: 0.3 }}
//                         className={currentTheme.icon}
//                       >
//                         <service.icon className="h-12 w-12 mb-4" />
//                       </motion.div>
//                       <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
//                       <p className={currentTheme.text}>{service.description}</p>
//                       <BorderBeam
//                         duration={10}
//                         size={200}
//                         reverse
//                         className={currentTheme.beam}
//                       />
//                     </motion.div>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </div>

//           </section>
//         </div>

//       </main>
//       <motion.div
//         className="fixed bottom-8 right-8 z-50"
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 0.5, delay: 1 }}
//       ><ThemeToggle />
//       <LiveChat />
//         <Button className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 shadow-lg transition-all duration-300 transform hover:scale-110">
//           <Mail className="h-6 w-6 text-[#002922]" />
//         </Button>
//       </motion.div>
//     </div>
//   )
// }
