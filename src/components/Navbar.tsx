'use client'
import { useEffect, useState, useCallback, useRef } from 'react'

const NAV_LINKS = [
  { label: 'GALLERY',   href: '#gallery' },
  { label: 'AMENITIES', href: '#amenities' },
  { label: 'LOCATION',  href: '#location' },
  { label: 'CONTACT',   href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string>('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Scroll detection for nav background transition
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 700)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Intersection Observer for active section detection
  useEffect(() => {
    const sections = NAV_LINKS.map(link => ({
      id: link.href.substring(1), // Remove '#'
      element: document.getElementById(link.href.substring(1))
    })).filter(s => s.element)

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach(section => {
      if (section.element) observer.observe(section.element)
    })

    return () => observer.disconnect()
  }, [])

  // Smooth scroll to section with offset for fixed nav
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)

    const targetId = href.substring(1)
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      const navHeight = 80
      const targetPosition = targetElement.offsetTop - navHeight

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Determine text color based on scroll position
  const textColor = scrolled ? 'rgba(245, 240, 235, 0.95)' : '#FFFFFF'

  // Link color with active state
  const linkColor = (label: string): string => {
    const href = NAV_LINKS.find(l => l.label === label)?.href.substring(1) || ''

    if (hoveredLink === label) return '#C9A96E'
    if (activeSection === href) return '#C9A96E'
    return textColor
  }

  // Check if link is active
  const isActive = (label: string): boolean => {
    const href = NAV_LINKS.find(l => l.label === label)?.href.substring(1) || ''
    return activeSection === href
  }

  return (
    <>
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
                                ? 'rgba(10, 10, 10, 0.92)'
                                : 'transparent',
          backdropFilter:     scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom:       scrolled
                                ? '1px solid rgba(201, 169, 110, 0.15)'
                                : '1px solid transparent',
          transition:         'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        }}
      >
        {/* ── Logo / Property name ── */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          aria-label="Return to top"
          style={{
            fontFamily:     'var(--font-sans)',
            fontSize:       '13px',
            fontWeight:     500,
            letterSpacing:  '0.15em',
            color:          textColor,
            transition:     'color 0.3s ease',
            userSelect:     'none',
            lineHeight:     1.4,
            display:        'flex',
            flexDirection:  'column',
            cursor:         'pointer',
          }}
        >
          <span>BEVERLY HILLS</span>
          <span>MODERN</span>
        </a>

        {/* ── Desktop Navigation links ── */}
        <div
          role="list"
          style={{
            display:    'flex',
            gap:        '44px',
            alignItems: 'center',
          }}
          className="desktop-nav"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => scrollToSection(e, href)}
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
              {/* Underline accent on hover or active */}
              <span style={{
                position:        'absolute',
                bottom:          0,
                left:            0,
                width:           (hoveredLink === label || isActive(label)) ? '100%' : '0%',
                height:          '1px',
                background:      '#C9A96E',
                transition:      'width 0.3s ease',
                display:         'block',
              }} />
            </a>
          ))}
        </div>

        {/* ── Mobile hamburger button ── */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          className="mobile-menu-button"
          style={{
            display:        'none',
            flexDirection:  'column',
            gap:            '5px',
            background:     'none',
            border:         'none',
            cursor:         'pointer',
            padding:        '8px',
          }}
        >
          <span style={{
            width:      '24px',
            height:     '1px',
            background: textColor,
            transition: 'all 0.3s ease',
            transform:  mobileMenuOpen ? 'rotate(45deg) translateY(6px)' : 'none',
          }} />
          <span style={{
            width:      '24px',
            height:     '1px',
            background: textColor,
            transition: 'all 0.3s ease',
            opacity:    mobileMenuOpen ? 0 : 1,
          }} />
          <span style={{
            width:      '24px',
            height:     '1px',
            background: textColor,
            transition: 'all 0.3s ease',
            transform:  mobileMenuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
          }} />
        </button>
      </nav>

      {/* ── Mobile fullscreen menu overlay ── */}
      <div
        style={{
          position:   'fixed',
          top:        0,
          left:       0,
          right:      0,
          bottom:     0,
          background: '#0A0A0A',
          zIndex:     99,
          display:    'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap:        '48px',
          transform:  mobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity:    mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
        }}
        className="mobile-menu"
      >
        {/* Close button */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close mobile menu"
          style={{
            position:   'absolute',
            top:        '24px',
            right:      '56px',
            background: 'none',
            border:     'none',
            color:      '#C9A96E',
            fontSize:   '32px',
            cursor:     'pointer',
            padding:    '8px',
          }}
        >
          ×
        </button>

        {/* Mobile nav links */}
        {NAV_LINKS.map(({ label, href }, index) => (
          <a
            key={label}
            href={href}
            onClick={(e) => scrollToSection(e, href)}
            style={{
              fontFamily:    'var(--font-sans)',
              fontSize:      '24px',
              fontWeight:    500,
              letterSpacing: '0.15em',
              color:         isActive(label) ? '#C9A96E' : 'rgba(245, 240, 235, 0.95)',
              transition:    'color 0.3s ease, transform 0.3s ease',
              cursor:        'pointer',
              transform:     mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity:       mobileMenuOpen ? 1 : 0,
              transitionDelay: mobileMenuOpen ? `${index * 0.1}s` : '0s',
            }}
          >
            {label}
          </a>
        ))}
      </div>

      {/* ── Styles for responsive behavior ── */}
      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-button {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}
