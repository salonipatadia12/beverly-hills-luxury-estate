'use client'
import { useRef, useState, useEffect } from 'react'

export default function LocationSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect() } },
      { threshold: 0.3 }
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [])

  const LANDMARKS = [
    { name: 'Rodeo Drive',           distance: '2.1 miles' },
    { name: 'The Beverly Hills Hotel', distance: '1.8 miles' },
    { name: 'Greystone Mansion',     distance: '3.4 miles' },
    { name: 'UCLA',                  distance: '4.2 miles' },
    { name: 'Century City',          distance: '3.7 miles' },
    { name: 'Sunset Boulevard',      distance: '2.9 miles' },
  ]

  return (
    <section
      ref={ref}
      style={{
        background: '#FFFFFF',
        padding: '120px 80px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '80px',
      }}
    >
      {/* Left: Address card */}
      <div style={{
        flex: '0 0 420px',
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}>
        <div style={{
          background: '#F5F3EE',
          border: '1px solid rgba(0,0,0,0.08)',
          padding: '48px 40px',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.75rem',
            fontWeight: 300,
            color: '#0A0A0A',
            marginBottom: '24px',
            letterSpacing: '-0.01em',
          }}>
            Prime Location
          </h3>
          <div style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '15px',
            lineHeight: 1.7,
            color: 'rgba(0,0,0,0.65)',
            marginBottom: '20px',
          }}>
            <p style={{ margin: 0 }}>1234 Summit Ridge Drive</p>
            <p style={{ margin: '4px 0 0 0' }}>Beverly Hills, CA 90210</p>
          </div>
          <div style={{
            width: '40px',
            height: '1px',
            background: 'rgba(0,0,0,0.15)',
            margin: '28px 0',
          }} />
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            lineHeight: 1.65,
            color: 'rgba(0,0,0,0.55)',
            margin: 0,
          }}>
            Situated in one of Beverly Hills' most prestigious neighborhoods, offering unparalleled privacy and breathtaking city views.
          </p>
        </div>
      </div>

      {/* Right: Landmarks table */}
      <div style={{
        flex: 1,
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s',
      }}>
        <h4 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.24em',
          color: 'rgba(0,0,0,0.40)',
          marginBottom: '32px',
        }}>
          NEARBY LANDMARKS
        </h4>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1px',
          background: 'rgba(0,0,0,0.08)',
        }}>
          {LANDMARKS.map((lm, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 24px',
                background: '#FFFFFF',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                color: '#0A0A0A',
                fontWeight: 400,
              }}>
                {lm.name}
              </span>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                color: 'rgba(0,0,0,0.45)',
                fontWeight: 300,
              }}>
                {lm.distance}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
