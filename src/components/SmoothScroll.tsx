'use client'
import { useEffect, useRef } from 'react'
import { initLenis } from '@/lib/animations'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    try {
      // Initialize Lenis with GSAP ScrollTrigger integration
      const { lenis, cleanup } = initLenis()
      cleanupRef.current = cleanup
    } catch (e) {
      // Lenis failed to load — page still works without smooth scroll
      console.warn('Lenis smooth scroll failed to initialize:', e)
    }

    // Cleanup on unmount
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
      }
    }
  }, [])

  return <>{children}</>
}
