'use client'

const pillars = [
  {
    title: 'Vision-Driven',
    description: 'Every vertical is guided by a long-term strategic vision to lead, not just compete.',
    color: '#00d4ff',
  },
  {
    title: 'Results-First',
    description: 'Our track record across industries speaks louder than any promise.',
    color: '#7c3aed',
  },
  {
    title: 'Innovation Always',
    description: 'We continuously invest in R&D to stay ahead of every industry curve.',
    color: '#00d4ff',
  },
  {
    title: 'People-Centric',
    description: 'Great companies are built by great people. We prioritize talent at every level.',
    color: '#7c3aed',
  },
]

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none grid-bg opacity-50"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none blur-3xl opacity-5"
        style={{ background: 'var(--neon-cyan)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.05)] mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--neon-cyan)] pulse-glow" />
              <span className="font-mono text-xs text-[var(--neon-cyan)] tracking-widest uppercase">
                Who We Are
              </span>
            </div>
            <h2 className="font-sans font-bold text-4xl md:text-5xl text-balance text-foreground mb-6 leading-tight">
              A Conglomerate Built for the{' '}
              <span className="text-[var(--neon-cyan)]">Digital Age</span>
            </h2>
            <p className="text-[#a0a8c0] text-lg leading-relaxed mb-5">
              ConglomerateIT is more than a company — it&apos;s a family of high-performing enterprises,
              each a leader in its domain. Founded on the principle that diversification drives
              resilience, we have built a portfolio that spans technology, consulting, real estate,
              finance, education, and staffing.
            </p>
            <p className="text-[#a0a8c0] text-lg leading-relaxed mb-8">
              What unites every vertical under the ConglomerateIT banner is an unwavering commitment
              to excellence, a culture of innovation, and a relentless focus on delivering value
              to clients, partners, and communities.
            </p>

            {/* CTA */}
            <button className="px-8 py-3.5 rounded-xl border border-[rgba(0,212,255,0.3)] text-[var(--neon-cyan)] font-semibold text-sm tracking-wide hover:bg-[var(--neon-cyan)] hover:text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]">
              Read Full Story
            </button>
          </div>

          {/* Right: Pillars grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((p, i) => (
              <div
                key={i}
                className="glow-card rounded-2xl p-6 group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    background: `${p.color}12`,
                    border: `1px solid ${p.color}25`,
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: p.color, boxShadow: `0 0 8px ${p.color}` }}
                  />
                </div>
                <h3
                  className="font-sans font-semibold text-base mb-2"
                  style={{ color: p.color }}
                >
                  {p.title}
                </h3>
                <p className="text-[#6b7494] text-sm leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee / partner strip */}
        <div className="mt-24 overflow-hidden">
          <p className="text-center font-mono text-xs text-[#6b7494] tracking-widest uppercase mb-8">
            Trusted Across Industries
          </p>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, var(--background), transparent)' }}
            />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(270deg, var(--background), transparent)' }}
            />
            <div className="marquee-inner">
              {[
                'Enterprise Technology', 'Strategic Consulting', 'HR & Staffing',
                'Real Estate', 'Education', 'Finance & Fintech',
                'Cloud Solutions', 'AI & Machine Learning', 'Digital Transformation',
                'Enterprise Technology', 'Strategic Consulting', 'HR & Staffing',
                'Real Estate', 'Education', 'Finance & Fintech',
                'Cloud Solutions', 'AI & Machine Learning', 'Digital Transformation',
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-8 py-3 mx-2 rounded-full border border-[rgba(0,212,255,0.15)] text-[#6b7494] text-sm font-medium whitespace-nowrap"
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
