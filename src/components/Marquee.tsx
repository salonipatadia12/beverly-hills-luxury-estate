'use client'

type MarqueeProps = {
  text: string
}

export default function Marquee({ text }: MarqueeProps) {
  return (
    <div
      className="marquee-container"
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
      <div className="marquee-content">
        {/* First copy of text */}
        <span className="marquee-text">{text}</span>
        {/* Duplicate copy for seamless loop */}
        <span className="marquee-text">{text}</span>
      </div>

      <style jsx global>{`
        .marquee-content {
          display: flex;
          width: fit-content;
          animation: marquee-scroll 30s linear infinite;
          will-change: transform;
        }

        .marquee-text {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 19px;
          font-weight: 300;
          letter-spacing: 0.15em;
          color: var(--color-accent-gold);
          white-space: nowrap;
          padding-right: 40px;
        }

        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
