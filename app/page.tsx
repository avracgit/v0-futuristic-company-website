import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import Stats from '@/components/stats'
import About from '@/components/about'
import Verticals from '@/components/verticals'
import Blog from '@/components/blog'
import Footer from '@/components/footer'
import Chatbot from '@/components/chatbot'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Verticals />
      <Blog />
      <Footer />
      <Chatbot />
    </main>
  )
}
