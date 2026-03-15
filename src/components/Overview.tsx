'use client'
import { useEffect, useRef, useState } from 'react'

/* ── Count-up hook ── */
function useCountUp(target: number, duration = 1800, startOnMount = false) {
  const [count, setCount]   = useState(0)
  const [active, setActive] = useState(startOnMount)
  const ref                 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!active) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const elapsed  = ts - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3)
      setCount(eased * target)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])

  return { count, ref }
}

/* ── Individual stat ── */
function Stat({
  target, label, isDecimal = false, formatted = false
}: {
  target: number
  label: string
  isDecimal?: boolean
  formatted?: boolean
}) {
  const { count, ref } = useCountUp(target, 1600)

  const display = isDecimal
    ? count.toFixed(1)
    : formatted
    ? Math.round(count).toLocaleString()
    : Math.round(count)

  return (
    <div
      ref={ref}
      style={{
        textAlign: 'center',
        flex:      '1',
      }}
    >
      <p style={{
        fontFamily:    'var(--font-serif)',
        fontWeight:    300,
        fontSize:      'clamp(3rem, 5vw, 4.5rem)',
        lineHeight:    1,
        color:         '#0A0A0A',
        letterSpacing: '-0.01em',
        marginBottom:  '10px',
      }}>
        {display}
      </p>
      <p style={{
        fontFamily:    'var(--font-sans)',
        fontSize:      '10px',
        fontWeight:    400,
        letterSpacing: '0.24em',
        color:         'rgba(10,10,10,0.45)',
        textTransform: 'uppercase',
      }}>
        {label}
      </p>
    </div>
  )
}

/* ── Fade-in observer hook ── */
function useFadeIn(threshold = 0.15) {
  const ref       = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect() } },
      { threshold }
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [threshold])

  return { ref, vis }
}

export default function Overview() {
  const heading  = useFadeIn(0.2)
  const statsRow = useFadeIn(0.2)
  const divider  = useFadeIn(0.3)
  const leftCol  = useFadeIn(0.15)
  const rightCol = useFadeIn(0.15)

  return (
    <section
      id="overview"
      aria-label="Property overview"
      style={{
        background:  '#F5F3EE',
        padding:     '120px 80px',
        overflow:    'hidden',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* ── Section header ── */}
        <div
          ref={heading.ref}
          className="reveal"
          style={{
            textAlign:   'center',
            marginBottom: '72px',
            opacity:      heading.vis ? 1 : 0,
            transform:    heading.vis ? 'translateY(0)' : 'translateY(24px)',
            transition:   'opacity 0.9s ease, transform 0.9s ease',
          }}
        >
          <p style={{
            fontFamily:    'var(--font-sans)',
            fontSize:      '10px',
            fontWeight:    500,
            letterSpacing: '0.28em',
            color:         '#C9A96E',
            marginBottom:  '20px',
          }}>
            PROPERTY OVERVIEW
          </p>
          <h2 style={{
            fontFamily:    'var(--font-serif)',
            fontWeight:    300,
            fontSize:      'clamp(2.8rem, 5vw, 5rem)',
            lineHeight:    1.05,
            color:         '#0A0A0A',
            letterSpacing: '-0.01em',
          }}>
            A Home That Defines<br />
            <em style={{ fontStyle: 'italic' }}>Modern Luxury</em>
          </h2>
        </div>

        {/* ── Stats row ── */}
        <div
          ref={statsRow.ref}
          style={{
            display:        'flex',
            justifyContent: 'center',
            gap:            '80px',
            marginBottom:   '72px',
            opacity:        statsRow.vis ? 1 : 0,
            transform:      statsRow.vis ? 'translateY(0)' : 'translateY(24px)',
            transition:     'opacity 1s ease 0.1s, transform 1s ease 0.1s',
          }}
        >
          <Stat target={4}    label="Bedrooms" />
          <Stat target={5.5}  label="Bathrooms"  isDecimal />
          <Stat target={6500} label="Square Feet" formatted />
          <Stat target={3}    label="Car Garage" />
        </div>

        {/* ── Divider ── */}
        <div
          ref={divider.ref}
          style={{
            height:        '1px',
            background:    'rgba(10,10,10,0.10)',
            marginBottom:  '80px',
            opacity:       divider.vis ? 1 : 0,
            transform:     divider.vis ? 'scaleX(1)' : 'scaleX(0.4)',
            transformOrigin: 'left',
            transition:    'opacity 0.8s ease, transform 0.9s ease',
          }}
        />

        {/* ── Two-column body ── */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:                 '100px',
          alignItems:          'start',
        }}>

          {/* Left column — text */}
          <div
            ref={leftCol.ref}
            style={{
              opacity:    leftCol.vis ? 1 : 0,
              transform:  leftCol.vis ? 'translateX(0)' : 'translateX(-24px)',
              transition: 'opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s',
            }}
          >
            <h3 style={{
              fontFamily:    'var(--font-serif)',
              fontStyle:     'italic',
              fontWeight:    300,
              fontSize:      'clamp(2rem, 3vw, 2.8rem)',
              lineHeight:    1.15,
              color:         '#0A0A0A',
              marginBottom:  '36px',
              letterSpacing: '-0.01em',
            }}>
              Where Vision<br />Meets Reality
            </h3>

            {[
              'Nestled in the exclusive hills of Beverly Hills, this contemporary estate represents the pinnacle of California luxury living. Designed by award-winning architects, every element celebrates the harmony between indoor and outdoor spaces.',
              'Floor-to-ceiling windows frame breathtaking canyon and city views, while the open-concept design creates an effortless flow throughout the 6,500 square feet of meticulously appointed living space.',
              'From the chef\'s kitchen with premium Italian appliances to the spa-inspired master suite, this residence offers an extraordinary lifestyle that few will ever experience.',
            ].map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily:    'var(--font-sans)',
                  fontSize:      '14px',
                  fontWeight:    300,
                  lineHeight:    1.9,
                  color:         'rgba(10,10,10,0.65)',
                  marginBottom:  i < 2 ? '24px' : '40px',
                }}
              >
                {para}
              </p>
            ))}

            <a
              href="#contact"
              style={{
                fontFamily:    'var(--font-sans)',
                fontSize:      '11px',
                fontWeight:    500,
                letterSpacing: '0.22em',
                color:         '#C9A96E',
                display:       'inline-flex',
                alignItems:    'center',
                gap:           '8px',
              }}
            >
              REQUEST FULL DETAILS
              <span style={{ fontSize: '14px' }}>→</span>
            </a>
          </div>

          {/* Right column — image with floating badge */}
          <div
            ref={rightCol.ref}
            style={{
              position:   'relative',
              opacity:    rightCol.vis ? 1 : 0,
              transform:  rightCol.vis ? 'translateX(0)' : 'translateX(24px)',
              transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
            }}
          >
            <div style={{ overflow: 'hidden', position: 'relative' }}>
              <img
                src="/hero-golden.jpg"
                alt="Beverly Hills estate exterior at golden hour"
                style={{
                  width:      '100%',
                  height:     '600px',
                  objectFit:  'cover',
                  objectPosition: 'center',
                  display:    'block',
                }}
              />
            </div>

            {/* Floating badge — overlaps bottom-right of image */}
            <div style={{
              position:   'absolute',
              bottom:     '-24px',
              right:      '-24px',
              background: '#0A0A0A',
              padding:    '28px 32px',
              zIndex:     10,
            }}>
              <p style={{
                fontFamily:    'var(--font-sans)',
                fontSize:      '9px',
                letterSpacing: '0.22em',
                color:         'rgba(255,255,255,0.45)',
                marginBottom:  '8px',
              }}>
                YEAR BUILT
              </p>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 300,
                fontSize:   '1.8rem',
                color:      '#FFFFFF',
                lineHeight: 1,
                marginBottom: '20px',
              }}>
                2024
              </p>
              <div style={{
                width:      '100%',
                height:     '1px',
                background: 'rgba(255,255,255,0.12)',
                marginBottom: '20px',
              }} />
              <p style={{
                fontFamily:    'var(--font-sans)',
                fontSize:      '9px',
                letterSpacing: '0.22em',
                color:         'rgba(255,255,255,0.45)',
                marginBottom:  '8px',
              }}>
                LOT SIZE
              </p>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 300,
                fontSize:   '1.4rem',
                color:      '#FFFFFF',
                lineHeight: 1,
              }}>
                0.5 Acres
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
