'use client'
import { useState, useRef, useEffect, forwardRef } from 'react'
import { gsap } from '@/lib/animations'

const FIELDS: { label: string; type: string; name: string; required: boolean }[] = [
  { label: 'Full Name', type: 'text', name: 'name', required: true },
  { label: 'Email Address', type: 'email', name: 'email', required: true },
  { label: 'Phone Number', type: 'tel', name: 'phone', required: true },
  { label: 'Preferred Date', type: 'date', name: 'date', required: false },
  { label: 'Preferred Time', type: 'time', name: 'time', required: false },
]

interface FormFieldProps {
  label: string
  type: string
  name: string
  required: boolean
  value: string
  error: string
  onChange: (value: string) => void
  onBlur: () => void
}

const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  function FormField({ label, type, name, required, value, error, onChange, onBlur }, ref) {
    const [focused, setFocused] = useState(false)
    const hasValue = value.length > 0
    const shouldFloat = focused || hasValue

    return (
      <div
        ref={ref}
        style={{
          marginBottom: '32px',
          opacity: 0,
          willChange: 'transform, opacity',
          position: 'relative'
        }}
      >
        <div style={{ position: 'relative' }}>
          {/* Floating label */}
          <label style={{
            position: 'absolute',
            left: 0,
            top: shouldFloat ? '-20px' : '12px',
            fontFamily: 'var(--font-sans)',
            fontSize: shouldFloat ? '11px' : '15px',
            fontWeight: 500,
            letterSpacing: shouldFloat ? '0.15em' : '0.02em',
            textTransform: 'uppercase',
            color: error ? '#E57373' : (focused ? '#D4A853' : 'rgba(255,255,255,0.4)'),
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: 'none',
            transformOrigin: 'left top',
            transform: shouldFloat ? 'scale(1)' : 'scale(1)',
          }}>
            {label}{required && ' *'}
          </label>

          {/* Input field */}
          <input
            type={type}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false)
              onBlur()
            }}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.03)',
              border: 'none',
              borderBottom: `2px solid ${error ? '#E57373' : (focused ? '#D4A853' : 'rgba(212, 168, 83, 0.2)')}`,
              borderRadius: '0',
              padding: '14px 0',
              color: '#F5F0EB',
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              fontWeight: 400,
              outline: 'none',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              caretColor: '#D4A853',
              boxShadow: focused && !error ? '0 2px 8px rgba(212, 168, 83, 0.15)' : 'none',
            }}
          />
        </div>

        {/* Error message */}
        {error && (
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            color: '#E57373',
            marginTop: '6px',
            animation: 'fadeIn 0.3s ease',
          }}>
            {error}
          </p>
        )}
      </div>
    )
  }
)

export default function Contact() {
  const [btnHov, setBtnHov] = useState(false)
  const [cardHov, setCardHov] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Form state
  const [formValues, setFormValues] = useState<Record<string, string>>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: ''
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const goldLineRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const fieldRefs = useRef<(HTMLDivElement | null)[]>([])
  const notesRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const agentCardRef = useRef<HTMLDivElement>(null)

  // Validation
  const validateField = (name: string, value: string): string => {
    const field = FIELDS.find(f => f.name === name)

    if (field?.required && !value.trim()) {
      return `${field.label} is required`
    }

    if (name === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address'
      }
    }

    if (name === 'phone' && value) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/
      if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
        return 'Please enter a valid phone number'
      }
    }

    return ''
  }

  const handleFieldChange = (name: string, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }))

    if (touched[name]) {
      const error = validateField(name, value)
      setFormErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleFieldBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, formValues[name])
    setFormErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = () => {
    // Validate all fields
    const errors: Record<string, string> = {}
    FIELDS.forEach(field => {
      const error = validateField(field.name, formValues[field.name])
      if (error) errors[field.name] = error
    })

    setFormErrors(errors)
    setTouched(Object.fromEntries(FIELDS.map(f => [f.name, true])))

    if (Object.keys(errors).length === 0) {
      setSubmitted(true)
    }
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        }
      })

      // Label fades in
      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        )
      }

      // Heading slides up
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.3'
        )
      }

      // Gold line expands
      if (goldLineRef.current) {
        tl.fromTo(
          goldLineRef.current,
          { width: '0%' },
          { width: '60px', duration: 0.8, ease: 'power2.out' },
          '-=0.4'
        )
      }

      // Description fades in
      if (descriptionRef.current) {
        tl.fromTo(
          descriptionRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        )
      }

      // Form fields stagger
      const validFields = fieldRefs.current.filter(Boolean)
      if (validFields.length > 0) {
        tl.fromTo(
          validFields,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out'
          },
          '-=0.5'
        )
      }

      // Notes field
      if (notesRef.current) {
        tl.fromTo(
          notesRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        )
      }

      // Submit button
      if (buttonRef.current) {
        tl.fromTo(
          buttonRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        )
      }

      // Agent card slides from right
      if (agentCardRef.current) {
        tl.fromTo(
          agentCardRef.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
          '-=1.2'
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-label="Schedule a viewing"
      style={{
        background: '#0A0A0A',
        padding: '120px 80px',
        color: '#FFFFFF',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <p
            ref={labelRef}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.28em',
              color: '#C9A96E',
              marginBottom: '20px',
              opacity: 0,
            }}
          >
            SCHEDULE YOUR VISIT
          </p>
          <h2
            ref={headingRef}
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 300,
              fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
              lineHeight: 1.05,
              color: '#FFFFFF',
              letterSpacing: '-0.01em',
              marginBottom: '20px',
              opacity: 0,
            }}
          >
            Begin Your{' '}
            <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>Journey</em>
          </h2>

          {/* Animated gold line */}
          <div
            ref={goldLineRef}
            style={{
              height: '1px',
              width: '0%',
              background: '#C9A96E',
              margin: '0 auto 24px',
            }}
          />

          <p
            ref={descriptionRef}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.55)',
              maxWidth: '540px',
              margin: '0 auto',
              lineHeight: 1.8,
              opacity: 0,
            }}
          >
            Our team is available to arrange a private viewing at your convenience, tailored entirely to your schedule.
          </p>
        </div>

        {/* ── Two columns ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '100px',
          alignItems: 'start',
        }}>
          {/* Left — Form */}
          <div>
            {!submitted ? (
              <>
                {FIELDS.map((field, i) => (
                  <FormField
                    key={field.name}
                    ref={(el) => { fieldRefs.current[i] = el }}
                    label={field.label}
                    type={field.type}
                    name={field.name}
                    required={field.required}
                    value={formValues[field.name]}
                    error={touched[field.name] ? formErrors[field.name] : ''}
                    onChange={(value) => handleFieldChange(field.name, value)}
                    onBlur={() => handleFieldBlur(field.name)}
                  />
                ))}

                {/* Notes textarea */}
                <div
                  ref={notesRef}
                  style={{
                    marginBottom: '48px',
                    opacity: 0,
                    willChange: 'transform, opacity',
                  }}
                >
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#C9A96E',
                    marginBottom: '12px',
                  }}>
                    Notes (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={formValues.notes}
                    onChange={(e) => setFormValues(prev => ({ ...prev, notes: e.target.value }))}
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.03)',
                      border: 'none',
                      borderBottom: '2px solid rgba(212, 168, 83, 0.2)',
                      borderRadius: '0',
                      padding: '14px 0',
                      color: '#F5F0EB',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '15px',
                      fontWeight: 300,
                      outline: 'none',
                      resize: 'vertical',
                      caretColor: '#D4A853',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    onFocus={e => {
                      e.currentTarget.style.borderBottom = '2px solid #D4A853'
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(212, 168, 83, 0.15)'
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderBottom = '2px solid rgba(212, 168, 83, 0.2)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {/* Submit button */}
                <button
                  ref={buttonRef}
                  type="button"
                  onClick={handleSubmit}
                  onMouseEnter={() => setBtnHov(true)}
                  onMouseLeave={() => setBtnHov(false)}
                  style={{
                    width: '100%',
                    background: btnHov
                      ? 'linear-gradient(135deg, #D4A853 0%, #C9A96E 100%)'
                      : 'rgba(212, 168, 83, 0.08)',
                    border: '2px solid #D4A853',
                    color: btnHov ? '#0A0A0A' : '#D4A853',
                    padding: '20px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    position: 'relative',
                    overflow: 'hidden',
                    transform: btnHov ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: btnHov ? '0 8px 24px rgba(212, 168, 83, 0.4)' : '0 4px 12px rgba(212, 168, 83, 0.1)',
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 1 }}>REQUEST VIEWING</span>
                  <span style={{
                    display: 'inline-block',
                    transform: btnHov ? 'translateX(4px)' : 'translateX(-4px)',
                    opacity: btnHov ? 1 : 0,
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    zIndex: 1,
                  }}>
                    →
                  </span>
                </button>
              </>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '80px 40px',
                background: 'rgba(201,169,110,0.08)',
                border: '1px solid rgba(201,169,110,0.25)',
                borderRadius: '2px',
                animation: 'fadeInScale 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(201,169,110,0.15)',
                  border: '2px solid #C9A96E',
                  margin: '0 auto 28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  color: '#C9A96E',
                  animation: 'checkmark 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both',
                }}>
                  ✓
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: '2rem',
                  color: '#FFFFFF',
                  marginBottom: '16px',
                }}>
                  Thank You
                </h3>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.60)',
                  lineHeight: 1.8,
                  maxWidth: '380px',
                  margin: '0 auto',
                }}>
                  Your viewing request has been received. We'll contact you within 24 hours to confirm your appointment.
                </p>
              </div>
            )}
          </div>

          {/* Right — Agent info */}
          <div
            ref={agentCardRef}
            onMouseEnter={() => setCardHov(true)}
            onMouseLeave={() => setCardHov(false)}
            style={{
              opacity: 0,
              willChange: 'transform, opacity',
              transform: cardHov ? 'translateY(-2px)' : 'translateY(0)',
              transition: 'transform 0.3s ease',
            }}
          >
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: '2rem',
              color: '#FFFFFF',
              marginBottom: '32px',
              letterSpacing: '-0.01em',
            }}>
              Meet Your Agent
            </h3>

            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${cardHov ? 'rgba(212, 168, 83, 0.3)' : 'rgba(255,255,255,0.08)'}`,
              padding: '40px 32px',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '4px',
              boxShadow: cardHov ? '0 8px 32px rgba(212, 168, 83, 0.15)' : 'none',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              {/* Subtle shimmer effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(212, 168, 83, 0.08), transparent)',
                animation: 'shimmer 4s infinite',
              }} />

              {/* Agent initials with gradient border */}
              <div style={{
                width: '88px',
                height: '88px',
                borderRadius: '50%',
                background: 'rgba(212,168,83,0.1)',
                border: cardHov ? '3px solid #D4A853' : '2px solid rgba(212, 168, 83, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                fontFamily: 'var(--font-serif)',
                fontSize: '2rem',
                fontWeight: 300,
                color: '#D4A853',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: cardHov ? 'scale(1.05) rotate(5deg)' : 'scale(1) rotate(0deg)',
                boxShadow: cardHov ? '0 4px 20px rgba(212, 168, 83, 0.3)' : 'none',
              }}>
                AS
              </div>

              <p style={{
                textAlign: 'center',
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.22em',
                color: '#C9A96E',
                marginBottom: '8px',
              }}>
                EXCLUSIVE AGENT
              </p>

              <p style={{
                textAlign: 'center',
                fontFamily: 'var(--font-serif)',
                fontSize: '1.5rem',
                fontWeight: 300,
                color: '#FFFFFF',
                marginBottom: '8px',
              }}>
                Alexandra Sterling
              </p>

              <p style={{
                textAlign: 'center',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.40)',
                marginBottom: '32px',
              }}>
                Luxury Property Specialist
              </p>

              <div style={{
                height: '1px',
                background: cardHov ? 'rgba(212, 168, 83, 0.4)' : 'rgba(212, 168, 83, 0.2)',
                marginBottom: '28px',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }} />

              {/* Email */}
              <div style={{ marginBottom: '20px' }}>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.20em',
                  color: 'rgba(255,255,255,0.35)',
                  marginBottom: '8px',
                }}>
                  EMAIL
                </p>
                <a
                  href="mailto:alexandra@obsidianluxury.com"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    fontWeight: 300,
                    color: '#D4A853',
                    position: 'relative',
                    display: 'inline-block',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#F5D98B'
                    const underline = e.currentTarget.querySelector('.underline') as HTMLElement
                    if (underline) underline.style.width = '100%'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#D4A853'
                    const underline = e.currentTarget.querySelector('.underline') as HTMLElement
                    if (underline) underline.style.width = '0%'
                  }}
                >
                  alexandra@obsidianluxury.com
                  <span className="underline" style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    width: '0%',
                    height: '1px',
                    background: '#D4A853',
                    transition: 'width 0.3s ease',
                  }} />
                </a>
              </div>

              {/* Phone */}
              <div>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.20em',
                  color: 'rgba(255,255,255,0.35)',
                  marginBottom: '8px',
                }}>
                  PHONE
                </p>
                <a
                  href="tel:+13105550124"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    fontWeight: 300,
                    color: '#D4A853',
                    position: 'relative',
                    display: 'inline-block',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#F5D98B'
                    const underline = e.currentTarget.querySelector('.underline') as HTMLElement
                    if (underline) underline.style.width = '100%'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#D4A853'
                    const underline = e.currentTarget.querySelector('.underline') as HTMLElement
                    if (underline) underline.style.width = '0%'
                  }}
                >
                  +1 (310) 555-0124
                  <span className="underline" style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    width: '0%',
                    height: '1px',
                    background: '#D4A853',
                    transition: 'width 0.3s ease',
                  }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Keyframe animations ── */}
      <style jsx>{`
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes checkmark {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
