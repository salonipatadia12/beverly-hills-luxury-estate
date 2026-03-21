'use client'
import { useEffect, useRef } from 'react'
import { assetPath } from '@/lib/assetPath'

export function ScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollFraction = scrollTop / maxScroll
      const duration = video.duration || 0
      video.currentTime = scrollFraction * duration
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden sticky top-0 -z-10">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      >
        <source src={assetPath('/scroll-video.mp4')} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-dark/40" />
    </section>
  )
}
