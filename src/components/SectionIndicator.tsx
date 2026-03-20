'use client';
import React, { useState, useEffect } from 'react';

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'gallery', label: 'Gallery' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'location', label: 'Location' },
  { id: 'contact', label: 'Contact' },
];

export function SectionIndicator() {
  const [activeSection, setActiveSection] = useState('');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navHeight = 80; // Approximate navbar height
      const targetPosition = section.offsetTop - navHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        right: '24px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        zIndex: 9998,
      }}
      className="section-indicator-desktop"
    >
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        const isHovered = hoveredSection === section.id;

        return (
          <div
            key={section.id}
            style={{ position: 'relative' }}
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <button
              onClick={() => scrollToSection(section.id)}
              aria-label={`Go to ${section.label}`}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                border: '1.5px solid #D4A853',
                backgroundColor: isActive ? '#D4A853' : 'transparent',
                cursor: 'pointer',
                padding: 0,
                transition: 'background-color 200ms ease, transform 200ms ease',
                transform: isHovered ? 'scale(1.3)' : 'scale(1)',
              }}
            />
            {/* Tooltip */}
            {isHovered && (
              <div
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(10, 10, 10, 0.95)',
                  color: '#D4A853',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  border: '1px solid rgba(212, 168, 83, 0.3)',
                  pointerEvents: 'none',
                }}
              >
                {section.label}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
