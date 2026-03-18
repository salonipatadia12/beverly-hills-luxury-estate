import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/animations'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ScrollRevealOptions {
  start?: string
  end?: string
  once?: boolean
  markers?: boolean
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const elementRef = useRef<T>(null)

  const {
    start = 'top 80%',
    once = true,
    markers = false,
  } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start,
        markers,
        once,
        onEnter: () => {
          // Element is in view - animations can be triggered
        }
      })
    }, element)

    return () => ctx.revert()
  }, [start, once, markers])

  return elementRef
}

// Utility function to format numbers with commas
export function formatNumber(num: number, decimals: number = 0): string {
  if (decimals > 0) {
    return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return Math.round(num).toLocaleString('en-US')
}

// Counter animation utility
export function animateCounter(
  element: HTMLElement,
  endValue: number,
  duration: number = 1.5,
  decimals: number = 0,
  scrollTrigger?: object
) {
  const obj = { value: 0 }

  return gsap.to(obj, {
    value: endValue,
    duration,
    ease: 'power2.out',
    scrollTrigger,
    onUpdate: () => {
      element.textContent = formatNumber(obj.value, decimals)
    }
  })
}
