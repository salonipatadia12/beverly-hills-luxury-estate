'use client'
import { useEffect, useState, useRef } from 'react'

export default function Hero() {
  const [revealed, setRevealed]     = useState(false)
  const [vidFailed, setVidFailed]   = useState(false)
  const videoRef                    = useRef<HTMLVideoElement>(null)

  // Trigger text reveal after 1.6s
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 1600)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="hero"
      aria-label="Property hero"
      style={{
        position:   'relative',
        width:      '100%',
        height:     '100vh',
        minHeight:  '700px',
        overflow:   'hidden',
        background: '#0A0A0A',
      }}
    >

      {/* ── Background: video if exists, else Ken Burns image ── */}
      {!vidFailed ? (
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVidFailed(true)}
          style={{
            position:   'absolute',
            inset:      0,
            width:      '100%',
            height:     '100%',
            objectFit:  'cover',
            objectPosition: 'center center',
          }}
        />
      ) : (
        <div
          aria-hidden="true"
          style={{
            position:           'absolute',
            inset:              0,
            backgroundImage:    "url('/hero-golden.jpg')",
            backgroundSize:     'cover',
            backgroundPosition: 'center center',
            animation:          'ken-burns 14s ease-out forwards',
            transformOrigin:    'center center',
          }}
        />
      )}

      {/* ── Gradient overlays — top and bottom ── */}
      {/* Top: darkens so navbar text is always readable */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.20) 35%, rgba(0,0,0,0.05) 55%, rgba(0,0,0,0.65) 80%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      {/* ── Hero text content — bottom left ── */}
      <div
        style={{
          position:   'absolute',
          bottom:     '72px',
          left:       '72px',
          maxWidth:   '760px',
          zIndex:     10,
          opacity:    revealed ? 1 : 0,
          transform:  revealed ? 'translateY(0px)' : 'translateY(28px)',
          transition: 'opacity 1.1s cubic-bezier(0.16,1,0.3,1), transform 1.1s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Gold eyebrow */}
        <p style={{
          fontFamily:    'var(--font-sans)',
          fontSize:      '11px',
          fontWeight:    500,
          letterSpacing: '0.26em',
          color:         '#E8C98A',
          marginBottom:  '18px',
          opacity:       revealed ? 1 : 0,
          transition:    'opacity 0.9s ease 0.1s',
        }}>
          BEVERLY HILLS, CALIFORNIA
        </p>

        {/* Thin gold separator line */}
        <div style={{
          width:         '32px',
          height:        '1px',
          background:    'rgba(232,201,138,0.5)',
          marginBottom:  '18px',
          opacity:       revealed ? 1 : 0,
          transition:    'opacity 0.8s ease 0.15s',
        }} />

        {/* Main headline — large serif, thin weight */}
        <h1
          style={{
            fontFamily:  'var(--font-serif)',
            fontWeight:  300,
            fontSize:    'clamp(3.2rem, 6.5vw, 7rem)',
            lineHeight:  0.95,
            color:       '#FFFFFF',
            marginBottom:'28px',
            letterSpacing: '-0.01em',
            opacity:       revealed ? 1 : 0,
            transform:     revealed ? 'translateY(0)' : 'translateY(20px)',
            transition:    'opacity 1s ease 0.2s, transform 1s ease 0.2s',
          }}
        >
          Modern Architectural<br />
          <em style={{ fontStyle: 'italic', fontWeight: 300 }}>Masterpiece</em>
        </h1>

        {/* Divider line */}
        <div style={{
          width:         '48px',
          height:        '1px',
          background:    'rgba(255,255,255,0.3)',
          marginBottom:  '28px',
          opacity:       revealed ? 1 : 0,
          transition:    'opacity 0.8s ease 0.4s',
        }} />

        {/* Subtitle */}
        <p style={{
          fontFamily:    'var(--font-sans)',
          fontSize:      '14px',
          fontWeight:    300,
          letterSpacing: '0.05em',
          color:         'rgba(255,255,255,0.60)',
          marginBottom:  '24px',
          opacity:       revealed ? 1 : 0,
          transition:    'opacity 0.8s ease 0.5s',
        }}>
          An extraordinary 6,500 sq ft contemporary estate.
        </p>

        {/* Price */}
        <p style={{
          fontFamily:    'var(--font-serif)',
          fontWeight:    300,
          fontSize:      'clamp(2rem, 3.5vw, 3rem)',
          color:         '#FFFFFF',
          letterSpacing: '0.02em',
          opacity:       revealed ? 1 : 0,
          transition:    'opacity 0.8s ease 0.6s',
        }}>
          $8,750,000
        </p>
      </div>

      {/* ── Scroll indicator — bottom center ── */}
      <div
        aria-hidden="true"
        style={{
          position:       'absolute',
          bottom:         '36px',
          left:           '50%',
          transform:      'translateX(-50%)',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            '10px',
          opacity:        revealed ? 0.8 : 0,
          transition:     'opacity 1s ease 1.8s',
        }}
      >
        <span style={{
          fontFamily:    'var(--font-sans)',
          fontSize:      '9px',
          letterSpacing: '0.28em',
          color:         'rgba(255,255,255,0.50)',
          fontWeight:    400,
        }}>
          SCROLL
        </span>
        <div style={{
          width:      '1px',
          height:     '52px',
          background: 'linear-gradient(to bottom, rgba(201,169,110,0.8), rgba(201,169,110,0))',
          animation:  'scroll-pulse 2.4s ease-in-out infinite',
        }} />
      </div>

    </section>
  )
}
