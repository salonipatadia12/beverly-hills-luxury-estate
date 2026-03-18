'use client'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/animations'

export default function Preloader() {
  const [hasLoaded, setHasLoaded] = useState(false)
  const preloaderRef = useRef<HTMLDivElement>(null)
  const brandRef = useRef<HTMLHeadingElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  // Prevent flash of content
  useLayoutEffect(() => {
    // Check if user has already visited
    const hasVisited = sessionStorage.getItem('hasVisited')
    if (hasVisited) {
      setHasLoaded(true)
      return
    }

    // Prevent scrolling during preloader
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  useEffect(() => {
    // Skip animation if already loaded
    const hasVisited = sessionStorage.getItem('hasVisited')
    if (hasVisited) {
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Mark as visited
        sessionStorage.setItem('hasVisited', 'true')

        // Allow scrolling
        document.body.style.overflow = 'unset'

        // Hide preloader
        setTimeout(() => {
          setHasLoaded(true)
        }, 100)
      }
    })

    // Animation sequence
    tl.fromTo(
      brandRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    )
    .fromTo(
      [lineRef.current, subtitleRef.current],
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 2, ease: 'power2.inOut' },
      '-=0.3'
    )
    .to(
      preloaderRef.current,
      {
        y: '-100vh',
        duration: 0.8,
        ease: 'power2.inOut',
        delay: 0.5
      }
    )

    return () => {
      tl.kill()
    }
  }, [])

  // Don't render if already loaded
  if (hasLoaded) {
    return null
  }

  return (
    <div
      ref={preloaderRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#F0ECE4',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
      }}
    >
      {/* Brand Name */}
      <h1
        ref={brandRef}
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 300,
          fontSize: 'clamp(32px, 6vw, 56px)',
          letterSpacing: '0.15em',
          color: '#0A0A0A',
          opacity: 0,
          textTransform: 'uppercase',
        }}
      >
        OBSIDIAN
      </h1>

      {/* Loading Line */}
      <div
        style={{
          width: '200px',
          height: '1px',
          background: 'rgba(10, 10, 10, 0.2)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          ref={lineRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#0A0A0A',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
          }}
        />
      </div>

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 400,
          fontSize: '11px',
          letterSpacing: '0.36em',
          color: '#888888',
          opacity: 0,
          textTransform: 'uppercase',
        }}
      >
        LUXURY REAL ESTATE
      </p>
    </div>
  )
}
