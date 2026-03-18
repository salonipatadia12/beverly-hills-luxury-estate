import type { Metadata } from 'next'
import { cormorant, outfit } from '@/lib/fonts'
import SmoothScroll from '@/components/SmoothScroll'
import Preloader from '@/components/Preloader'
import CustomCursor from '@/components/CustomCursor'
import './globals.css'

export const metadata: Metadata = {
  title: 'Modern Architectural Masterpiece | Beverly Hills | Obsidian Luxury Real Estate',
  description: 'Discover this extraordinary 6,500 sq ft contemporary masterpiece in Beverly Hills. Featuring 5 bedrooms, 6 bathrooms, infinity pool, home theater, and breathtaking canyon views. $8,750,000.',
  keywords: ['Beverly Hills real estate', 'luxury homes', 'modern architecture', 'Beverly Hills 90210', 'luxury estate', 'contemporary mansion'],
  authors: [{ name: 'Obsidian Luxury Real Estate' }],
  metadataBase: new URL('https://obsidianluxury.com'),
  openGraph: {
    title: 'Modern Architectural Masterpiece | Beverly Hills',
    description: 'Extraordinary 6,500 sq ft contemporary estate in Beverly Hills with 5 beds, 6 baths, infinity pool, and canyon views.',
    url: 'https://obsidianluxury.com',
    siteName: 'Obsidian Luxury Real Estate',
    images: [
      {
        url: '/hero-golden.jpg',
        width: 1200,
        height: 630,
        alt: 'Modern Beverly Hills Estate at Golden Hour',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Architectural Masterpiece | Beverly Hills',
    description: 'Extraordinary 6,500 sq ft contemporary estate in Beverly Hills',
    images: ['/hero-golden.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="font-sans font-light antialiased grain-overlay">
        <CustomCursor />
        <Preloader />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
