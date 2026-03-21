'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { assetPath } from '@/lib/assetPath'

// SVG Icons
const WaveIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12c.6-2.8 2.3-5 5-5s3.4 2.2 4 5c.6 2.8 2.3 5 5 5s3.4-2.2 4-5" />
    <path d="M2 17c.6-2.8 2.3-5 5-5s3.4 2.2 4 5c.6 2.8 2.3 5 5 5s3.4-2.2 4-5" />
  </svg>
)

const ChefHatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
    <line x1="6" y1="17" x2="18" y2="17" />
  </svg>
)

const FilmIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
    <line x1="7" y1="2" x2="7" y2="22" />
    <line x1="17" y1="2" x2="17" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="2" y1="7" x2="7" y2="7" />
    <line x1="2" y1="17" x2="7" y2="17" />
    <line x1="17" y1="17" x2="22" y2="17" />
    <line x1="17" y1="7" x2="22" y2="7" />
  </svg>
)

const WineGlassIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 22h8" />
    <path d="M12 11v11" />
    <path d="M19 3L5 3a2 2 0 0 0-2 2v3a6 6 0 0 0 6 6h6a6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
  </svg>
)

const LotusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3c-1.2 4.8-4.8 8.4-9.6 9.6 4.8 1.2 8.4 4.8 9.6 9.6 1.2-4.8 4.8-8.4 9.6-9.6-4.8-1.2-8.4-4.8-9.6-9.6z" />
  </svg>
)

const ChipIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </svg>
)

const AMENITIES = [
  {
    title: 'Infinity Pool',
    shortDesc: 'Vanishing-edge overlooking the canyon',
    longDesc: 'A breathtaking infinity-edge pool seamlessly blends with the canyon views. Heated year-round with integrated spa, underwater lighting, and automated maintenance system.',
    image: '/assets/pool.png',
    icon: WaveIcon
  },
  {
    title: 'Gourmet Kitchen',
    shortDesc: 'Wolf & Sub-Zero with marble island',
    longDesc: 'Professional-grade Wolf range, Sub-Zero refrigeration, and custom Italian cabinetry. Featuring a 12-foot Calacatta marble island, butler\'s pantry, and wine storage for 200 bottles.',
    image: '/assets/kitchen.png',
    icon: ChefHatIcon
  },
  {
    title: 'Private Theater',
    shortDesc: 'Dolby Atmos · 150-inch 4K screen',
    longDesc: 'State-of-the-art 12-seat cinema with Dolby Atmos surround sound, 4K laser projection, motorized recliners, and acoustic wall treatments for the ultimate viewing experience.',
    image: '/assets/private_home_theater.png',
    icon: FilmIcon
  },
  {
    title: 'Wine Cellar',
    shortDesc: 'Temperature-controlled · 500+ bottles',
    longDesc: 'Climate-controlled cellar with capacity for 500+ bottles, custom racking, tasting area, and dedicated humidity control. Perfect for the discerning collector.',
    image: '/assets/wine_cellar.png',
    icon: WineGlassIcon
  },
  {
    title: 'Spa Suite',
    shortDesc: 'Steam room, sauna & massage suite',
    longDesc: 'Private wellness retreat featuring steam room, Finnish sauna, massage suite, cold plunge pool, and dedicated relaxation lounge with canyon views.',
    image: '/assets/spa.png',
    icon: LotusIcon
  },
  {
    title: 'Smart Home',
    shortDesc: 'Full Crestron automation throughout',
    longDesc: 'Complete Crestron home automation controlling lighting, climate, security, audio/video, and window treatments. Voice-activated with remote access from anywhere in the world.',
    image: '/assets/smart_home.png',
    icon: ChipIcon
  }
]

const SPECS = [
  { value: 6500, label: 'SF', unit: '' },
  { value: 5, label: 'Bedrooms', unit: '' },
  { value: 6, label: 'Bathrooms', unit: '' },
  { value: 0.5, label: 'Acres', unit: '' },
  { value: 3, label: 'Car Garage', unit: '' }
]

// Count-up animation hook
function useCountUp(end: number, duration: number = 2000, decimals: number = 0) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!hasAnimated) return

    const steps = 60
    const increment = end / steps
    const stepDuration = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [end, duration, hasAnimated])

  return { count: decimals > 0 ? count.toFixed(decimals) : Math.floor(count), startAnimation: () => setHasAnimated(true) }
}

// Amenity Card Component
function AmenityCard({ amenity, index }: { amenity: typeof AMENITIES[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-100px' })

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  const Icon = amenity.icon

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        height: '400px',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer'
      }}
    >
      {/* Image with parallax */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          y: y
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '-10%',
            backgroundImage: `url(${assetPath(amenity.image)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: isHovered ? 'brightness(0.6)' : 'brightness(0.5)',
            transition: 'filter 0.4s ease'
          }}
        />
      </motion.div>

      {/* Dark gradient overlay */}
      <motion.div
        animate={{
          background: isHovered
            ? 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.7) 60%, transparent 100%)'
            : 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.4) 40%, transparent 100%)'
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1
        }}
      />

      {/* Content */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '32px',
        zIndex: 2
      }}>
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          style={{
            marginBottom: '16px'
          }}
        >
          <Icon />
        </motion.div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '28px',
          fontWeight: 300,
          color: 'white',
          marginBottom: '12px',
          lineHeight: 1.2
        }}>
          {amenity.title}
        </h3>

        {/* Short description (always visible) */}
        <p style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '14px',
          color: 'rgba(255,255,255,0.7)',
          marginBottom: '12px',
          lineHeight: 1.5
        }}>
          {amenity.shortDesc}
        </p>

        {/* Long description (hover reveal) */}
        <motion.div
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            height: isHovered ? 'auto' : 0,
            marginTop: isHovered ? 12 : 0
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            overflow: 'hidden'
          }}
        >
          <p style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.6
          }}>
            {amenity.longDesc}
          </p>
        </motion.div>

        {/* Hover indicator line */}
        <motion.div
          animate={{
            width: isHovered ? '60px' : '30px',
            opacity: isHovered ? 1 : 0.5
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            height: '2px',
            background: '#D4A853',
            marginTop: '16px'
          }}
        />
      </div>
    </motion.div>
  )
}

// Spec Bar Component
function SpecBar() {
  const specRef = useRef(null)
  const isInView = useInView(specRef, { once: true })

  return (
    <motion.div
      ref={specRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      style={{
        maxWidth: '1200px',
        margin: '0 auto 60px',
        padding: '32px 24px',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(212,168,83,0.12)',
        borderRadius: '12px',
        overflowX: 'auto'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: '40px',
        minWidth: '600px'
      }}>
        {SPECS.map((spec, index) => (
          <SpecItem key={spec.label} spec={spec} index={index} isInView={isInView} />
        ))}
      </div>
    </motion.div>
  )
}

function SpecItem({ spec, index, isInView }: { spec: typeof SPECS[0], index: number, isInView: boolean }) {
  const { count, startAnimation } = useCountUp(spec.value, 2000, spec.label === 'Acres' ? 1 : 0)

  useEffect(() => {
    if (isInView) {
      setTimeout(() => startAnimation(), index * 100)
    }
  }, [isInView, index, startAnimation])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        style={{
          textAlign: 'center',
          flex: 1
        }}
      >
        <div style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '36px',
          fontWeight: 300,
          color: '#D4A853',
          marginBottom: '8px',
          lineHeight: 1
        }}>
          {count}{spec.label === 'SF' ? '' : ''}
        </div>
        <div style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '11px',
          color: 'rgba(255,255,255,0.5)',
          textTransform: 'uppercase',
          letterSpacing: '0.15em'
        }}>
          {spec.label}
        </div>
      </motion.div>
      {index < SPECS.length - 1 && (
        <div style={{
          width: '1px',
          height: '50px',
          background: 'rgba(212,168,83,0.2)'
        }} />
      )}
    </>
  )
}

export default function Amenities() {
  return (
    <section
      id="amenities"
      style={{
        background: '#0A0A0A',
        padding: '40px 24px',
        position: 'relative',
        scrollSnapAlign: 'start',
      }}
    >
      {/* Section heading */}
      <div style={{
        textAlign: 'center',
        marginBottom: '60px'
      }}>
        <p style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.3em',
          color: '#D4A853',
          textTransform: 'uppercase',
          marginBottom: '16px'
        }}>
          AMENITIES
        </p>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(2.5rem, 4vw, 4rem)',
          fontWeight: 300,
          color: '#F5F0EB'
        }}>
          Premium Living
        </h2>
      </div>

      {/* Spec Bar */}
      <SpecBar />

      {/* Amenity Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {AMENITIES.map((amenity, index) => (
          <AmenityCard key={amenity.title} amenity={amenity} index={index} />
        ))}
      </div>

      {/* Responsive styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) {
          #amenities {
            padding: 40px 24px !important;
          }
        }
        @media (max-width: 768px) {
          #amenities > div:nth-child(3) {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          #amenities {
            padding: 32px 20px !important;
          }
        }
      `}} />
    </section>
  )
}
