'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Lightbox } from './Lightbox';
import { assetPath } from '@/lib/assetPath';

export interface GalleryItem {
  title: string;
  subtitle: string;
  src: string;
  alt: string;
  objectPosition?: string;
}

interface CircularGalleryProps {
  items: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
}

export function CircularGallery({ items, radius = 700, autoRotateSpeed = 0.015 }: CircularGalleryProps) {
  const [rotation, setRotation] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll-driven rotation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      setRotation(scrollProgress * 360);

      scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Auto-rotate when idle
  useEffect(() => {
    const autoRotate = () => {
      if (!isScrolling) {
        setRotation(prev => prev + autoRotateSpeed);
      }
      animationFrameRef.current = requestAnimationFrame(autoRotate);
    };
    animationFrameRef.current = requestAnimationFrame(autoRotate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isScrolling, autoRotateSpeed]);

  const anglePerItem = 360 / items.length;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Mobile: show simple stacked layout instead of 3D carousel
  if (isMobile) {
    return (
      <>
        <div
          role="region"
          aria-label="Property gallery"
          style={{
            padding: '40px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            maxWidth: '100%',
            overflowX: 'hidden',
          }}
        >
          {items.map((item, i) => (
            <div
              key={item.src}
              role="group"
              aria-label={item.title}
              onClick={() => openLightbox(i)}
              style={{
                width: '100%',
                maxWidth: '380px',
                margin: '0 auto',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '3/2',
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  overflow: 'hidden',
                  border: '1px solid rgba(201, 169, 110, 0.1)',
                }}
              >
                <Image
                  src={assetPath(item.src)}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  priority={i === 0}
                  style={{
                    objectFit: 'cover',
                    objectPosition: item.objectPosition || 'center',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  padding: '20px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
                  color: '#F5F0EB',
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '18px',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    margin: 0,
                  }}>
                    {item.title}
                  </h3>
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    color: '#C9A96E',
                    textTransform: 'uppercase',
                  }}>
                    {item.subtitle}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {lightboxOpen && (
          <Lightbox
            items={items}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
          />
        )}
      </>
    );
  }

  // Desktop: 3D circular gallery
  return (
    <>
      <div
        role="region"
        aria-label="Property gallery"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '2000px',
        }}
      >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transform: `rotateY(${rotation}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {items.map((item, i) => {
          const itemAngle = i * anglePerItem;
          const totalRotation = rotation % 360;
          const relativeAngle = (itemAngle + totalRotation + 360) % 360;
          const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
          const opacity = Math.max(0.25, 1 - (normalizedAngle / 180));

          return (
            <div
              key={item.src}
              role="group"
              aria-label={item.title}
              onClick={() => openLightbox(i)}
              style={{
                position: 'absolute',
                width: '420px',
                height: '280px',
                transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                left: '50%',
                top: '50%',
                marginLeft: '-210px',
                marginTop: '-140px',
                opacity: opacity,
                transition: 'opacity 0.3s linear',
                cursor: 'pointer',
              }}
            >
              <div
                className="gallery-image-wrapper"
                style={{
                  position: 'relative',
                  width: '420px',
                  height: '280px',
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  overflow: 'hidden',
                  borderLeft: '1px solid rgba(201, 169, 110, 0.1)',
                  borderRight: '1px solid rgba(201, 169, 110, 0.1)',
                  borderTop: '1px solid rgba(201, 169, 110, 0.1)',
                  borderBottom: '1px solid rgba(201, 169, 110, 0.1)',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Image
                  src={assetPath(item.src)}
                  alt={item.alt}
                  fill
                  sizes="420px"
                  priority={i === 0}
                  style={{
                    objectFit: 'cover',
                    objectPosition: item.objectPosition || 'center',
                  }}
                />
                {/* Dark gradient + caption at bottom */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  padding: '20px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
                  color: '#F5F0EB',
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '18px',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    margin: 0,
                  }}>
                    {item.title}
                  </h3>
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    color: '#C9A96E',
                    textTransform: 'uppercase',
                  }}>
                    {item.subtitle}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          items={items}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}
