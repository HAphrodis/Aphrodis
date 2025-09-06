// "use client"

// import { Palette } from 'lucide-react'
// import { useTheme } from "@/providers/theme-provider2"
// import { Button } from "@/components/ui/button"
// import { motion } from "framer-motion"

// export function ThemeToggle() {
//   const { theme, cycleTheme } = useTheme() as { theme: keyof typeof themeColors; cycleTheme: () => void }
// //
//   const themeColors = {
//     emerald: "text-emerald-400",
//     cyberpunk: "text-purple-400",
//     ocean: "text-blue-400"
//   }

//   return (
//     <motion.div
//       initial={{ scale: 0 }}
//       animate={{ scale: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <Button
//         variant="ghost"
//         size="icon"
//         className={`relative h-12 w-12 rounded-full backdrop-blur-sm
//           data-[theme=emerald]:bg-gradient-to-br data-[theme=emerald]:from-emerald-800/50 data-[theme=emerald]:to-emerald-900/50
//           data-[theme=cyberpunk]:bg-gradient-to-br data-[theme=cyberpunk]:from-purple-900/50 data-[theme=cyberpunk]:to-pink-800/50
//           data-[theme=ocean]:bg-gradient-to-br data-[theme=ocean]:from-blue-800/50 data-[theme=ocean]:to-cyan-900/50
//         `}
//         onClick={cycleTheme}
//         data-theme={theme}
//       >
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Palette className={`h-6 w-6 ${themeColors[theme]}`} />
//         </motion.div>
//       </Button>
//     </motion.div>
//   )
// }
