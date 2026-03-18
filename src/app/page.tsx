import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import PropertyStrip from '@/components/PropertyStrip'
import { CircularGallery } from '@/components/CircularGallery'
import { DirectionAwareHover } from '@/components/ui/direction-aware-hover'
import { LocationMap } from '@/components/ui/expand-map'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Marquee from '@/components/Marquee'
import Script from 'next/script'

export default function Home() {
  // JSON-LD Structured Data for Real Estate Listing
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    "name": "Modern Architectural Masterpiece",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1234 Summit Ridge Drive",
      "addressLocality": "Beverly Hills",
      "addressRegion": "CA",
      "postalCode": "90210",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "34.0901",
      "longitude": "-118.4065"
    },
    "offers": {
      "@type": "Offer",
      "price": "8750000",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2026-12-31"
    },
    "description": "Extraordinary 6,500 sq ft contemporary estate in Beverly Hills featuring 5 bedrooms, 6 bathrooms, infinity pool, home theater, wine cellar, and breathtaking canyon views.",
    "numberOfRooms": "5",
    "numberOfBathroomsTotal": "6",
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": "6500",
      "unitCode": "FTK"
    },
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Infinity Pool" },
      { "@type": "LocationFeatureSpecification", "name": "Home Theater" },
      { "@type": "LocationFeatureSpecification", "name": "Wine Cellar" },
      { "@type": "LocationFeatureSpecification", "name": "Smart Home Technology" },
      { "@type": "LocationFeatureSpecification", "name": "Professional Gym" },
      { "@type": "LocationFeatureSpecification", "name": "3-Car Garage" }
    ],
    "image": [
      "https://obsidianluxury.com/hero-golden.jpg",
      "https://obsidianluxury.com/hero-night.jpg",
      "https://obsidianluxury.com/gallery-pool.jpg"
    ]
  }

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#gallery"
        className="skip-to-content"
        style={{
          position: 'absolute',
          left: '-9999px',
          zIndex: 999,
          padding: '1rem',
          background: '#C9A96E',
          color: '#0A0A0A',
          textDecoration: 'none',
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          fontWeight: 500,
        }}
      >
        Skip to main content
      </a>

      {/* Structured Data */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Navbar />
      <Hero />
      <Marquee text="BEVERLY HILLS ◆ MODERN ARCHITECTURE ◆ LUXURY LIVING ◆ CALIFORNIA ESTATE ◆ BEVERLY HILLS ◆ MODERN ARCHITECTURE ◆ LUXURY LIVING ◆ CALIFORNIA ESTATE" />
      <PropertyStrip />

      {/* Gallery Section */}
      <main id="gallery" style={{
        background: '#0A0A0A',
        width: '100%',
        height: '500vh',
      }}>
        <div style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          {/* Minimal heading */}
          <div style={{
            position: 'absolute',
            top: '40px',
            zIndex: 10,
            textAlign: 'center',
          }}>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.3em',
              color: '#C9A96E',
              textTransform: 'uppercase',
            }}>
              VISUAL TOUR
            </span>
          </div>

          <div style={{ width: '100%', height: '100%' }}>
            <CircularGallery
              items={[
                { title: 'The Facade', subtitle: 'Exterior', src: '/hero-golden.jpg', alt: 'Estate at golden hour', objectPosition: 'center 40%' },
                { title: 'At Dusk', subtitle: 'Evening', src: '/hero-night.jpg', alt: 'Estate at night', objectPosition: 'center' },
                { title: 'The Pool', subtitle: 'Infinity Edge', src: '/gallery-pool.jpg', alt: 'Infinity pool', objectPosition: 'center 60%' },
                { title: 'Living', subtitle: 'Open Plan', src: '/gallery-interior-1.jpg', alt: 'Living space', objectPosition: 'center' },
                { title: 'Kitchen', subtitle: 'Gourmet', src: '/gallery-kitchen.jpg', alt: 'Chef kitchen', objectPosition: 'center' },
                { title: 'The Suite', subtitle: 'Master', src: '/gallery-bedroom.jpg', alt: 'Master suite', objectPosition: 'center' },
                { title: 'Canyon View', subtitle: 'Panorama', src: '/gallery-exterior-2.jpg', alt: 'Canyon view', objectPosition: 'center 30%' },
                { title: 'Interior', subtitle: 'Design', src: '/gallery-interior-2.jpg', alt: 'Interior detail', objectPosition: 'center' },
              ]}
              radius={700}
            />
          </div>

          {/* Scroll hint at bottom */}
          <div style={{
            position: 'absolute',
            bottom: '30px',
            zIndex: 10,
            textAlign: 'center',
          }}>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              letterSpacing: '0.2em',
              color: '#A09B93',
              textTransform: 'uppercase',
            }}>
              Scroll to explore
            </span>
          </div>
        </div>
      </main>

      <Marquee text="UNCOMPROMISING EXCELLENCE ◆ PREMIUM FINISHES ◆ ARCHITECTURAL VISION ◆ TIMELESS DESIGN ◆ UNCOMPROMISING EXCELLENCE ◆ PREMIUM FINISHES ◆ ARCHITECTURAL VISION ◆ TIMELESS DESIGN" />

      {/* Amenities Section */}
      <section id="amenities" style={{
        background: 'var(--color-bg-primary, #0A0A0A)',
        padding: '100px 24px',
        position: 'relative',
      }}>
        {/* Section heading */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
        }}>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.3em',
            color: 'var(--color-accent-gold, #C9A96E)',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '12px',
          }}>
            AMENITIES
          </span>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.5rem, 4vw, 4rem)',
            fontWeight: 300,
            color: 'var(--color-text-primary, #F5F0EB)',
          }}>
            <span className="text-shimmer">Premium Living</span>
          </h2>
        </div>

        {/* Grid of amenity cards with images */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <DirectionAwareHover
            imageUrl="/assets/pool.png"
            className="h-[350px] w-full"
          >
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 700, margin: 0 }}>
              Infinity Pool
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginTop: '4px' }}>
              Vanishing-edge overlooking the canyon
            </p>
          </DirectionAwareHover>

          <DirectionAwareHover
            imageUrl="/assets/kitchen.png"
            className="h-[350px] w-full"
          >
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 700, margin: 0 }}>
              Gourmet Kitchen
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginTop: '4px' }}>
              Wolf & Sub-Zero with marble island
            </p>
          </DirectionAwareHover>

          <DirectionAwareHover
            imageUrl="/assets/private_home_theater.png"
            className="h-[350px] w-full"
          >
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 700, margin: 0 }}>
              Private Theater
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginTop: '4px' }}>
              Dolby Atmos · 150-inch 4K screen
            </p>
          </DirectionAwareHover>

          <DirectionAwareHover
            imageUrl="/assets/wine_cellar.png"
            className="h-[350px] w-full"
          >
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 700, margin: 0 }}>
              Wine Cellar
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginTop: '4px' }}>
              Temperature-controlled · 500+ bottles
            </p>
          </DirectionAwareHover>

          <DirectionAwareHover
            imageUrl="/assets/spa.png"
            className="h-[350px] w-full"
          >
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 700, margin: 0 }}>
              Spa Suite
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginTop: '4px' }}>
              Steam room, sauna & massage suite
            </p>
          </DirectionAwareHover>

          <DirectionAwareHover
            imageUrl="/assets/smart_home.png"
            className="h-[350px] w-full"
          >
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 700, margin: 0 }}>
              Smart Home
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginTop: '4px' }}>
              Full Crestron automation throughout
            </p>
          </DirectionAwareHover>
        </div>

        {/* Responsive: on mobile, switch to 1 column */}
        <style>{`
          @media (max-width: 768px) {
            #amenities > div:last-of-type {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      <Marquee text="PRIME LOCATION ◆ BEVERLY HILLS 90210 ◆ CANYON VIEWS ◆ PRESTIGIOUS ADDRESS ◆ PRIME LOCATION ◆ BEVERLY HILLS 90210 ◆ CANYON VIEWS ◆ PRESTIGIOUS ADDRESS" />

      {/* Location Section */}
      <section id="location" style={{
        background: 'var(--color-bg-primary, #0A0A0A)',
        padding: '120px 24px',
        position: 'relative',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '80px',
          flexWrap: 'wrap',
        }}>
          {/* Left: Text content */}
          <div style={{ maxWidth: '400px' }}>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.3em',
              color: 'var(--color-accent-gold, #C9A96E)',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '16px',
            }}>
              LOCATION
            </span>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 300,
              color: 'var(--color-text-primary, #F5F0EB)',
              margin: '0 0 20px',
              lineHeight: 1.2,
            }}>
              <span className="text-shimmer">Prime Beverly Hills</span>
            </h2>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '16px',
              fontStyle: 'italic',
              color: 'var(--color-text-secondary, #A09B93)',
              lineHeight: 1.6,
              margin: '0 0 32px',
            }}>
              Minutes from Rodeo Drive, nestled among the most coveted estates in the world.
            </p>

            {/* Landmarks list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'Rodeo Drive', distance: '2.1 mi' },
                { name: 'Beverly Hills Hotel', distance: '1.8 mi' },
                { name: 'Sunset Strip', distance: '3.4 mi' },
                { name: 'Getty Center', distance: '4.2 mi' },
              ].map((landmark) => (
                <div key={landmark.name} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: 'rgba(20,20,20,0.6)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(201,169,110,0.06)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    color: 'var(--color-text-primary, #F5F0EB)',
                  }}>{landmark.name}</span>
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    color: 'var(--color-accent-gold, #C9A96E)',
                    letterSpacing: '0.05em',
                  }}>{landmark.distance}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive Map */}
          <LocationMap
            location="Beverly Hills, CA"
            address="1234 Summit Ridge Drive"
            coordinates="34.0736° N, 118.4004° W"
          />
        </div>
      </section>

      <Contact />
      <Footer />
    </>
  )
}
