'use client'

import { useEffect, useRef, useState } from 'react'

type CursorState = 'default' | 'link' | 'image'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [cursorState, setCursorState] = useState<CursorState>('default')
  const [isPressed, setIsPressed] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  // Mouse position (exact)
  const mousePos = useRef({ x: 0, y: 0 })
  // Ring position (lagged)
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Detect touch device
    const hasTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
    setIsTouchDevice(hasTouch)
    if (hasTouch) return

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }

      // Update dot position immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }

      // Check what element is being hovered
      const target = e.target

      // Type guard: ensure target is an HTMLElement
      if (!target || !(target instanceof HTMLElement)) {
        setCursorState('default')
        return
      }

      // Restore default cursor for form inputs and selects
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.hasAttribute('data-default-cursor')
      ) {
        setCursorState('default')
        target.style.cursor = 'auto'
        return
      }

      // Check for interactive elements
      const isLink = target.closest('a, button, [role="button"]')
      const isImage = target.closest('img, [data-cursor-image]')

      if (isImage) {
        setCursorState('image')
      } else if (isLink) {
        setCursorState('link')
      } else {
        setCursorState('default')
      }
    }

    const handleMouseDown = () => setIsPressed(true)
    const handleMouseUp = () => setIsPressed(false)

    // Smooth ring animation with RAF
    let rafId: number
    const animateRing = () => {
      if (!ringRef.current) return

      // Lerp/ease ring position (0.15 factor for lag)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15

      ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`
      rafId = requestAnimationFrame(animateRing)
    }

    // Start animation loop
    rafId = requestAnimationFrame(animateRing)

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  // Don't render on touch devices
  if (isTouchDevice) return null

  // Calculate sizes based on state
  const dotSize = cursorState === 'link' ? 4 : cursorState === 'image' ? 0 : 8
  const ringSize = cursorState === 'link' ? 48 : cursorState === 'image' ? 64 : 36

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          borderRadius: '50%',
          background: 'var(--color-accent-gold)',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
          willChange: 'transform',
          opacity: cursorState === 'image' ? 0 : 1,
          scale: isPressed ? '0.8' : '1',
        }}
      />

      {/* Outer Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          borderRadius: '50%',
          border: '1px solid var(--color-accent-gold)',
          background:
            cursorState === 'link'
              ? 'rgba(201, 169, 110, 0.1)'
              : 'transparent',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s ease, height 0.3s ease, background 0.3s ease',
          willChange: 'transform',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          scale: isPressed ? '0.8' : '1',
        }}
      >
        {/* "VIEW" text for images */}
        {cursorState === 'image' && (
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              color: 'var(--color-accent-gold)',
            }}
          >
            VIEW
          </span>
        )}
      </div>
    </>
  )
}
