'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const LANDMARKS = [
  { name: 'Rodeo Drive', distance: '2.1 mi', label: 'Luxury Shopping', x: 65, y: 40 },
  { name: 'Beverly Hills Hotel', distance: '1.8 mi', label: 'Iconic Landmark', x: 35, y: 30 },
  { name: 'Sunset Strip', distance: '3.4 mi', label: 'Entertainment', x: 70, y: 70 },
  { name: 'Getty Center', distance: '4.2 mi', label: 'Arts & Culture', x: 20, y: 60 },
]

const NEIGHBORHOOD_HIGHLIGHTS = [
  { title: 'Walk Score', value: '72', label: 'Very Walkable' },
  { title: 'Rodeo Drive', value: '2.1 mi', label: 'Luxury Shopping' },
  { title: 'Beverly Hills Hotel', value: '1.8 mi', label: 'Iconic Landmark' },
  { title: 'Getty Center', value: '4.2 mi', label: 'Arts & Culture' },
]

export default function Location() {
  const [isMapHovered, setIsMapHovered] = useState(false)
  const [pulseVisible, setPulseVisible] = useState(true)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseVisible(prev => !prev)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="location"
      style={{
        position: 'relative',
        background: 'radial-gradient(ellipse at center, #151515 0%, #0A0A0A 70%)',
        padding: '120px 40px',
        overflow: 'hidden',
        scrollSnapAlign: 'start',
      }}
    >
      {/* Background pattern */}
      <div style={{
        position: 'absolute',
        inset: '0',
        opacity: 0.02,
        backgroundImage: 'radial-gradient(circle at 1px 1px, #D4A853 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      {/* Main Container */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Split Layout: 45% / 55% */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '45fr 55fr',
          gap: '80px',
          alignItems: 'start'
        }}>
          {/* LEFT SIDE - Location Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Section Label */}
            <p style={{
              color: '#D4A853',
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: '20px',
              fontWeight: 600,
              fontFamily: 'Outfit, sans-serif'
            }}>
              LOCATION
            </p>

            {/* Headline */}
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '42px',
              fontWeight: 300,
              color: 'white',
              marginBottom: '24px',
              lineHeight: 1.2
            }}>
              Prime Beverly Hills
            </h2>

            {/* Description */}
            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '16px',
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.7,
              marginBottom: '48px'
            }}>
              Minutes from Rodeo Drive, nestled among the most coveted estates in the world.
              Experience unparalleled access to luxury shopping, fine dining, and cultural landmarks
              that define the Beverly Hills lifestyle.
            </p>

            {/* Neighborhood Highlights Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px'
            }}>
              {NEIGHBORHOOD_HIGHLIGHTS.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(212,168,83,0.12)',
                    borderRadius: '8px',
                    padding: '20px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212,168,83,0.25)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212,168,83,0.12)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  }}
                >
                  <div style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '28px',
                    fontWeight: 300,
                    color: '#D4A853',
                    marginBottom: '8px',
                    lineHeight: 1
                  }}>
                    {highlight.value}
                  </div>
                  <div style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.5)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>
                    {highlight.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE - Interactive Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onMouseEnter={() => setIsMapHovered(true)}
            onMouseLeave={() => setIsMapHovered(false)}
            style={{
              position: 'relative',
              width: '100%',
              height: '600px',
              borderRadius: '12px',
              border: '1px solid rgba(212,168,83,0.2)',
              overflow: 'hidden',
              background: '#0A0A0A'
            }}
          >
            {/* Dark-themed Map Base */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #0F0F0F 0%, #0A0A0A 100%)'
            }}>
              {/* SVG Map Illustration */}
              <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                {/* Grid pattern */}
                <defs>
                  <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(212,168,83,0.06)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#map-grid)" />

                {/* Main Roads */}
                <motion.line
                  x1="0%" y1="35%" x2="100%" y2="35%"
                  stroke="rgba(212,168,83,0.15)"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1, delay: 0.3 }}
                />
                <motion.line
                  x1="0%" y1="65%" x2="100%" y2="65%"
                  stroke="rgba(212,168,83,0.15)"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1, delay: 0.4 }}
                />
                <motion.line
                  x1="30%" y1="0%" x2="30%" y2="100%"
                  stroke="rgba(212,168,83,0.12)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                <motion.line
                  x1="70%" y1="0%" x2="70%" y2="100%"
                  stroke="rgba(212,168,83,0.12)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />

                {/* Distance lines from center to landmarks */}
                {LANDMARKS.map((landmark, index) => (
                  <motion.line
                    key={`line-${landmark.name}`}
                    x1="50%" y1="50%"
                    x2={`${landmark.x}%`} y2={`${landmark.y}%`}
                    stroke="rgba(212,168,83,0.3)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  />
                ))}
              </svg>

              {/* Building blocks */}
              {[
                { top: '15%', left: '10%', w: '12%', h: '15%', delay: 0.5 },
                { top: '45%', left: '15%', w: '10%', h: '20%', delay: 0.6 },
                { top: '20%', right: '15%', w: '14%', h: '18%', delay: 0.7 },
                { top: '70%', left: '75%', w: '15%', h: '12%', delay: 0.8 },
                { top: '8%', left: '60%', w: '8%', h: '10%', delay: 0.65 },
                { top: '55%', right: '25%', w: '10%', h: '16%', delay: 0.75 },
              ].map((block, index) => (
                <motion.div
                  key={`block-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: block.delay }}
                  style={{
                    position: 'absolute',
                    top: block.top,
                    left: block.left,
                    right: block.right,
                    width: block.w,
                    height: block.h,
                    background: 'rgba(212,168,83,0.08)',
                    border: '1px solid rgba(212,168,83,0.1)',
                    borderRadius: '2px'
                  }}
                />
              ))}

              {/* Property Location - Center Gold Pulsing Pin */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}>
                {/* Pulsing circle */}
                <motion.div
                  animate={{
                    scale: pulseVisible ? [1, 1.5, 1] : 1,
                    opacity: pulseVisible ? [0.5, 0, 0.5] : 0
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(212,168,83,0.3)',
                    border: '2px solid rgba(212,168,83,0.5)'
                  }}
                />

                {/* Pin icon */}
                <motion.div
                  initial={{ scale: 0, y: -20 }}
                  animate={isInView ? { scale: 1, y: 0 } : {}}
                  transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.5 }}
                  style={{
                    position: 'relative',
                    zIndex: 10,
                    filter: 'drop-shadow(0 4px 12px rgba(212,168,83,0.6))'
                  }}
                >
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                      fill="#D4A853"
                    />
                    <circle cx="12" cy="9" r="2.5" fill="#0A0A0A" />
                  </svg>
                </motion.div>
              </div>

              {/* Landmark badges with distances */}
              {LANDMARKS.map((landmark, index) => (
                <motion.div
                  key={`badge-${landmark.name}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1 + index * 0.15 }}
                  style={{
                    position: 'absolute',
                    top: `${landmark.y}%`,
                    left: `${landmark.x}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 20
                  }}
                >
                  {/* Distance pill badge */}
                  <div style={{
                    background: 'rgba(10,10,10,0.95)',
                    border: '1px solid rgba(212,168,83,0.4)',
                    borderRadius: '20px',
                    padding: '6px 12px',
                    backdropFilter: 'blur(8px)',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                  }}>
                    <div style={{
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#D4A853',
                      letterSpacing: '0.05em'
                    }}>
                      {landmark.distance}
                    </div>
                    <div style={{
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: '9px',
                      color: 'rgba(255,255,255,0.5)',
                      marginTop: '2px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em'
                    }}>
                      {landmark.name}
                    </div>
                  </div>

                  {/* Small dot marker */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#D4A853',
                    border: '2px solid #0A0A0A',
                    boxShadow: '0 0 8px rgba(212,168,83,0.6)'
                  }} />
                </motion.div>
              ))}

              {/* Gradient overlay for depth */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 40%)',
                pointerEvents: 'none'
              }} />

              {/* Hover overlay */}
              <motion.div
                animate={{ opacity: isMapHovered ? 0.05 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at center, rgba(212,168,83,0.2) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }}
              />
            </div>

            {/* Map Label Overlay */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              zIndex: 30
            }}>
              <div style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '18px',
                fontStyle: 'italic',
                color: 'white',
                marginBottom: '4px'
              }}>
                Beverly Hills, CA
              </div>
              <div style={{
                fontFamily: 'monospace',
                fontSize: '11px',
                color: 'rgba(212,168,83,0.7)'
              }}>
                34.0736° N, 118.4004° W
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Responsive styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          #location {
            padding: 80px 24px !important;
          }
          #location > div > div:first-of-type {
            grid-template-columns: 1fr !important;
            gap: 50px !important;
          }
          #location > div > div:first-of-type > div:nth-child(2) {
            height: 400px !important;
          }
        }
        @media (max-width: 640px) {
          #location > div > div:first-of-type > div:first-child > div:last-of-type {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          #location {
            padding: 60px 20px !important;
          }
        }
      `}} />
    </section>
  )
}
