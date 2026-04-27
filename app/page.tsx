import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import Stats from '@/components/stats'
import Results from '@/components/results'
import Features from '@/components/features'
import Integrations from '@/components/integrations'
import Testimonials from '@/components/testimonials'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <Results />
      <Features />
      <Integrations />
      <Testimonials />
      <Footer />
    </main>
  )
}
