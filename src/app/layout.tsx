import type { Metadata } from 'next'
import { cormorant, outfit } from '@/lib/fonts'
import SmoothScroll from '@/components/SmoothScroll'
import './globals.css'

export const metadata: Metadata = {
  title: 'Modern Architectural Masterpiece — Beverly Hills',
  description: 'An extraordinary 6,500 sq ft contemporary estate in Beverly Hills. $8,750,000.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="font-sans font-light antialiased grain-overlay">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
