// "use client"

// import { createContext, useContext, useState } from "react"

// type ThemeType = "emerald" | "cyberpunk" | "ocean"

// type ThemeProviderProps = {
//   children: React.ReactNode
//   defaultTheme?: ThemeType
// }

// type ThemeProviderState = {
//   theme: ThemeType
//   setTheme: (theme: ThemeType) => void
//   cycleTheme: () => void
// }

// const initialState: ThemeProviderState = {
//   theme: "emerald",
//   setTheme: () => null,
//   cycleTheme: () => null,
// }

// const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

// const themes: ThemeType[] = ["emerald", "cyberpunk", "ocean"]

// export function ThemeProvider({
//   children,
//   defaultTheme = "emerald",
// }: ThemeProviderProps) {
//   const [theme, setTheme] = useState<ThemeType>(defaultTheme)

//   const cycleTheme = () => {
//     const currentIndex = themes.indexOf(theme)
//     const nextIndex = (currentIndex + 1) % themes.length
//     setTheme(themes[nextIndex])
//   }

//   return (
//     <ThemeProviderContext.Provider
//       value={{
//         theme,
//         setTheme,
//         cycleTheme,
//       }}
//     >
//       <div data-theme={theme}>
//         {children}
//       </div>
//     </ThemeProviderContext.Provider>
//   )
// }

// export const useTheme = () => {
//   const context = useContext(ThemeProviderContext)

//   if (context === undefined)
//     throw new Error("useTheme must be used within a ThemeProvider")

//   return context
// }
