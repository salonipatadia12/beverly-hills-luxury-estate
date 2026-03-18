'use client'
import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/animations'

export default function Footer() {
  const year = new Date().getFullYear()
  const footerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    const content = contentRef.current
    if (!footer || !content) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }, footer)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      style={{
        background: '#0A0A0A',
        padding: '60px 80px 40px',
        color: '#FFFFFF',
        position: 'relative',
      }}
    >
      {/* Gold gradient top border */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: '1px',
        background: 'linear-gradient(to right, transparent 0%, rgba(212, 168, 83, 0.4) 20%, rgba(212, 168, 83, 0.6) 50%, rgba(212, 168, 83, 0.4) 80%, transparent 100%)',
      }} />
      <div ref={contentRef} style={{ maxWidth: '1400px', margin: '0 auto', opacity: 0 }}>

        {/* Top row */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap:                 '80px',
          marginBottom:        '60px',
        }}>

          {/* Brand column */}
          <div>
            <p style={{
              fontFamily:    'var(--font-sans)',
              fontSize:      '11px',
              fontWeight:    500,
              letterSpacing: '0.26em',
              color:         '#FFFFFF',
              marginBottom:  '20px',
            }}>
              OBSIDIAN LUXURY REAL ESTATE
            </p>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontStyle:  'italic',
              fontSize:   '1.3rem',
              fontWeight: 300,
              color:      'rgba(255,255,255,0.60)',
              lineHeight: 1.6,
              maxWidth:   '360px',
            }}>
              Where extraordinary architecture meets unparalleled luxury living.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p style={{
              fontFamily:    'var(--font-sans)',
              fontSize:      '9px',
              fontWeight:    500,
              letterSpacing: '0.24em',
              color:         'rgba(255,255,255,0.40)',
              marginBottom:  '24px',
              textTransform: 'uppercase',
            }}>
              Navigation
            </p>
            {['Overview', 'Gallery', 'Amenities', 'Contact'].map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.55)',
                  marginBottom: '12px',
                  transition: 'color 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#D4A853'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{
              fontFamily:    'var(--font-sans)',
              fontSize:      '9px',
              fontWeight:    500,
              letterSpacing: '0.24em',
              color:         'rgba(255,255,255,0.40)',
              marginBottom:  '24px',
              textTransform: 'uppercase',
            }}>
              Contact
            </p>
            <a
              href="mailto:alexandra@obsidianluxury.com"
              style={{
                display: 'block',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.55)',
                marginBottom: '12px',
                transition: 'color 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#D4A853'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
            >
              alexandra@obsidianluxury.com
            </a>
            <a
              href="tel:+13105550124"
              style={{
                display: 'block',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.55)',
                transition: 'color 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#D4A853'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
            >
              +1 (310) 555-0124
            </a>
          </div>

        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent 0%, rgba(212, 168, 83, 0.15) 50%, transparent 100%)',
          marginBottom: '32px',
        }} />

        {/* Bottom row */}
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
        }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize:   '11px',
            fontWeight: 300,
            color:      'rgba(255,255,255,0.30)',
          }}>
            © {year} Beverly Hills Modern. All rights reserved.
          </p>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize:   '11px',
            fontWeight: 300,
            color:      'rgba(255,255,255,0.30)',
          }}>
            2847 Carla Ridge, Beverly Hills, CA 90210
          </p>
        </div>

      </div>
    </footer>
  )
}
