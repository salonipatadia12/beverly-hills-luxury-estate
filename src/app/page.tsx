import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import PropertyStrip from '@/components/PropertyStrip'
import Overview from '@/components/Overview'
import Gallery from '@/components/Gallery'
import Amenities from '@/components/Amenities'
import LocationSection from '@/components/LocationSection'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <PropertyStrip />
      <section id="overview">
        <Overview />
      </section>
      <Gallery />
      <Amenities />
      <LocationSection />
      <Contact />
      <Footer />
    </>
  )
}
