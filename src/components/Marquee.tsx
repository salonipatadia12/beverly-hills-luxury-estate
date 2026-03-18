'use client'

type MarqueeProps = {
  text: string
}

export default function Marquee({ text }: MarqueeProps) {
  return (
    <div
      style={{
        width: '100%',
        background: 'transparent',
        borderTop: '1px solid rgba(201, 169, 110, 0.2)',
        borderBottom: '1px solid rgba(201, 169, 110, 0.2)',
        padding: '16px 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        className="marquee-content"
        style={{
          display: 'flex',
          width: 'fit-content',
          animation: 'marquee 20s linear infinite',
        }}
      >
        {/* First copy of text */}
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '19px',
            fontWeight: 300,
            letterSpacing: '0.15em',
            color: 'var(--color-accent-gold)',
            whiteSpace: 'nowrap',
            paddingRight: '40px',
          }}
        >
          {text}
        </span>
        {/* Duplicate copy for seamless loop */}
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '19px',
            fontWeight: 300,
            letterSpacing: '0.15em',
            color: 'var(--color-accent-gold)',
            whiteSpace: 'nowrap',
            paddingRight: '40px',
          }}
        >
          {text}
        </span>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-content {
            animation-play-state: paused !important;
          }
        }
      `}</style>
    </div>
  )
}
