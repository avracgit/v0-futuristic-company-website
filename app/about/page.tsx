import Link from 'next/link'
import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'About Us | ConglomerateIT',
  description: 'Learn about ConglomerateIT — a multi-domain enterprise built on vision, innovation, and exceptional results across six industry verticals.',
}

const leadership = [
  {
    name: 'Rajiv Mehta',
    title: 'Founder & Chief Executive Officer',
    bio: 'Rajiv founded ConglomerateIT with a vision to build a diversified enterprise that could outperform specialists in each domain it entered. With over 20 years in technology and business, he has led the company through consistent growth across six verticals.',
    initials: 'RM',
    color: 'red',
  },
  {
    name: 'Priya Anand',
    title: 'Chief Operating Officer',
    bio: 'Priya oversees day-to-day operations across all verticals, ensuring the operational excellence and cross-domain synergies that define ConglomerateIT\'s competitive advantage. She joined the company in its second year and has been central to its expansion.',
    initials: 'PA',
    color: 'blue',
  },
  {
    name: 'Arun Sharma',
    title: 'Chief Technology Officer',
    bio: 'Arun leads the Technology vertical and the enterprise-wide technology strategy. His background spans cloud architecture, AI, and enterprise software. He ensures ConglomerateIT and its clients stay ahead of every technology curve.',
    initials: 'AS',
    color: 'red',
  },
  {
    name: 'Deepa Nair',
    title: 'Chief Financial Officer',
    bio: 'Deepa manages the financial health of the conglomerate, overseeing capital allocation, investor relations, and the Finance & Fintech vertical. Her rigorous approach to financial governance underpins ConglomerateIT\'s sustainable growth strategy.',
    initials: 'DN',
    color: 'blue',
  },
]

const milestones = [
  { year: '2009', event: 'ConglomerateIT founded with Technology division in Bangalore' },
  { year: '2011', event: 'Business Consulting vertical launched; first 10 enterprise clients onboarded' },
  { year: '2013', event: 'Staffing & HR division established; 500+ placements in Year 1' },
  { year: '2016', event: 'Real Estate vertical launched with first commercial development project' },
  { year: '2018', event: 'Education & Training division launched; 5,000 learners in Year 1' },
  { year: '2020', event: 'Finance & Fintech vertical launched; Series A capital raise completed' },
  { year: '2022', event: 'Operations expanded to 18 cities; 400+ enterprise clients served' },
  { year: '2024', event: '500+ clients, $5B+ assets advised, 50k+ learners trained across all verticals' },
]

const values = [
  {
    title: 'Integrity Above All',
    desc: 'Every business decision, client commitment, and team interaction is grounded in honesty and accountability. We say what we do, and we do what we say.',
    color: 'red',
  },
  {
    title: 'Excellence as Standard',
    desc: 'We hold ourselves to a standard higher than industry average. Mediocrity is never an acceptable outcome across any vertical we operate.',
    color: 'blue',
  },
  {
    title: 'Innovation as Culture',
    desc: 'R&D investment, intellectual curiosity, and the courage to experiment are baked into how every ConglomerateIT team operates.',
    color: 'red',
  },
  {
    title: 'People at the Center',
    desc: 'Our clients, team members, and partners are not stakeholders — they are the reason we exist. Every strategy starts and ends with people.',
    color: 'blue',
  },
  {
    title: 'Resilience Through Diversity',
    desc: 'Operating across six verticals is not a risk hedge — it is a philosophy. Diverse revenue, diverse talent, and diverse thinking make us stronger.',
    color: 'red',
  },
  {
    title: 'Long-Term Thinking',
    desc: 'We make decisions for the next decade, not the next quarter. Every investment, partnership, and hire is evaluated through a long-term lens.',
    color: 'blue',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Page hero */}
      <section className="relative pt-32 pb-20 border-b border-white/[0.05] grid-bg">
        <div
          className="absolute top-0 left-0 w-1 h-full"
          aria-hidden="true"
          style={{ background: 'linear-gradient(180deg, transparent, var(--brand-red) 40%, var(--brand-blue) 70%, transparent)' }}
        />
        <div className="section-container">
          <nav className="flex items-center gap-2 text-xs text-[var(--text-subtle)] mb-8 font-mono" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[var(--foreground)]">About</span>
          </nav>
          <p className="section-label">Our Story</p>
          <h1 className="font-sans font-bold text-5xl md:text-6xl text-balance text-[var(--foreground)] leading-tight max-w-2xl mb-5">
            Built to Lead.<br />
            <span className="text-[var(--brand-red)]">Built to Last.</span>
          </h1>
          <p className="text-[var(--text-muted)] text-lg max-w-xl leading-relaxed">
            ConglomerateIT was built on the belief that a company can be both highly diversified
            and deeply excellent — not a tradeoff between breadth and depth, but a mastery of both.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 border-b border-white/[0.05]">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="section-label">The Foundation</p>
              <h2 className="font-sans font-bold text-3xl text-[var(--foreground)] mb-6">
                Where It All Began
              </h2>
              <div className="flex flex-col gap-4 text-[var(--text-muted)] leading-relaxed">
                <p>
                  ConglomerateIT was founded in 2009 in Bangalore with a single technology division
                  and a bold premise: that a well-run, values-driven enterprise could build world-class
                  capabilities across multiple industries simultaneously.
                </p>
                <p>
                  The early years were defined by discipline — taking on only clients we could serve
                  exceptionally, building deep domain expertise before expanding to adjacent verticals,
                  and always prioritizing long-term reputation over short-term revenue.
                </p>
                <p>
                  Today, ConglomerateIT operates six verticals across 18 cities, serving 500+ enterprise
                  clients, employing thousands of professionals, and generating consistent, diversified
                  returns. The premise proved right.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div id="leadership">
              <p className="section-label">Timeline</p>
              <h2 className="font-sans font-bold text-3xl text-[var(--foreground)] mb-6">
                15 Years of Growth
              </h2>
              <div className="relative flex flex-col gap-0">
                {/* Vertical line */}
                <div className="absolute left-[60px] top-3 bottom-3 w-px bg-white/[0.06]" aria-hidden="true" />

                {milestones.map((m, i) => (
                  <div key={m.year} className="flex gap-5 pb-6 relative">
                    <div
                      className="flex-shrink-0 w-[60px] flex flex-col items-center"
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-1.5 z-10 relative"
                        style={{ background: i % 2 === 0 ? 'var(--brand-red)' : 'var(--brand-blue-light)' }}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="pt-0">
                      <span
                        className="font-mono text-[11px] font-bold"
                        style={{ color: i % 2 === 0 ? 'var(--brand-red)' : 'var(--brand-blue-light)' }}
                      >
                        {m.year}
                      </span>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-0.5">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 border-b border-white/[0.05]">
        <div className="section-container">
          <div className="mb-12">
            <p className="section-label">What We Stand For</p>
            <h2 className="font-sans font-bold text-3xl text-[var(--foreground)]">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((v) => (
              <div key={v.title} className="brand-card rounded-lg p-6">
                <div
                  className="w-8 h-1 rounded-full mb-4"
                  aria-hidden="true"
                  style={{ background: v.color === 'red' ? 'var(--brand-red)' : 'var(--brand-blue)' }}
                />
                <h3 className="font-sans font-semibold text-sm text-[var(--foreground)] mb-2">{v.title}</h3>
                <p className="text-[var(--text-subtle)] text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 border-b border-white/[0.05]">
        <div className="section-container">
          <div className="mb-12">
            <p className="section-label">The Team</p>
            <h2 className="font-sans font-bold text-3xl text-[var(--foreground)]">Leadership</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {leadership.map((person) => (
              <div key={person.name} className="brand-card rounded-lg p-6 flex gap-5">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded flex items-center justify-center font-sans font-bold text-base text-white"
                  style={{ background: person.color === 'red' ? 'var(--brand-red)' : 'var(--brand-blue)' }}
                  aria-hidden="true"
                >
                  {person.initials}
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-sm text-[var(--foreground)]">{person.name}</h3>
                  <p
                    className="font-mono text-[11px] mb-3"
                    style={{ color: person.color === 'red' ? 'var(--brand-red)' : 'var(--brand-blue-light)' }}
                  >
                    {person.title}
                  </p>
                  <p className="text-[var(--text-subtle)] text-sm leading-relaxed">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-b border-white/[0.05]">
        <div className="section-container text-center">
          <h2 className="font-sans font-bold text-3xl text-[var(--foreground)] mb-4">
            Want to work with us?
          </h2>
          <p className="text-[var(--text-muted)] mb-8 max-w-lg mx-auto">
            Whether you are a potential client, partner, or future team member — we would love to hear from you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">Get in Touch</Link>
            <Link href="/verticals" className="btn-outline">Explore Verticals</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
