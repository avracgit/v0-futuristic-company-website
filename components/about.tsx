import Link from 'next/link'

const pillars = [
  {
    title: 'Vision-Driven',
    description: 'Every vertical is guided by a long-term strategic vision to lead, not just compete.',
    color: 'red' as const,
  },
  {
    title: 'Results-First',
    description: 'Our track record across industries speaks louder than any promise.',
    color: 'blue' as const,
  },
  {
    title: 'Innovation Always',
    description: 'We continuously invest in R&D to stay ahead of every industry curve.',
    color: 'red' as const,
  },
  {
    title: 'People-Centric',
    description: 'Great companies are built by great people. We prioritize talent at every level.',
    color: 'blue' as const,
  },
]

export default function About() {
  return (
    <section id="about" className="relative py-28 border-b border-white/[0.05]">
      {/* Diagonal stripe accent — top right */}
      <div
        className="absolute top-0 right-0 w-72 h-72 pointer-events-none opacity-40 stripe-accent"
        aria-hidden="true"
        style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}
      />

      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="section-label">Who We Are</p>
            <h2 className="font-sans font-bold text-4xl md:text-5xl text-balance text-[var(--foreground)] leading-tight mb-6">
              A Conglomerate Built<br />
              for the{' '}
              <span className="text-[var(--brand-red)]">Digital Age</span>
            </h2>
            <p className="text-[var(--text-muted)] text-base leading-relaxed mb-4">
              ConglomerateIT is more than a company — it&apos;s a family of high-performing enterprises,
              each a leader in its domain. Founded on the principle that diversification drives
              resilience, we have built a portfolio that spans Technology, Consulting, Real Estate,
              Finance, Education, and Staffing.
            </p>
            <p className="text-[var(--text-muted)] text-base leading-relaxed mb-8">
              What unites every vertical under the ConglomerateIT banner is an unwavering commitment
              to excellence, a culture of innovation, and a relentless focus on delivering real value
              to clients, partners, and communities.
            </p>

            <div className="flex gap-4 flex-wrap">
              <Link href="/about" className="btn-primary text-sm">
                Our Full Story
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="/verticals" className="btn-outline text-sm">
                View Verticals
              </Link>
            </div>
          </div>

          {/* Right: Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((p) => (
              <div key={p.title} className="brand-card rounded-lg p-6">
                <div
                  className="w-8 h-1 rounded-full mb-4"
                  aria-hidden="true"
                  style={{ background: p.color === 'red' ? 'var(--brand-red)' : 'var(--brand-blue)' }}
                />
                <h3 className="font-sans font-semibold text-sm text-[var(--foreground)] mb-2">
                  {p.title}
                </h3>
                <p className="text-[var(--text-subtle)] text-sm leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee strip */}
        <div className="mt-20 overflow-hidden">
          <p className="text-center font-mono text-[10px] text-[var(--text-subtle)] tracking-widest uppercase mb-6">
            Trusted Across Industries
          </p>
          <div className="relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, var(--background), transparent)' }}
              aria-hidden="true"
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(270deg, var(--background), transparent)' }}
              aria-hidden="true"
            />
            <div className="marquee-inner" aria-hidden="true">
              {[
                'Enterprise Technology', 'Strategic Consulting', 'HR & Staffing',
                'Real Estate Development', 'Education & Training', 'Finance & Fintech',
                'Cloud Solutions', 'Digital Transformation', 'Workforce Management',
                'Enterprise Technology', 'Strategic Consulting', 'HR & Staffing',
                'Real Estate Development', 'Education & Training', 'Finance & Fintech',
                'Cloud Solutions', 'Digital Transformation', 'Workforce Management',
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-6 py-2 mx-2 rounded-full text-xs text-[var(--text-subtle)] font-medium whitespace-nowrap border border-white/[0.06]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
