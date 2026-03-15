'use client'
import { property } from '@/data/property'

export function LocationMap() {
  return (
    <section id="location" className="relative z-10 bg-dark py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-5xl md:text-6xl font-bold mb-4 tracking-tight text-linen">
          Location
        </h2>
        <div className="h-1 w-24 bg-gold mb-16" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="text-linen">
            <h3 className="font-serif text-3xl font-bold mb-6">
              {property.address}
              <br />
              {property.city}, {property.state} {property.zip}
            </h3>
            <p className="text-xl font-light leading-relaxed mb-8">
              Nestled in the prestigious Beverly Hills enclave, this property offers
              unparalleled privacy while remaining moments from world-class dining,
              shopping, and entertainment on Rodeo Drive and the Sunset Strip.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-gold" />
                <div>5 minutes to Rodeo Drive</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-gold" />
                <div>10 minutes to Sunset Strip</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-gold" />
                <div>15 minutes to LAX Airport</div>
              </div>
            </div>
          </div>
          <div className="aspect-video bg-linen/10 flex items-center justify-center">
            <div className="text-linen/50 text-sm font-light tracking-widest uppercase">
              Map Placeholder
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
