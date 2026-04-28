import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { stats } from '@/lib/data'

const values = [
  {
    title: 'AI-First Approach',
    description: 'We embed artificial intelligence into every solution, ensuring our clients stay ahead of the technology curve.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    title: 'Global Delivery',
    description: 'Our distributed teams across multiple time zones ensure round-the-clock support and cost-efficient execution.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: 'Results-Driven',
    description: 'We measure success by the tangible outcomes we deliver — faster time-to-market, reduced costs, and increased efficiency.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: 'Client Partnership',
    description: 'We build long-term relationships, acting as an extension of your team rather than just a vendor.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
]

const leadership = [
  { name: 'Executive Team', role: 'Strategic Leadership', description: 'Experienced leaders driving vision and growth across all verticals.' },
  { name: 'Technology Board', role: 'Technical Excellence', description: 'Industry experts ensuring cutting-edge solutions and best practices.' },
  { name: 'Advisory Council', role: 'Strategic Guidance', description: 'Seasoned advisors providing market insights and strategic direction.' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-badge badge-blue mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-blue)]" />
            <span className="text-xs font-medium">About Us</span>
          </div>
          <h1 className="font-semibold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-balance leading-tight">
            AI-First Enterprise
            <br />
            <span className="text-[var(--brand-blue)]">Transformation Partner</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            ConglomerateIT is redefining enterprise technology services with an AI-first approach, global delivery model, and unwavering commitment to client success.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="glass-stat text-center">
                <div className="text-4xl md:text-5xl font-semibold text-[var(--brand-blue)] mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <p className="text-sm text-foreground font-medium mb-1">{stat.label}</p>
                <p className="text-xs text-[var(--text-muted)]">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-semibold text-3xl md:text-4xl text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
                We exist to help enterprises navigate the complexities of digital transformation. Our mission is to be the trusted technology partner that delivers measurable business outcomes through innovative solutions and exceptional service.
              </p>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
                With a deep understanding of enterprise challenges and a forward-looking approach to technology, we help organizations modernize their operations, optimize costs, and accelerate growth.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--brand-blue)] text-white font-medium hover:shadow-[0_0_30px_var(--brand-blue-glow)] transition-all"
              >
                Partner With Us
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner%20logo%20latest-Wy6FwAgjDavAiB9pvHR7pRWJVuZx3Z.png"
                  alt="ConglomerateIT"
                  width={60}
                  height={60}
                  className="w-15 h-15 object-contain"
                />
                <div>
                  <h3 className="font-semibold text-xl text-foreground">ConglomerateIT</h3>
                  <p className="text-sm text-[var(--brand-blue)]">Established 2009</p>
                </div>
              </div>
              <blockquote className="text-[var(--text-secondary)] italic leading-relaxed">
                &ldquo;Transform your business with tomorrow&apos;s technology. We are committed to delivering exceptional results through innovation, expertise, and unwavering dedication to our clients&apos; success.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-semibold text-3xl md:text-4xl text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
              The principles that guide everything we do and define who we are as an organization.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div key={i} className="glass-card rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--brand-blue)]/10 border border-[var(--brand-blue)]/20 flex items-center justify-center mb-4 text-[var(--brand-blue)]">
                  {value.icon}
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-semibold text-3xl md:text-4xl text-foreground mb-4">
              Leadership
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
              Our leadership team brings decades of combined experience in enterprise technology and business transformation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadership.map((leader, i) => (
              <div key={i} className="glass-card rounded-2xl p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-red)] mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-semibold text-2xl">{leader.name.charAt(0)}</span>
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-1">{leader.name}</h3>
                <p className="text-sm text-[var(--brand-blue)] mb-3">{leader.role}</p>
                <p className="text-sm text-[var(--text-muted)]">{leader.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
