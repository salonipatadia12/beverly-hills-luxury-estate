import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import PropertyStrip from '@/components/PropertyStrip'
import { CircularGallery } from '@/components/CircularGallery'
import Amenities from '@/components/Amenities'
import Location from '@/components/Location'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Marquee from '@/components/Marquee'
import { ScrollProgress } from '@/components/ScrollProgress'
import { BackToTop } from '@/components/BackToTop'
import { SectionIndicator } from '@/components/SectionIndicator'
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
      {/* Scroll UX Components */}
      <ScrollProgress />
      <BackToTop />
      <SectionIndicator />

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

      <div style={{ scrollSnapType: 'y proximity' }}>
        <Navbar />
        <Hero />
        <Marquee text="BEVERLY HILLS ◆ MODERN ARCHITECTURE ◆ LUXURY LIVING ◆ CALIFORNIA ESTATE ◆ BEVERLY HILLS ◆ MODERN ARCHITECTURE ◆ LUXURY LIVING ◆ CALIFORNIA ESTATE" />
        <PropertyStrip />

        {/* Gallery Section */}
        <main id="gallery" className="gallery-section" style={{
          background: '#0A0A0A',
          width: '100%',
          height: '110vh',
          scrollSnapAlign: 'start',
          overflowX: 'hidden',
        }}>
        <div className="gallery-sticky" style={{
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
      <Amenities />

      <Marquee text="PRIME LOCATION ◆ BEVERLY HILLS 90210 ◆ CANYON VIEWS ◆ PRESTIGIOUS ADDRESS ◆ PRIME LOCATION ◆ BEVERLY HILLS 90210 ◆ CANYON VIEWS ◆ PRESTIGIOUS ADDRESS" />

      {/* Location Section */}
      <Location />

        <Contact />
        <Footer />
      </div>
    </>
  )
}
