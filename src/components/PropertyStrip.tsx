'use client'
import { useRef, useState, useEffect } from 'react'

const SPECS = [
  { value: '4',      label: 'BEDROOMS' },
  { value: '5.5',    label: 'BATHROOMS' },
  { value: '6,500',  label: 'SQ FT' },
  { value: '0.5',    label: 'ACRES' },
  { value: '2024',   label: 'YEAR BUILT' },
  { value: '3',      label: 'CAR GARAGE' },
]

export default function PropertyStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect() } },
      { threshold: 0.5 }
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        background:     '#0A0A0A',
        borderTop:      '1px solid rgba(255,255,255,0.06)',
        borderBottom:   '1px solid rgba(255,255,255,0.06)',
        padding:        '0 80px',
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'stretch',
        overflow:       'hidden',
      }}
    >
      {SPECS.map((spec, i) => (
        <div
          key={spec.label}
          style={{
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            padding:        '32px 24px',
            flex:           1,
            borderRight:    i < SPECS.length - 1
                              ? '1px solid rgba(255,255,255,0.07)'
                              : 'none',
            opacity:        vis ? 1 : 0,
            transform:      vis ? 'translateY(0)' : 'translateY(12px)',
            transition:     `opacity 0.6s ease ${i * 0.07}s, transform 0.6s ease ${i * 0.07}s`,
          }}
        >
          <span style={{
            fontFamily:    'var(--font-serif)',
            fontWeight:    300,
            fontSize:      '1.6rem',
            color:         '#FFFFFF',
            lineHeight:    1,
            marginBottom:  '6px',
            letterSpacing: '-0.01em',
          }}>
            {spec.value}
          </span>
          <span style={{
            fontFamily:    'var(--font-sans)',
            fontSize:      '8px',
            fontWeight:    500,
            letterSpacing: '0.22em',
            color:         'rgba(255,255,255,0.35)',
          }}>
            {spec.label}
          </span>
        </div>
      ))}
    </div>
  )
}
