'use client'
import { useEffect, useRef } from 'react'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    let lenis: any = null

    const init = async () => {
      try {
        const Lenis = (await import('lenis')).default
        lenis = new Lenis({
          duration: 1.4,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.5,
        })
        lenisRef.current = lenis

        let animId: number
        const raf = (time: number) => {
          lenis.raf(time)
          animId = requestAnimationFrame(raf)
        }
        animId = requestAnimationFrame(raf)

        return () => {
          cancelAnimationFrame(animId)
          lenis.destroy()
        }
      } catch (e) {
        // Lenis failed to load — page still works without smooth scroll
        console.warn('Lenis smooth scroll failed to initialize:', e)
      }
    }

    const cleanup = init()
    return () => {
      cleanup.then(fn => fn?.())
    }
  }, [])

  return <>{children}</>
}
