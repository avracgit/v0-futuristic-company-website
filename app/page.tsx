import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import Stats from '@/components/stats'
import Clients from '@/components/clients'
import Results from '@/components/results'
import Features from '@/components/features'
import Integrations from '@/components/integrations'
import Testimonials from '@/components/testimonials'
import Footer from '@/components/footer'
import BackToTop from '@/components/back-to-top'
import SectionNav from '@/components/section-nav'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <SectionNav />
      <Hero />
      <Stats />
      <Clients />
      <Results />
      <Features />
      <Integrations />
      <Testimonials />
      <Footer />
      <BackToTop />
    </main>
  )
}
