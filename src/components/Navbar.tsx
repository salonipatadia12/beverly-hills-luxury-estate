'use client'
import { useEffect, useState, useCallback } from 'react'

const NAV_LINKS = [
  { label: 'OVERVIEW', href: '#overview' },
  { label: 'GALLERY',  href: '#gallery' },
  { label: 'INQUIRE',  href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 90)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const linkColor = (label: string): string => {
    if (hoveredLink === label) return '#C9A96E'
    return scrolled ? '#0A0A0A' : '#FFFFFF'
  }

  return (
    <nav
      aria-label="Main navigation"
      style={{
        position:           'fixed',
        top:                0,
        left:               0,
        right:              0,
        zIndex:             100,
        display:            'flex',
        justifyContent:     'space-between',
        alignItems:         'center',
        padding:            '24px 56px',
        background:         scrolled
                              ? 'rgba(240, 236, 228, 0.88)'
                              : 'transparent',
        backdropFilter:     scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom:       scrolled
                              ? '1px solid rgba(0,0,0,0.06)'
                              : '1px solid transparent',
        transition:         'background 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease',
      }}
    >
      {/* ── Logo / Property name ── */}
      <a
        href="#"
        aria-label="Return to top"
        style={{
          fontFamily:     'var(--font-sans)',
          fontSize:       '11px',
          fontWeight:     500,
          letterSpacing:  '0.22em',
          color:          scrolled ? '#0A0A0A' : '#FFFFFF',
          transition:     'color 0.5s ease',
          userSelect:     'none',
        }}
      >
        BEVERLY HILLS MODERN
      </a>

      {/* ── Navigation links ── */}
      <div
        role="list"
        style={{
          display:    'flex',
          gap:        '44px',
          alignItems: 'center',
        }}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            role="listitem"
            style={{
              fontFamily:    'var(--font-sans)',
              fontSize:      '11px',
              fontWeight:    500,
              letterSpacing: '0.22em',
              color:         linkColor(label),
              transition:    'color 0.25s ease',
              cursor:        'pointer',
              padding:       '4px 0',
              position:      'relative',
            }}
            onMouseEnter={() => setHoveredLink(label)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {label}
            {/* Underline accent on hover */}
            <span style={{
              position:        'absolute',
              bottom:          0,
              left:            0,
              width:           hoveredLink === label ? '100%' : '0%',
              height:          '1px',
              background:      '#C9A96E',
              transition:      'width 0.3s ease',
              display:         'block',
            }} />
          </a>
        ))}
      </div>
    </nav>
  )
}
