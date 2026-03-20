'use client'
import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/animations'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { formatNumber } from '@/hooks/useScrollReveal'

const SPECS = [
  { value: 4, decimals: 0, label: 'BEDROOMS' },
  { value: 5.5, decimals: 1, label: 'BATHROOMS' },
  { value: 6500, decimals: 0, label: 'SQ FT' },
  { value: 0.5, decimals: 1, label: 'ACRES' },
  { value: 2024, decimals: 0, label: 'YEAR BUILT' },
  { value: 3, decimals: 0, label: 'CAR GARAGE' },
]

export default function PropertyStrip() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardRefs.current
    const numbers = numberRefs.current

    if (!section || cards.length === 0) return

    const ctx = gsap.context(() => {
      // Animate cards sliding up and fading in with stagger
      gsap.fromTo(
        cards,
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
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          }
        }
      )

      // Animate numbers counting up
      numbers.forEach((numberEl, index) => {
        if (!numberEl) return

        const spec = SPECS[index]
        const obj = { value: 0 }

        gsap.to(obj, {
          value: spec.value,
          duration: 1.5,
          delay: index * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
          onUpdate: () => {
            numberEl.textContent = formatNumber(obj.value, spec.decimals)
          }
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <div
      style={{
        background:     'transparent',
        padding:        '8px 80px',
        overflow:       'hidden',
      }}
    >
      {/* Top gold gradient line */}
      <div style={{
        width: '80%',
        height: '1px',
        margin: '0 auto 24px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.3) 50%, transparent 100%)',
      }} />

      {/* Glass card stats row */}
      <div
        ref={sectionRef}
        style={{
          display:        'flex',
          justifyContent: 'center',
          alignItems:     'stretch',
          gap:            '16px',
          flexWrap:       'wrap',
        }}
      >
        {SPECS.map((spec, i) => (
          <div
            key={spec.label}
            ref={(el) => { cardRefs.current[i] = el }}
            className="glass-card"
            style={{
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              justifyContent: 'center',
              padding:        '24px 20px',
              minWidth:       '140px',
              opacity:        0,
              willChange:     'transform, opacity',
              borderRadius:   'var(--radius-md)',
            }}
          >
            <span
              ref={(el) => { numberRefs.current[i] = el }}
              className={`text-shimmer${i > 0 ? ` text-shimmer-delay-${i}` : ''}`}
              style={{
                fontFamily:    'var(--font-serif)',
                fontWeight:    300,
                fontSize:      'clamp(2rem, 3vw, 3rem)',
                lineHeight:    1,
                marginBottom:  '8px',
                letterSpacing: '-0.01em',
              }}
            >
              0
            </span>
            <span style={{
              fontFamily:    'var(--font-sans)',
              fontSize:      '9px',
              fontWeight:    500,
              letterSpacing: '0.2em',
              color:         'var(--color-text-secondary)',
              textAlign:     'center',
            }}>
              {spec.label}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom gold gradient line */}
      <div style={{
        width: '80%',
        height: '1px',
        margin: '24px auto 0',
        background: 'linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.3) 50%, transparent 100%)',
      }} />
    </div>
  )
}
