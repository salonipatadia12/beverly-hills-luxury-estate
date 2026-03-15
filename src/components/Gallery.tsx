'use client'
import { useState, useEffect, useCallback, useRef } from 'react'

const IMAGES = [
  { src: '/hero-golden.jpg',       alt: 'Estate exterior at golden hour',  span: '3fr' },
  { src: '/hero-night.jpg',        alt: 'Estate exterior at night',        span: '2fr' },
  { src: '/gallery-interior-1.jpg',alt: 'Open-plan living space',          span: '1fr' },
  { src: '/gallery-interior-2.jpg',alt: 'Interior looking outward',        span: '1fr' },
  { src: '/gallery-kitchen.jpg',   alt: 'Gourmet kitchen',                 span: '2fr' },
  { src: '/gallery-pool.jpg',      alt: 'Infinity pool at sunset',         span: '3fr' },
  { src: '/gallery-bedroom.jpg',   alt: 'Master suite',                    span: '2fr' },
  { src: '/gallery-exterior-2.jpg',alt: 'Side exterior',                   span: '3fr' },
]

export default function Gallery() {
  const [lightbox, setLightbox]     = useState<number | null>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  // Close lightbox on Escape
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setLightbox(null)
    if (e.key === 'ArrowRight' && lightbox !== null)
      setLightbox(prev => prev !== null ? Math.min(prev + 1, IMAGES.length - 1) : null)
    if (e.key === 'ArrowLeft' && lightbox !== null)
      setLightbox(prev => prev !== null ? Math.max(prev - 1, 0) : null)
  }, [lightbox])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  return (
    <section
      id="gallery"
      aria-label="Property gallery"
      style={{
        background: '#0A0A0A',
        padding:    '48px 80px',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* ── Section header ── */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <p style={{
            fontFamily:    'var(--font-sans)',
            fontSize:      '10px',
            fontWeight:    500,
            letterSpacing: '0.28em',
            color:         '#C9A96E',
            marginBottom:  '20px',
          }}>
            VISUAL TOUR
          </p>
          <h2 style={{
            fontFamily:    'var(--font-serif)',
            fontWeight:    300,
            fontSize:      'clamp(2rem, 3.5vw, 3rem)',
            lineHeight:    1.05,
            color:         '#FFFFFF',
            letterSpacing: '-0.01em',
          }}>
            Experience<br />
            <em style={{ fontStyle: 'italic' }}>The Beauty</em>
          </h2>
        </div>

        {/* ── Image grid ── */}
        {/* Row 1: 60 / 40 */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '4px', marginBottom: '4px' }}>
          {IMAGES.slice(0, 2).map((img, i) => (
            <ImageTile
              key={img.src}
              img={img}
              index={i}
              hovered={hoveredIdx === i}
              height="520px"
              onHover={setHoveredIdx}
              onClick={setLightbox}
            />
          ))}
        </div>

        {/* Row 2: 50 / 50 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginBottom: '4px' }}>
          {IMAGES.slice(2, 4).map((img, i) => (
            <ImageTile
              key={img.src}
              img={img}
              index={i + 2}
              hovered={hoveredIdx === i + 2}
              height="380px"
              onHover={setHoveredIdx}
              onClick={setLightbox}
            />
          ))}
        </div>

        {/* Row 3: 40 / 60 */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '4px', marginBottom: '4px' }}>
          {IMAGES.slice(4, 6).map((img, i) => (
            <ImageTile
              key={img.src}
              img={img}
              index={i + 4}
              hovered={hoveredIdx === i + 4}
              height="480px"
              onHover={setHoveredIdx}
              onClick={setLightbox}
            />
          ))}
        </div>

        {/* Row 4: 60 / 40 */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '4px' }}>
          {IMAGES.slice(6, 8).map((img, i) => (
            <ImageTile
              key={img.src}
              img={img}
              index={i + 6}
              hovered={hoveredIdx === i + 6}
              height="400px"
              onHover={setHoveredIdx}
              onClick={setLightbox}
            />
          ))}
        </div>

        {/* Horizontal drag-to-scroll strip */}
        <div style={{ marginTop: '4px' }}>
          <HorizontalStrip />
        </div>

      </div>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          onClick={() => setLightbox(null)}
          style={{
            position:        'fixed',
            inset:           0,
            background:      'rgba(0,0,0,0.93)',
            zIndex:          300,
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
          }}
        >
          {/* Prev button */}
          {lightbox > 0 && (
            <button
              aria-label="Previous image"
              onClick={e => { e.stopPropagation(); setLightbox(l => l !== null ? l - 1 : null) }}
              style={{
                position:    'absolute',
                left:        '32px',
                background:  'rgba(255,255,255,0.08)',
                border:      '1px solid rgba(255,255,255,0.15)',
                color:       '#FFFFFF',
                width:       '48px',
                height:      '48px',
                cursor:      'pointer',
                fontSize:    '20px',
                display:     'flex',
                alignItems:  'center',
                justifyContent: 'center',
              }}
            >‹</button>
          )}

          <img
            src={IMAGES[lightbox].src}
            alt={IMAGES[lightbox].alt}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth:   '88vw',
              maxHeight:  '88vh',
              objectFit:  'contain',
              boxShadow:  '0 40px 120px rgba(0,0,0,0.8)',
            }}
          />

          {/* Next button */}
          {lightbox < IMAGES.length - 1 && (
            <button
              aria-label="Next image"
              onClick={e => { e.stopPropagation(); setLightbox(l => l !== null ? l + 1 : null) }}
              style={{
                position:    'absolute',
                right:       '32px',
                background:  'rgba(255,255,255,0.08)',
                border:      '1px solid rgba(255,255,255,0.15)',
                color:       '#FFFFFF',
                width:       '48px',
                height:      '48px',
                cursor:      'pointer',
                fontSize:    '20px',
                display:     'flex',
                alignItems:  'center',
                justifyContent: 'center',
              }}
            >›</button>
          )}

          {/* Close */}
          <button
            aria-label="Close lightbox"
            onClick={() => setLightbox(null)}
            style={{
              position:    'absolute',
              top:         '24px',
              right:       '24px',
              background:  'rgba(255,255,255,0.08)',
              border:      '1px solid rgba(255,255,255,0.15)',
              color:       '#FFFFFF',
              width:       '40px',
              height:      '40px',
              cursor:      'pointer',
              fontSize:    '18px',
              display:     'flex',
              alignItems:  'center',
              justifyContent: 'center',
            }}
          >×</button>

          {/* Counter */}
          <p style={{
            position:      'absolute',
            bottom:        '24px',
            left:          '50%',
            transform:     'translateX(-50%)',
            fontFamily:    'var(--font-sans)',
            fontSize:      '11px',
            letterSpacing: '0.2em',
            color:         'rgba(255,255,255,0.35)',
          }}>
            {lightbox + 1} / {IMAGES.length}
          </p>
        </div>
      )}
    </section>
  )
}

/* ── Reusable tile ── */
function ImageTile({
  img, index, hovered, height, onHover, onClick
}: {
  img: typeof IMAGES[0]
  index: number
  hovered: boolean
  height: string
  onHover: (i: number | null) => void
  onClick: (i: number) => void
}) {
  return (
    <div
      style={{
        position:   'relative',
        overflow:   'hidden',
        cursor:     'pointer',
        height,
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(index)}
    >
      <img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        style={{
          width:          '100%',
          height:         '100%',
          objectFit:      'cover',
          objectPosition: 'center',
          display:        'block',
          transform:      hovered ? 'scale(1.06)' : 'scale(1)',
          transition:     'transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
      {/* Hover overlay */}
      <div style={{
        position:        'absolute',
        inset:           0,
        background:      hovered ? 'rgba(0,0,0,0.38)' : 'rgba(0,0,0,0)',
        transition:      'background 0.4s ease',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
      }}>
        <span style={{
          fontFamily:    'var(--font-sans)',
          fontSize:      '10px',
          fontWeight:    500,
          letterSpacing: '0.28em',
          color:         '#FFFFFF',
          opacity:       hovered ? 1 : 0,
          transform:     hovered ? 'translateY(0)' : 'translateY(8px)',
          transition:    'opacity 0.3s ease, transform 0.3s ease',
          border:        '1px solid rgba(255,255,255,0.4)',
          padding:       '10px 20px',
        }}>
          VIEW
        </span>
      </div>
    </div>
  )
}

/* ── Horizontal drag-to-scroll strip ── */
function HorizontalStrip() {
  const stripRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const STRIP_IMAGES = [
    { src: '/gallery-bedroom.jpg',    alt: 'Master suite' },
    { src: '/gallery-kitchen.jpg',    alt: 'Kitchen detail' },
    { src: '/gallery-interior-1.jpg', alt: 'Living space detail' },
    { src: '/gallery-pool.jpg',       alt: 'Pool edge detail' },
    { src: '/gallery-exterior-2.jpg', alt: 'Exterior detail' },
    { src: '/gallery-interior-2.jpg', alt: 'Interior detail' },
    { src: '/hero-night.jpg',         alt: 'Night exterior' },
  ]

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!stripRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - stripRef.current.offsetLeft)
    setScrollLeft(stripRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !stripRef.current) return
    e.preventDefault()
    const x = e.pageX - stripRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    stripRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => setIsDragging(false)
  const handleMouseLeave = () => setIsDragging(false)

  return (
    <div style={{ position: 'relative', background: '#0A0A0A', paddingTop: '4px' }}>
      {/* Hint text */}
      <div style={{
        textAlign: 'center',
        padding: '20px 0',
      }}>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '9px',
          letterSpacing: '0.26em',
          color: 'rgba(255,255,255,0.30)',
          fontWeight: 400,
        }}>
          DRAG TO EXPLORE →
        </span>
      </div>

      {/* Scrollable container */}
      <div
        ref={stripRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{
          display: 'flex',
          gap: '4px',
          overflowX: 'auto',
          overflowY: 'hidden',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingBottom: '4px',
        }}
        className="horizontal-scroll-strip"
      >
        {STRIP_IMAGES.map((img, i) => (
          <div
            key={i}
            style={{
              minWidth: '360px',
              height: '240px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              draggable={false}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                pointerEvents: 'none',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
