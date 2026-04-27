import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const milestones = [
  { year: '2009', title: 'Founded', description: 'ConglomerateIT established with a vision to transform enterprise technology.' },
  { year: '2012', title: 'Global Expansion', description: 'Opened development centers to serve clients across multiple time zones.' },
  { year: '2016', title: '100+ Clients', description: 'Reached milestone of 100 enterprise clients across diverse industries.' },
  { year: '2019', title: 'AI Practice', description: 'Launched dedicated AI/ML practice to lead digital transformation.' },
  { year: '2022', title: 'Cloud Excellence', description: 'Achieved premier partnership status with major cloud providers.' },
  { year: '2024', title: '500+ Clients', description: 'Serving 500+ enterprise clients with 98% satisfaction rate.' },
]

const industries = [
  'Financial Services', 'Healthcare', 'Retail & E-commerce', 'Manufacturing',
  'Technology', 'Telecommunications', 'Energy & Utilities', 'Government',
]

export default function CompanyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-blue mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-blue)]" />
            <span className="text-xs font-medium">Company</span>
          </div>
          <h1 className="font-semibold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-balance leading-tight">
            15+ Years of
            <br />
            <span className="text-[var(--brand-blue)]">Enterprise Excellence</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            From a small team with big dreams to a global enterprise transformation partner serving 500+ clients worldwide.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-semibold text-3xl text-foreground mb-12 text-center">Our Journey</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--brand-blue)] via-[var(--brand-blue)]/50 to-transparent" />
            
            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-center gap-8 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-[var(--brand-blue)] -translate-x-1/2 shadow-[0_0_10px_var(--brand-blue-glow)]" />
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className="glass-card rounded-xl p-6">
                      <span className="text-[var(--brand-blue)] font-semibold text-lg">{milestone.year}</span>
                      <h3 className="font-semibold text-xl text-foreground mt-1 mb-2">{milestone.title}</h3>
                      <p className="text-[var(--text-muted)] text-sm">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 px-6 bg-[var(--surface-dark)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-semibold text-3xl text-foreground mb-4">Industries We Serve</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Our expertise spans across diverse industries, delivering tailored solutions for each sector&apos;s unique challenges.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((industry) => (
              <div
                key={industry}
                className="glass-card rounded-xl p-6 text-center hover:border-[var(--brand-blue)]/30 transition-colors"
              >
                <span className="text-foreground font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-semibold text-3xl md:text-4xl text-foreground mb-6">
            Join Our Growing List of Success Stories
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mb-8 max-w-2xl mx-auto">
            Let us help you achieve your digital transformation goals with our proven expertise and commitment to excellence.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--brand-blue)] text-white font-medium hover:shadow-[0_0_30px_var(--brand-blue-glow)] transition-all"
          >
            Start Your Journey
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
