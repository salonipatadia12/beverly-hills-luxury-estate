import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Lenis smooth scroll initializer
export function initLenis(): { lenis: Lenis; cleanup: () => void } {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  })

  // Sync Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  // Add Lenis tick to GSAP ticker
  const tickerCallback = (time: number) => {
    lenis.raf(time * 1000)
  }
  gsap.ticker.add(tickerCallback)

  gsap.ticker.lagSmoothing(0)

  // Refresh ScrollTrigger after Lenis initialization
  requestAnimationFrame(() => {
    ScrollTrigger.refresh()
  })

  // Return lenis instance and cleanup function
  const cleanup = () => {
    gsap.ticker.remove(tickerCallback)
    lenis.destroy()
  }

  return { lenis, cleanup }
}

// Reusable GSAP animation presets
export const animations = {
  fadeInUp: (element: gsap.DOMTarget, overrides = {}) => {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        ...overrides,
      }
    )
  },

  fadeInLeft: (element: gsap.DOMTarget, overrides = {}) => {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        x: -40,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
        ...overrides,
      }
    )
  },

  fadeInRight: (element: gsap.DOMTarget, overrides = {}) => {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        x: 40,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
        ...overrides,
      }
    )
  },

  scaleIn: (element: gsap.DOMTarget, overrides = {}) => {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        scale: 0.95,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        ...overrides,
      }
    )
  },

  staggerChildren: (parent: gsap.DOMTarget, childSelector: string, overrides = {}) => {
    const tl = gsap.timeline()
    tl.fromTo(
      `${parent as string} ${childSelector}`,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        ...overrides,
      }
    )
    return tl
  },
}

// Export GSAP and ScrollTrigger for direct use
export { gsap, ScrollTrigger }
