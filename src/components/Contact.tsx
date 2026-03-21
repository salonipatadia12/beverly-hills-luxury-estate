'use client'
import { useState } from 'react'

// SVG Icons
const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
)

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
)

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
)

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
)

const TIME_SLOTS = [
  'Morning (9AM-12PM)',
  'Afternoon (12PM-4PM)',
  'Evening (4PM-7PM)',
  'Private Showing'
]

export default function Contact() {
  const [cardHov, setCardHov] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

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

  // Validation
  const validateField = (name: string, value: string): string => {
    if (name === 'name' && !value.trim()) {
      return 'Full name is required'
    }

    if (name === 'email') {
      if (!value.trim()) {
        return 'Email is required'
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address'
      }
    }

    if (name === 'phone') {
      if (!value.trim()) {
        return 'Phone number is required'
      }
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
    setFocusedField(null)
    const error = validateField(name, formValues[name])
    setFormErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = () => {
    // Validate all required fields
    const errors: Record<string, string> = {}
    const requiredFields = ['name', 'email', 'phone']

    requiredFields.forEach(field => {
      const error = validateField(field, formValues[field])
      if (error) errors[field] = error
    })

    setFormErrors(errors)
    setTouched(Object.fromEntries(requiredFields.map(f => [f, true])))

    if (Object.keys(errors).length === 0) {
      setSubmitted(true)
    }
  }

  // Base input style
  const getInputStyle = (fieldName: string) => ({
    width: '100%',
    height: '56px',
    background: 'rgba(255,255,255,0.06)',
    border: focusedField === fieldName ? '1px solid rgba(212,168,83,0.6)' : '1px solid rgba(212,168,83,0.25)',
    borderRadius: '10px',
    padding: '16px 20px',
    color: '#FFFFFF',
    fontSize: '16px',
    fontFamily: 'Outfit, sans-serif',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    boxSizing: 'border-box' as const,
    boxShadow: focusedField === fieldName ? '0 0 24px rgba(212,168,83,0.12)' : 'none'
  })

  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: 'rgba(212,168,83,0.7)',
    fontSize: '11px',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    marginBottom: '8px',
    fontFamily: 'Outfit, sans-serif'
  }

  const fieldWrapperStyle: React.CSSProperties = {
    marginBottom: '24px'
  }

  const errorStyle: React.CSSProperties = {
    color: 'rgba(239, 68, 68, 0.8)',
    fontSize: '12px',
    marginTop: '6px',
    fontFamily: 'Outfit, sans-serif'
  }

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        background: 'radial-gradient(ellipse at center, #151515 0%, #0A0A0A 70%)',
        padding: '120px 40px',
        overflow: 'hidden',
        scrollSnapAlign: 'start',
      }}
    >
      {/* Subtle background pattern */}
      <div style={{
        position: 'absolute',
        inset: '0',
        opacity: 0.02,
        backgroundImage: 'radial-gradient(circle at 1px 1px, #D4A853 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '80px',
        position: 'relative',
        zIndex: 10
      }}>
        <p style={{
          color: '#D4A853',
          fontSize: '11px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '20px',
          fontWeight: 600,
          fontFamily: 'Outfit, sans-serif'
        }}>
          SCHEDULE YOUR VISIT
        </p>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '56px',
          fontWeight: 300,
          color: 'white',
          marginBottom: '24px',
          lineHeight: 1.2
        }}>
          Begin Your{' '}
          <span style={{ fontStyle: 'italic', color: '#D4A853' }}>Journey</span>
        </h2>
        <div style={{
          height: '1px',
          width: '64px',
          background: '#D4A853',
          margin: '0 auto 24px'
        }} />
        <p style={{
          color: 'rgba(255,255,255,0.55)',
          fontSize: '14px',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.7,
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 300
        }}>
          Our team is available to arrange a private viewing at your convenience, tailored entirely to your schedule.
        </p>
      </div>

      {/* Main Container */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Two Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '3fr 2fr',
          gap: '60px',
          alignItems: 'start'
        }}>
          {/* LEFT COLUMN - FORM CARD */}
          <div>
            {!submitted ? (
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(212,168,83,0.15)',
                borderRadius: '16px',
                padding: '48px',
                backdropFilter: 'blur(20px)'
              }}>
                {/* Full Name */}
                <div style={fieldWrapperStyle}>
                  <label style={labelStyle}>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => handleFieldBlur('name')}
                    style={getInputStyle('name')}
                  />
                  {touched.name && formErrors.name && (
                    <p style={errorStyle}>{formErrors.name}</p>
                  )}
                </div>

                {/* Email + Phone - Side by Side */}
                <div className="input-row" style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                  marginBottom: '24px'
                }}>
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formValues.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => handleFieldBlur('email')}
                      style={getInputStyle('email')}
                    />
                    {touched.email && formErrors.email && (
                      <p style={errorStyle}>{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label style={labelStyle}>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formValues.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => handleFieldBlur('phone')}
                      style={getInputStyle('phone')}
                    />
                    {touched.phone && formErrors.phone && (
                      <p style={errorStyle}>{formErrors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Date + Time - Side by Side */}
                <div className="input-row" style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                  marginBottom: '24px'
                }}>
                  <div>
                    <label style={labelStyle}>Preferred Date</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        name="date"
                        value={formValues.date}
                        onChange={(e) => handleFieldChange('date', e.target.value)}
                        onFocus={() => setFocusedField('date')}
                        onBlur={() => handleFieldBlur('date')}
                        placeholder="Select a date"
                        style={{
                          ...getInputStyle('date'),
                          paddingRight: '48px'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'rgba(212,168,83,0.4)',
                        pointerEvents: 'none'
                      }}>
                        <CalendarIcon />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Preferred Time</label>
                    <div style={{ position: 'relative' }}>
                      <select
                        name="time"
                        value={formValues.time}
                        onChange={(e) => handleFieldChange('time', e.target.value)}
                        onFocus={() => setFocusedField('time')}
                        onBlur={() => handleFieldBlur('time')}
                        style={{
                          ...getInputStyle('time'),
                          appearance: 'none',
                          cursor: 'pointer',
                          paddingRight: '40px'
                        }}
                      >
                        <option value="" style={{ background: '#1A1A1A', color: '#999' }}>Select a time</option>
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot} style={{ background: '#1A1A1A', color: '#FFFFFF' }}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      <div style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'rgba(212,168,83,0.4)',
                        pointerEvents: 'none'
                      }}>
                        <ChevronDown />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes - Full Width */}
                <div style={fieldWrapperStyle}>
                  <label style={labelStyle}>Additional Notes (Optional)</label>
                  <textarea
                    name="notes"
                    value={formValues.notes}
                    onChange={(e) => handleFieldChange('notes', e.target.value)}
                    onFocus={() => setFocusedField('notes')}
                    onBlur={() => handleFieldBlur('notes')}
                    style={{
                      width: '100%',
                      height: '120px',
                      background: 'rgba(255,255,255,0.06)',
                      border: focusedField === 'notes' ? '1px solid rgba(212,168,83,0.6)' : '1px solid rgba(212,168,83,0.25)',
                      borderRadius: '10px',
                      padding: '16px 20px',
                      color: '#FFFFFF',
                      fontSize: '16px',
                      fontFamily: 'Outfit, sans-serif',
                      outline: 'none',
                      transition: 'border-color 0.3s, box-shadow 0.3s',
                      boxSizing: 'border-box',
                      resize: 'none',
                      boxShadow: focusedField === 'notes' ? '0 0 24px rgba(212,168,83,0.12)' : 'none'
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  style={{
                    width: '100%',
                    height: '58px',
                    background: '#D4A853',
                    color: '#0A0A0A',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'background 0.3s, transform 0.2s',
                    fontFamily: 'Outfit, sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#C49840'
                    e.currentTarget.style.transform = 'scale(1.01)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#D4A853'
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  Request Private Viewing
                </button>
                <p style={{
                  textAlign: 'center',
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.3)',
                  marginTop: '16px',
                  fontFamily: 'Outfit, sans-serif'
                }}>
                  Your information is kept strictly confidential
                </p>
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '80px 40px',
                background: 'rgba(212,168,83,0.08)',
                border: '1px solid rgba(212,168,83,0.25)',
                borderRadius: '16px'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(212,168,83,0.15)',
                  border: '2px solid #D4A853',
                  margin: '0 auto 28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D4A853',
                  fontSize: '32px',
                  fontWeight: 300
                }}>
                  ✓
                </div>
                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontStyle: 'italic',
                  fontSize: '32px',
                  color: 'white',
                  marginBottom: '16px'
                }}>
                  Thank You
                </h3>
                <p style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '14px',
                  lineHeight: 1.7,
                  maxWidth: '480px',
                  margin: '0 auto',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 300
                }}>
                  Your viewing request has been received. We'll contact you within 24 hours to confirm your appointment.
                </p>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN - AGENT CARD */}
          <div
            onMouseEnter={() => setCardHov(true)}
            onMouseLeave={() => setCardHov(false)}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: cardHov ? '1px solid rgba(212,168,83,0.3)' : '1px solid rgba(212,168,83,0.2)',
              borderRadius: '16px',
              padding: '48px 36px',
              textAlign: 'center',
              position: 'sticky',
              top: '120px',
              transition: 'all 0.5s ease',
              boxShadow: cardHov ? '0 8px 32px rgba(212,168,83,0.12)' : 'none'
            }}
          >
            {/* AS Monogram Circle */}
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              border: cardHov ? '2px solid rgba(212,168,83,0.7)' : '2px solid #D4A853',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#D4A853',
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '24px',
              transition: 'all 0.5s ease',
              boxShadow: cardHov ? '0 0 24px rgba(212,168,83,0.2)' : 'none'
            }}>
              AS
            </div>

            {/* Label */}
            <p style={{
              color: '#D4A853',
              fontSize: '10px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginTop: '20px',
              marginBottom: '12px',
              fontWeight: 600,
              fontFamily: 'Outfit, sans-serif'
            }}>
              EXCLUSIVE AGENT
            </p>

            {/* Name */}
            <h3 style={{
              color: 'white',
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '30px',
              marginBottom: '8px',
              fontWeight: 300
            }}>
              Alexandra Sterling
            </h3>

            {/* Title */}
            <p style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '14px',
              marginBottom: '24px',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 300
            }}>
              Luxury Property Specialist
            </p>

            {/* Divider */}
            <div style={{
              height: '1px',
              width: '40px',
              background: cardHov
                ? 'linear-gradient(to right, transparent, rgba(212, 168, 83, 0.6), transparent)'
                : 'linear-gradient(to right, transparent, rgba(212, 168, 83, 0.4), transparent)',
              margin: '24px auto',
              transition: 'all 0.5s ease'
            }} />

            {/* Contact Info */}
            <div style={{ marginBottom: '24px' }}>
              {/* Email */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  color: 'rgba(212,168,83,0.6)',
                  transition: 'color 0.3s ease'
                }}>
                  <EmailIcon />
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <p style={{
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                    fontFamily: 'Outfit, sans-serif'
                  }}>
                    Email
                  </p>
                  <a
                    href="mailto:alexandra@obsidianluxury.com"
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '14px',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      fontFamily: 'Outfit, sans-serif'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#D4A853' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
                  >
                    alexandra@obsidianluxury.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  color: 'rgba(212,168,83,0.6)',
                  transition: 'color 0.3s ease'
                }}>
                  <PhoneIcon />
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <p style={{
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                    fontFamily: 'Outfit, sans-serif'
                  }}>
                    Phone
                  </p>
                  <a
                    href="tel:+13105550124"
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '14px',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      fontFamily: 'Outfit, sans-serif'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#D4A853' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
                  >
                    +1 (310) 555-0124
                  </a>
                </div>
              </div>
            </div>

            {/* Schedule Call Button */}
            <div style={{
              paddingTop: '24px',
              borderTop: '1px solid rgba(212,168,83,0.1)'
            }}>
              <button
                style={{
                  width: '100%',
                  border: '1px solid rgba(212,168,83,0.4)',
                  background: 'transparent',
                  color: '#D4A853',
                  padding: '14px 32px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 600,
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(212,168,83,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                Schedule a Call
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          #contact > div > div {
            grid-template-columns: 1fr !important;
          }
          :global(.input-row) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
