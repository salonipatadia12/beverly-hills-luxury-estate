'use client'
import { useState } from 'react'

const FIELDS: { label: string; type?: string }[] = [
  { label: 'Full Name',       type: 'text' },
  { label: 'Email Address',   type: 'email' },
  { label: 'Phone Number',    type: 'tel' },
  { label: 'Preferred Date',  type: 'text' },
  { label: 'Preferred Time',  type: 'text' },
]

function FormField({ label, type = 'text' }: { label: string; type?: string }) {
  const [focused, setFocused] = useState(false)

  return (
    <div style={{ marginBottom: '40px' }}>
      <label style={{
        display:       'block',
        fontFamily:    'var(--font-sans)',
        fontSize:      '9px',
        fontWeight:    500,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color:         focused ? 'rgba(201,169,110,0.8)' : 'rgba(255,255,255,0.35)',
        marginBottom:  '12px',
        transition:    'color 0.3s ease',
      }}>
        {label}
      </label>
      <input
        type={type}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width:         '100%',
          background:    'transparent',
          border:        'none',
          borderBottom:  `1px solid ${focused ? '#C9A96E' : 'rgba(255,255,255,0.15)'}`,
          padding:       '10px 0',
          color:         '#FFFFFF',
          fontFamily:    'var(--font-sans)',
          fontSize:      '15px',
          fontWeight:    300,
          outline:       'none',
          transition:    'border-color 0.3s ease',
          caretColor:    '#C9A96E',
        }}
      />
    </div>
  )
}

export default function Contact() {
  const [btnHov, setBtnHov] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <section
      id="contact"
      aria-label="Schedule a viewing"
      style={{
        background: '#0A0A0A',
        padding:    '60px 80px',
        color:      '#FFFFFF',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* ── Header ── */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '28px' }}>
          <p style={{
            fontFamily:    'var(--font-sans)',
            fontSize:      '10px',
            fontWeight:    500,
            letterSpacing: '0.28em',
            color:         '#C9A96E',
            marginBottom:  '20px',
          }}>
            SCHEDULE YOUR VISIT
          </p>
          <h2 style={{
            fontFamily:    'var(--font-serif)',
            fontWeight:    300,
            fontSize:      'clamp(2rem, 3.5vw, 3rem)',
            lineHeight:    1.05,
            color:         '#FFFFFF',
            letterSpacing: '-0.01em',
            marginBottom:  '24px',
          }}>
            Begin Your<br />
            <em style={{ fontStyle: 'italic' }}>Journey</em>
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize:   '14px',
            fontWeight: 300,
            color:      'rgba(255,255,255,0.45)',
            maxWidth:   '460px',
            margin:     '0 auto',
            lineHeight: 1.8,
          }}>
            Our team is available to arrange a private viewing at your convenience, tailored entirely to your schedule.
          </p>
        </div>

        {/* ── Two columns ── */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:                 '120px',
          alignItems:          'start',
          marginTop:           '0px',
        }}>

          {/* Left — Form */}
          <div>
            {!submitted ? (
              <>
                {FIELDS.map(f => (
                  <FormField key={f.label} label={f.label} type={f.type} />
                ))}

                {/* Notes textarea */}
                <div style={{ marginBottom: '52px' }}>
                  <label style={{
                    display:       'block',
                    fontFamily:    'var(--font-sans)',
                    fontSize:      '9px',
                    fontWeight:    500,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color:         'rgba(255,255,255,0.35)',
                    marginBottom:  '12px',
                  }}>
                    Notes (Optional)
                  </label>
                  <textarea
                    rows={4}
                    style={{
                      width:         '100%',
                      background:    'transparent',
                      border:        '1px solid rgba(255,255,255,0.15)',
                      borderRadius:  '2px',
                      padding:       '14px',
                      color:         '#FFFFFF',
                      fontFamily:    'var(--font-sans)',
                      fontSize:      '14px',
                      fontWeight:    300,
                      outline:       'none',
                      resize:        'vertical',
                      caretColor:    '#C9A96E',
                      transition:    'border-color 0.3s ease',
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = '#C9A96E'}
                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="button"
                  onClick={() => setSubmitted(true)}
                  onMouseEnter={() => setBtnHov(true)}
                  onMouseLeave={() => setBtnHov(false)}
                  style={{
                    width:         '100%',
                    background:    'transparent',
                    border:        `1px solid ${btnHov ? '#C9A96E' : 'rgba(201,169,110,0.6)'}`,
                    color:         btnHov ? '#C9A96E' : '#FFFFFF',
                    padding:       '18px',
                    fontFamily:    'var(--font-sans)',
                    fontSize:      '11px',
                    fontWeight:    500,
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    cursor:        'pointer',
                    transition:    'color 0.3s ease, border-color 0.3s ease',
                  }}
                >
                  Request Viewing
                </button>
              </>
            ) : (
              <div style={{
                textAlign:  'center',
                padding:    '80px 40px',
                background: 'rgba(201,169,110,0.08)',
                border:     '1px solid rgba(201,169,110,0.25)',
              }}>
                <div style={{
                  width:         '56px',
                  height:        '56px',
                  borderRadius:  '50%',
                  background:    'rgba(201,169,110,0.15)',
                  margin:        '0 auto 24px',
                  display:       'flex',
                  alignItems:    'center',
                  justifyContent: 'center',
                  fontSize:      '28px',
                  color:         '#C9A96E',
                }}>
                  ✓
                </div>
                <h3 style={{
                  fontFamily:    'var(--font-serif)',
                  fontStyle:     'italic',
                  fontWeight:    300,
                  fontSize:      '1.6rem',
                  color:         '#FFFFFF',
                  marginBottom:  '16px',
                }}>
                  Thank You
                </h3>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize:   '13px',
                  fontWeight: 300,
                  color:      'rgba(255,255,255,0.50)',
                  lineHeight: 1.8,
                }}>
                  Your viewing request has been received. We'll contact you within 24 hours to confirm your appointment.
                </p>
              </div>
            )}
          </div>

          {/* Right — Agent info */}
          <div>
            <h3 style={{
              fontFamily:    'var(--font-serif)',
              fontStyle:     'italic',
              fontWeight:    300,
              fontSize:      '2rem',
              color:         '#FFFFFF',
              marginBottom:  '32px',
              letterSpacing: '-0.01em',
            }}>
              Meet Your Agent
            </h3>

            <div style={{ marginBottom: '44px' }}>
              <div style={{
                background:    'rgba(255,255,255,0.04)',
                border:        '1px solid rgba(255,255,255,0.08)',
                marginBottom:  '28px',
                padding:       '40px 32px',
              }}>
                <div style={{
                  width:          '80px',
                  height:         '80px',
                  borderRadius:   '50%',
                  background:     'rgba(201,169,110,0.12)',
                  border:         '1px solid rgba(201,169,110,0.25)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  margin:         '0 auto 24px',
                  fontFamily:     'var(--font-serif)',
                  fontSize:       '2rem',
                  fontWeight:     300,
                  color:          '#C9A96E',
                }}>
                  AS
                </div>
                <p style={{
                  textAlign:     'center',
                  fontFamily:    'var(--font-sans)',
                  fontSize:      '9px',
                  fontWeight:    500,
                  letterSpacing: '0.22em',
                  color:         'rgba(255,255,255,0.35)',
                  marginBottom:  '8px',
                }}>
                  EXCLUSIVE AGENT
                </p>
                <p style={{
                  textAlign:  'center',
                  fontFamily: 'var(--font-serif)',
                  fontSize:   '1.5rem',
                  fontWeight: 300,
                  color:      '#FFFFFF',
                }}>
                  Alexandra Sterling
                </p>
              </div>

              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize:   '13px',
                fontWeight: 300,
                color:      'rgba(255,255,255,0.40)',
                marginBottom: '28px',
              }}>
                Luxury Property Specialist
              </p>

              <div style={{
                height:        '1px',
                background:    'rgba(255,255,255,0.10)',
                marginBottom:  '28px',
              }} />

              <div style={{ marginBottom: '20px' }}>
                <p style={{
                  fontFamily:    'var(--font-sans)',
                  fontSize:      '9px',
                  fontWeight:    500,
                  letterSpacing: '0.20em',
                  color:         'rgba(255,255,255,0.35)',
                  marginBottom:  '8px',
                }}>
                  EMAIL
                </p>
                <a
                  href="mailto:alexandra@obsidianluxury.com"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize:   '14px',
                    fontWeight: 300,
                    color:      '#C9A96E',
                    transition: 'opacity 0.3s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  alexandra@obsidianluxury.com
                </a>
              </div>

              <div>
                <p style={{
                  fontFamily:    'var(--font-sans)',
                  fontSize:      '9px',
                  fontWeight:    500,
                  letterSpacing: '0.20em',
                  color:         'rgba(255,255,255,0.35)',
                  marginBottom:  '8px',
                }}>
                  PHONE
                </p>
                <a
                  href="tel:+13105550124"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize:   '14px',
                    fontWeight: 300,
                    color:      '#C9A96E',
                    transition: 'opacity 0.3s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  +1 (310) 555-0124
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
