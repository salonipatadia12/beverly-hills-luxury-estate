'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

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
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

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

  return (
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
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  overflow: 'hidden',
                  borderLeft: '1px solid rgba(201, 169, 110, 0.1)',
                  borderRight: '1px solid rgba(201, 169, 110, 0.1)',
                  borderTop: '1px solid rgba(201, 169, 110, 0.1)',
                  borderBottom: '1px solid rgba(201, 169, 110, 0.1)',
                }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="420px"
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
  );
}
