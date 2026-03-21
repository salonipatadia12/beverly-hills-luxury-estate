'use client'
import { useEffect, useState, useRef } from 'react'
import { gsap } from '@/lib/animations'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { assetPath } from '@/lib/assetPath'

export default function Hero() {
  const [vidFailed, setVidFailed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const locationRef = useRef<HTMLParagraphElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const priceRef = useRef<HTMLParagraphElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Force video to play
  useEffect(() => {
    if (videoRef.current) {
      const playVideo = async () => {
        try {
          await videoRef.current?.play()
        } catch (err) {
          console.warn('Video autoplay failed, retrying...', err)
          // Retry on user interaction
          const playOnInteraction = () => {
            videoRef.current?.play()
            document.removeEventListener('click', playOnInteraction)
          }
          document.addEventListener('click', playOnInteraction)
        }
      }
      playVideo()
    }
  }, [])

  // GSAP entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 })

    // Location text fades in and slides up
    if (locationRef.current) {
      tl.fromTo(
        locationRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      )
    }

    // Heading animates word by word
    if (headingRef.current) {
      const words = headingRef.current.querySelectorAll('.word')
      tl.fromTo(
        words,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: 'power2.out' },
        '-=0.4'
      )
    }

    // Price fades in with scale
    if (priceRef.current) {
      tl.fromTo(
        priceRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      )
    }

    // Scroll indicator fades in and bounces
    if (scrollRef.current) {
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 0.8, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      )

      // Infinite bounce animation
      gsap.to(scrollRef.current, {
        y: 8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      })
    }

    return () => {
      tl.kill()
    }
  }, [])

  // Parallax effect on video
  useEffect(() => {
    if (!videoRef.current || !sectionRef.current) return

    const parallax = gsap.to(videoRef.current, {
      y: '20%',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    })

    return () => {
      parallax.kill()
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
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
          src={assetPath('/hero-video.mp4')}
          poster={assetPath('/hero-golden.jpg')}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => {
            videoRef.current?.play()
          }}
          onError={() => setVidFailed(true)}
          style={{
            position:   'absolute',
            inset:      0,
            width:      '100%',
            height:     '120%',
            objectFit:  'cover',
            objectPosition: 'center center',
            top: '-10%',
          }}
        />
      ) : (
        <div
          aria-hidden="true"
          style={{
            position:           'absolute',
            inset:              0,
            backgroundImage:    `url('${assetPath('/hero-golden.jpg')}')`,
            backgroundSize:     'cover',
            backgroundPosition: 'center center',
            animation:          'ken-burns 14s ease-out forwards',
            transformOrigin:    'center center',
          }}
        />
      )}

      {/* ── Enhanced gradient overlay for text readability ── */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.8) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Subtle radial gradient centered on text area ── */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Additional bottom gradient for text contrast ── */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          bottom:     0,
          left:       0,
          right:      0,
          height:     '50%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Hero text content — bottom left, refined typography ── */}
      <div
        ref={contentRef}
        style={{
          position:   'absolute',
          bottom:     '80px',
          left:       '60px',
          maxWidth:   '600px',
          zIndex:     10,
        }}
      >
        {/* Decorative gold accent line */}
        <div style={{
          width:         '40px',
          height:        '1px',
          background:    'var(--color-accent-gold)',
          marginBottom:  '12px',
        }} />

        {/* Gold eyebrow — smaller, more refined */}
        <p
          ref={locationRef}
          style={{
            fontFamily:    'var(--font-sans)',
            fontSize:      '9px',
            fontWeight:    500,
            letterSpacing: '0.35em',
            color:         'var(--color-accent-gold)',
            marginBottom:  '20px',
            opacity:       0,
          }}
        >
          BEVERLY HILLS
        </p>

        {/* Main headline — refined, whispers elegance */}
        <h1
          ref={headingRef}
          style={{
            fontFamily:  'var(--font-serif)',
            fontWeight:  300,
            fontSize:    'clamp(2rem, 3.5vw, 3.5rem)',
            lineHeight:  1.1,
            color:       '#FFFFFF',
            marginBottom:'32px',
            letterSpacing: '0.04em',
          }}
        >
          <span className="word" style={{ display: 'inline-block', marginRight: '0.25em' }}>Beverly</span>
          <span className="word" style={{ display: 'inline-block', marginRight: '0.25em' }}>Hills</span>
          <br />
          <span className="word" style={{ display: 'inline-block', color: 'var(--color-accent-gold)' }}>
            Modern
          </span>
        </h1>

        {/* Gold divider before price */}
        <div style={{
          width:         '40px',
          height:        '1px',
          background:    'var(--color-accent-gold)',
          marginBottom:  '20px',
        }} />

        {/* Price — more prominent now */}
        <p
          ref={priceRef}
          style={{
            fontFamily:    'var(--font-serif)',
            fontWeight:    300,
            fontSize:      'clamp(1.5rem, 2.5vw, 2.5rem)',
            color:         '#FFFFFF',
            letterSpacing: '0.15em',
            opacity:       0,
          }}
        >
          $8,750,000
        </p>
      </div>

      {/* ── Scroll indicator — bottom center with animated chevron ── */}
      <div
        ref={scrollRef}
        aria-hidden="true"
        style={{
          position:       'absolute',
          bottom:         '36px',
          left:           '50%',
          transform:      'translateX(-50%)',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            '12px',
          opacity:        0,
        }}
      >
        <span style={{
          fontFamily:    'var(--font-sans)',
          fontSize:      '9px',
          letterSpacing: '0.28em',
          color:         'var(--color-accent-gold)',
          fontWeight:    400,
        }}>
          SCROLL
        </span>
        {/* Animated chevron */}
        <svg
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          style={{
            animation: 'chevron-bounce 2s ease-in-out infinite',
          }}
        >
          <path
            d="M1 1L8 8L15 1"
            stroke="var(--color-accent-gold)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

    </section>
  )
}
