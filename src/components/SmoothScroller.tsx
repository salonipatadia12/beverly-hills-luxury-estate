'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { initLenis } from '@/lib/animations'
import type Lenis from 'lenis'

interface SmoothScrollerProps {
  children: ReactNode
}

export default function SmoothScroller({ children }: SmoothScrollerProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const { lenis, cleanup } = initLenis()
    lenisRef.current = lenis
    cleanupRef.current = cleanup

    // Cleanup on unmount
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
      }
    }
  }, [])

  return <>{children}</>
}
