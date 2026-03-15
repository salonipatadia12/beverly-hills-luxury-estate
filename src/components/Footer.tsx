'use client'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background: '#0A0A0A',
        padding:    '60px 80px 40px',
        color:      '#FFFFFF',
        borderTop:  '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* Top row */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap:                 '80px',
          marginBottom:        '60px',
        }}>

          {/* Brand column */}
          <div>
            <p style={{
              fontFamily:    'var(--font-sans)',
              fontSize:      '11px',
              fontWeight:    500,
              letterSpacing: '0.26em',
              color:         '#FFFFFF',
              marginBottom:  '20px',
            }}>
              OBSIDIAN LUXURY REAL ESTATE
            </p>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontStyle:  'italic',
              fontSize:   '1.3rem',
              fontWeight: 300,
              color:      'rgba(255,255,255,0.60)',
              lineHeight: 1.6,
              maxWidth:   '360px',
            }}>
              Where extraordinary architecture meets unparalleled luxury living.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p style={{
              fontFamily:    'var(--font-sans)',
              fontSize:      '9px',
              fontWeight:    500,
              letterSpacing: '0.24em',
              color:         'rgba(255,255,255,0.40)',
              marginBottom:  '24px',
              textTransform: 'uppercase',
            }}>
              Navigation
            </p>
            {['Overview', 'Gallery', 'Amenities', 'Contact'].map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                style={{
                  display:       'block',
                  fontFamily:    'var(--font-sans)',
                  fontSize:      '13px',
                  fontWeight:    300,
                  color:         'rgba(255,255,255,0.55)',
                  marginBottom:  '12px',
                  transition:    'color 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#C9A96E'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{
              fontFamily:    'var(--font-sans)',
              fontSize:      '9px',
              fontWeight:    500,
              letterSpacing: '0.24em',
              color:         'rgba(255,255,255,0.40)',
              marginBottom:  '24px',
              textTransform: 'uppercase',
            }}>
              Contact
            </p>
            <a
              href="mailto:alexandra@obsidianluxury.com"
              style={{
                display:       'block',
                fontFamily:    'var(--font-sans)',
                fontSize:      '13px',
                fontWeight:    300,
                color:         'rgba(255,255,255,0.55)',
                marginBottom:  '12px',
                transition:    'color 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#C9A96E'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
            >
              alexandra@obsidianluxury.com
            </a>
            <a
              href="tel:+13105550124"
              style={{
                display:    'block',
                fontFamily: 'var(--font-sans)',
                fontSize:   '13px',
                fontWeight: 300,
                color:      'rgba(255,255,255,0.55)',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#C9A96E'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
            >
              +1 (310) 555-0124
            </a>
          </div>

        </div>

        {/* Divider */}
        <div style={{
          height:        '1px',
          background:    'rgba(255,255,255,0.08)',
          marginBottom:  '32px',
        }} />

        {/* Bottom row */}
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
        }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize:   '11px',
            fontWeight: 300,
            color:      'rgba(255,255,255,0.30)',
          }}>
            © {year} Beverly Hills Modern. All rights reserved.
          </p>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize:   '11px',
            fontWeight: 300,
            color:      'rgba(255,255,255,0.30)',
          }}>
            2847 Carla Ridge, Beverly Hills, CA 90210
          </p>
        </div>

      </div>
    </footer>
  )
}
