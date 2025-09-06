// "use client"

// import { useState } from "react"
// import { useTheme } from "@/contexts/ThemeContext"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Moon, Sun, Palette } from "lucide-react"

// export function ThemeSwitcher() {
//   const { colorScheme, setColorScheme, isDarkMode, toggleDarkMode, customTheme, setCustomTheme } = useTheme()
//   const [isOpen, setIsOpen] = useState(false)

//   const handleCustomThemeChange = (key: string, value: string) => {
//     setCustomTheme((prev) => ({ ...prev, [key]: value }))
//     document.documentElement.style.setProperty(`--${key}`, value)
//   }

//   return (
//     <Popover open={isOpen} onOpenChange={setIsOpen}>
//       <PopoverTrigger asChild>
//         <Button variant="outline" size="icon">
//           <Palette className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-80">
//         <Tabs defaultValue="color-scheme">
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="color-scheme">Color Scheme</TabsTrigger>
//             <TabsTrigger value="custom">Custom Theme</TabsTrigger>
//           </TabsList>
//           <TabsContent value="color-scheme">
//             <div className="flex flex-col space-y-4 py-4">
//               <div className="flex items-center space-x-4">
//                 <Button
//                   variant={colorScheme === "emerald" ? "default" : "outline"}
//                   onClick={() => setColorScheme("emerald")}
//                 >
//                   Emerald
//                 </Button>
//                 <Button variant={colorScheme === "blue" ? "default" : "outline"} onClick={() => setColorScheme("blue")}>
//                   Blue
//                 </Button>
//                 <Button
//                   variant={colorScheme === "purple" ? "default" : "outline"}
//                   onClick={() => setColorScheme("purple")}
//                 >
//                   Purple
//                 </Button>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Sun className="h-[1.2rem] w-[1.2rem]" />
//                 <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
//                 <Button variant={isDarkMode ? "default" : "outline"} size="icon" onClick={toggleDarkMode}>
//                   {isDarkMode ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
//                 </Button>
//               </div>
//             </div>
//           </TabsContent>
//           <TabsContent value="custom">
//             <div className="flex flex-col space-y-4 py-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="primary-color">Primary Color</Label>
//                   <Input
//                     id="primary-color"
//                     type="color"
//                     value={customTheme["primary"] || "#10b981"}
//                     onChange={(e) => handleCustomThemeChange("primary", e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="secondary-color">Secondary Color</Label>
//                   <Input
//                     id="secondary-color"
//                     type="color"
//                     value={customTheme["secondary"] || "#6366f1"}
//                     onChange={(e) => handleCustomThemeChange("secondary", e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="background-color">Background Color</Label>
//                   <Input
//                     id="background-color"
//                     type="color"
//                     value={customTheme["background"] || "#ffffff"}
//                     onChange={(e) => handleCustomThemeChange("background", e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="text-color">Text Color</Label>
//                   <Input
//                     id="text-color"
//                     type="color"
//                     value={customTheme["text"] || "#000000"}
//                     onChange={(e) => handleCustomThemeChange("text", e.target.value)}
//                   />
//                 </div>
//               </div>
//               <Button onClick={() => setColorScheme("custom")}>Apply Custom Theme</Button>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </PopoverContent>
//     </Popover>
//   )
// }
