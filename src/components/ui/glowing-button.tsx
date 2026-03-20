"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface GlowingButtonProps {
  children: React.ReactNode
  glowColor?: string
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export function GlowingButton({
  children,
  glowColor = "#D4A853",
  onClick,
  className = "",
  disabled = false,
}: GlowingButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Convert hex to RGB for use in rgba
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 212, g: 168, b: 83 } // Default gold
  }

  const rgb = hexToRgb(glowColor)

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      style={{
        width: "100%",
        background: isHovered
          ? `linear-gradient(135deg, ${glowColor} 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8) 100%)`
          : `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.08)`,
        border: `2px solid ${glowColor}`,
        color: isHovered ? "#0A0A0A" : glowColor,
        padding: "20px",
        fontFamily: "var(--font-sans)",
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        position: "relative",
        overflow: "hidden",
        borderRadius: "2px",
        opacity: disabled ? 0.5 : 1,
      }}
      whileHover={
        disabled
          ? {}
          : {
              scale: 1.02,
              boxShadow: `0 8px 32px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`,
            }
      }
      whileTap={disabled ? {} : { scale: 0.98 }}
      animate={{
        boxShadow: isHovered
          ? `0 8px 32px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5), 0 0 60px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`
          : `0 4px 12px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`,
      }}
    >
      {/* Animated glow background */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at center, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3) 0%, transparent 70%)`,
          opacity: 0,
          pointerEvents: "none",
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Shimmer effect */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, ${isHovered ? 0.3 : 0.1}), transparent)`,
          pointerEvents: "none",
        }}
        animate={{
          left: isHovered ? "100%" : "-100%",
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          ease: "linear",
        }}
      />

      {/* Content */}
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>

      {/* Arrow */}
      <motion.span
        style={{
          position: "relative",
          zIndex: 1,
        }}
        animate={{
          x: isHovered ? 4 : -4,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        →
      </motion.span>
    </motion.button>
  )
}
