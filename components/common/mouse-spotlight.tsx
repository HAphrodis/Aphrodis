"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { useMousePosition } from "@/hooks/use-mouse-position"

interface MouseSpotlightProps {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
  spotlightSize?: string
  intensity?: number
  animationDuration?: number
  disabled?: boolean
}

export function MouseSpotlight({
  children,
  className = "",
  spotlightColor = "16, 185, 129", // emerald-500 RGB
  spotlightSize = "50%",
  intensity = 0.15,
  animationDuration = 0.5,
  disabled = false,
}: MouseSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosition = useMousePosition()
  const controls = useAnimation()

  useEffect(() => {
    if (disabled || !containerRef.current || !mousePosition.x || !mousePosition.y) {
      return
    }

    const rect = containerRef.current.getBoundingClientRect()
    const x = mousePosition.x - rect.left
    const y = mousePosition.y - rect.top

    controls.start({
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(${spotlightColor}, ${intensity}) 0%, rgba(0, 0, 0, 0) ${spotlightSize})`,
    })
  }, [mousePosition, controls, disabled, spotlightColor, intensity, spotlightSize])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {children}
      {!disabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-80"
          animate={controls}
          transition={{
            type: "tween",
            ease: "backOut",
            duration: animationDuration,
          }}
        />
      )}
    </div>
  )
}
