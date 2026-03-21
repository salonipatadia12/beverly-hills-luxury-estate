'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Footer() {
  const year = new Date().getFullYear()
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  const navigationLinks = ['Overview', 'Gallery', 'Amenities', 'Location', 'Contact']

  return (
    <footer
      className="footer-container"
      style={{
        background: '#0A0A0A',
        padding: '80px 80px 60px',
        color: '#FFFFFF',
        position: 'relative',
        borderTop: '1px solid rgba(212,168,83,0.08)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ maxWidth: '1400px', margin: '0 auto' }}
      >

        {/* Three-column layout */}
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '80px',
            marginBottom: '60px',
          }}
        >

          {/* COLUMN 1 — BRAND */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.3em',
              color: '#FFFFFF',
              marginBottom: '16px',
            }}>
              OBSIDIAN LUXURY REAL ESTATE
            </h3>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: '16px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.50)',
              lineHeight: 1.6,
              marginBottom: '20px',
            }}>
              Where extraordinary architecture meets unparalleled luxury living.
            </p>
            <div style={{
              width: '40px',
              height: '1px',
              background: '#D4A853',
            }} />
          </div>

          {/* COLUMN 2 — NAVIGATION */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.3em',
              color: '#D4A853',
              marginBottom: '24px',
              textTransform: 'uppercase',
            }}>
              NAVIGATION
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {navigationLinks.map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onMouseEnter={() => setHoveredLink(link)}
                  onMouseLeave={() => setHoveredLink(null)}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    fontWeight: 300,
                    color: hoveredLink === link ? 'rgba(255,255,255,0.80)' : 'rgba(255,255,255,0.40)',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* COLUMN 3 — CONNECT */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.3em',
              color: '#D4A853',
              marginBottom: '24px',
              textTransform: 'uppercase',
            }}>
              CONNECT
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <a
                href="mailto:alexandra@obsidianluxury.com"
                onMouseEnter={() => setHoveredLink('email')}
                onMouseLeave={() => setHoveredLink(null)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 300,
                  color: hoveredLink === 'email' ? 'rgba(255,255,255,0.80)' : 'rgba(255,255,255,0.40)',
                  transition: 'color 0.2s ease',
                }}
              >
                alexandra@obsidianluxury.com
              </a>
              <a
                href="tel:+13105550124"
                onMouseEnter={() => setHoveredLink('phone')}
                onMouseLeave={() => setHoveredLink(null)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 300,
                  color: hoveredLink === 'phone' ? 'rgba(255,255,255,0.80)' : 'rgba(255,255,255,0.40)',
                  transition: 'color 0.2s ease',
                }}
              >
                +1 (310) 555-0124
              </a>
            </div>

            {/* Social Icons */}
            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '24px',
              alignItems: 'center'
            }}>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredSocial('instagram')}
                onMouseLeave={() => setHoveredSocial(null)}
                style={{
                  transform: hoveredSocial === 'instagram' ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.2s ease',
                }}
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9Z" fill="#D4A853"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredSocial('linkedin')}
                onMouseLeave={() => setHoveredSocial(null)}
                style={{
                  transform: hoveredSocial === 'linkedin' ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.2s ease',
                }}
                aria-label="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452H16.893V14.883C16.893 13.555 16.866 11.846 15.041 11.846C13.188 11.846 12.905 13.291 12.905 14.785V20.452H9.351V9H12.765V10.561H12.811C13.288 9.661 14.448 8.711 16.181 8.711C19.782 8.711 20.448 11.081 20.448 14.166L20.447 20.452ZM5.337 7.433C4.193 7.433 3.274 6.507 3.274 5.368C3.274 4.23 4.194 3.305 5.337 3.305C6.477 3.305 7.401 4.23 7.401 5.368C7.401 6.507 6.476 7.433 5.337 7.433ZM7.119 20.452H3.555V9H7.119V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.227 0.792 24 1.771 24H22.222C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0H22.225Z" fill="#D4A853"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredSocial('facebook')}
                onMouseLeave={() => setHoveredSocial(null)}
                style={{
                  transform: hoveredSocial === 'facebook' ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.2s ease',
                }}
                aria-label="Facebook"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z" fill="#D4A853"/>
                </svg>
              </a>
            </div>

            {/* Schedule Viewing Button */}
            <a
              href="#contact"
              onMouseEnter={() => setHoveredLink('schedule')}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                color: '#D4A853',
                border: '1px solid #D4A853',
                borderRadius: '2px',
                textTransform: 'uppercase',
                transition: 'all 0.2s ease',
                background: hoveredLink === 'schedule' ? 'rgba(212,168,83,0.1)' : 'transparent',
              }}
            >
              Schedule a Viewing
            </a>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div style={{
          borderTop: '1px solid rgba(212,168,83,0.1)',
          paddingTop: '32px',
          marginBottom: '20px',
        }}>
          <div
            className="footer-bottom"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.30)',
            }}>
              © {year} Beverly Hills Modern. All rights reserved.
            </p>
            <a
              href="https://saykeel.com"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredLink('keel')}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 300,
                color: hoveredLink === 'keel' ? 'rgba(255,255,255,0.50)' : 'rgba(255,255,255,0.30)',
                transition: 'color 0.2s ease',
              }}
            >
              Crafted by Keel
            </a>
          </div>
        </div>

        {/* LEGAL */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '10px',
          fontWeight: 300,
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.20)',
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center',
        }}>
          All renderings and imagery are for illustrative purposes. MLS# TBD. Presented by Obsidian Luxury Real Estate, DRE# TBD.
        </p>

      </motion.div>

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .footer-container {
            padding: 60px 40px 40px !important;
          }
          .footer-grid {
            gap: 60px !important;
          }
        }

        @media (max-width: 768px) {
          .footer-container {
            padding: 50px 24px 40px !important;
          }
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            gap: 12px !important;
            text-align: center !important;
          }
        }

        @media (max-width: 480px) {
          .footer-container {
            padding: 40px 20px 32px !important;
          }
        }
      `}</style>
    </footer>
  )
}
