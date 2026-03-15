'use client'
import { useEffect, useRef, useState } from 'react'

const AMENITIES = [
  { name: 'Smart Home Technology',   desc: 'Integrated Crestron automation controls lighting, climate, audio-visual, and security throughout with intuitive touch panels and mobile app.' },
  { name: 'Gourmet Kitchen',          desc: 'Professional Miele appliances, dual Sub-Zero refrigerators, custom Italian cabinetry, and a 12-foot Calacatta marble waterfall island.' },
  { name: 'Spa Master Suite',         desc: 'Panoramic canyon views, dual walk-in closets with custom built-ins, soaking tub, and rainfall shower in Venetian plaster.' },
  { name: 'Private Home Theater',     desc: 'State-of-the-art 12-seat cinema with 4K laser projection, Dolby Atmos surround sound, and acoustic paneling.' },
  { name: 'Wine Cellar',              desc: 'Temperature and humidity controlled vault for 1,200+ bottles with custom racking, tasting counter, and showcase lighting.' },
  { name: 'Infinity Pool & Spa',      desc: 'Vanishing edge design with integrated sun shelf, built-in spa, underwater speakers, and LED color-changing lighting.' },
  { name: 'Advanced Security',        desc: 'Multi-camera surveillance, biometric entry points, secure perimeter fencing, and 24/7 monitoring with mobile alerts.' },
  { name: 'Energy Efficient',         desc: 'Roof-mounted solar array, Tesla Powerwall battery backup, smart HVAC zoning, and triple-pane low-E windows.' },
  { name: 'Professional Gym',         desc: 'Commercial-grade fitness equipment, floor-to-ceiling mirrors, dedicated audio system, and spa-quality changing room.' },
  { name: 'Outdoor Entertainment',    desc: 'Built-in BBQ kitchen with pizza oven, multiple lounge zones, fire pit, and covered dining pavilion for al fresco entertaining.' },
  { name: '3-Car Garage',             desc: 'Climate controlled with polished epoxy floors, Tesla Wall Connectors, custom cabinetry, and direct residence access.' },
]

function AmenityCard({ item, delay }: { item: typeof AMENITIES[0]; delay: number }) {
  const ref           = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  const [hov, setHov] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect() } },
      { threshold: 0.1 }
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:   hov ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.70)',
        border:       `1px solid ${hov ? 'rgba(201,169,110,0.35)' : 'rgba(0,0,0,0.07)'}`,
        borderRadius: '2px',
        padding:      '40px 36px',
        opacity:      vis ? 1 : 0,
        transform:    vis ? 'translateY(0)' : 'translateY(28px)',
        transition:   `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms, background 0.3s ease, border-color 0.3s ease`,
        cursor:       'default',
      }}
    >
      {/* Gold accent bar */}
      <div style={{
        width:        hov ? '52px' : '40px',
        height:       '2px',
        background:   '#C9A96E',
        marginBottom: '28px',
        transition:   'width 0.3s ease',
      }} />

      {/* Name */}
      <h3 style={{
        fontFamily:    'var(--font-serif)',
        fontStyle:     'italic',
        fontWeight:    400,
        fontSize:      '1.25rem',
        lineHeight:    1.3,
        color:         '#0A0A0A',
        marginBottom:  '14px',
        letterSpacing: '0.01em',
      }}>
        {item.name}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize:   '13px',
        fontWeight: 300,
        lineHeight: 1.85,
        color:      'rgba(10,10,10,0.55)',
      }}>
        {item.desc}
      </p>
    </div>
  )
}

export default function Amenities() {
  const header      = useRef<HTMLDivElement>(null)
  const [hVis, setH] = useState(false)

  useEffect(() => {
    const el = header.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setH(true); ob.disconnect() } },
      { threshold: 0.2 }
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [])

  return (
    <section
      aria-label="Premium amenities"
      style={{
        background: '#F5F3EE',
        padding:    '140px 80px',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* ── Header ── */}
        <div
          ref={header}
          className="reveal"
          style={{
            textAlign:   'center',
            marginBottom: '80px',
            opacity:     hVis ? 1 : 0,
            transform:   hVis ? 'translateY(0)' : 'translateY(24px)',
            transition:  'opacity 0.9s ease, transform 0.9s ease',
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
            PREMIUM AMENITIES
          </p>
          <h2 style={{
            fontFamily:    'var(--font-serif)',
            fontWeight:    300,
            fontSize:      'clamp(2.8rem, 5vw, 5rem)',
            lineHeight:    1.05,
            color:         '#0A0A0A',
            letterSpacing: '-0.01em',
          }}>
            Uncompromising<br />
            <em style={{ fontStyle: 'italic' }}>Excellence</em>
          </h2>
        </div>

        {/* ── Card grid ── */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap:                 '20px',
        }}>
          {AMENITIES.map((item, i) => (
            <AmenityCard
              key={item.name}
              item={item}
              delay={i * 55}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
