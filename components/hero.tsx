'use client'

import Link from 'next/link'
import { verticals } from '@/lib/verticals-data'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden grid-bg"
      aria-label="Hero"
    >
      {/* Background gradient — kept very subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(26,79,204,0.07) 0%, transparent 55%)',
        }}
      />

      {/* Red left edge accent */}
      <div
        className="absolute top-0 left-0 w-1 h-full"
        aria-hidden="true"
        style={{ background: 'linear-gradient(180deg, transparent 0%, var(--brand-red) 30%, var(--brand-blue) 70%, transparent 100%)' }}
      />

      <div className="section-container w-full py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Main content */}
          <div>
            <p className="section-label mb-6">Multi-Domain Enterprise</p>

            <h1 className="font-sans font-bold text-5xl md:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-balance text-[var(--foreground)] mb-6">
              One Company.
              <br />
              <span className="text-[var(--brand-red)]">Six</span>{' '}
              <span
                className="relative"
                style={{
                  background: 'linear-gradient(135deg, #1a4fcc 0%, #e02020 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Industries.
              </span>
              <br />
              Exceptional Results.
            </h1>

            <p className="text-[var(--text-muted)] text-lg leading-relaxed max-w-lg mb-10">
              ConglomerateIT is a diversified enterprise operating across Technology, Consulting,
              Staffing, Real Estate, Education, and Finance — each vertical a leader in its field.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/verticals" className="btn-primary">
                Explore Our Verticals
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="/about" className="btn-outline">
                About Us
              </Link>
            </div>

            {/* Trust bar */}
            <div className="flex items-center gap-6 mt-12 pt-12 border-t border-white/[0.06]">
              {[
                { value: '500+', label: 'Clients' },
                { value: '15+', label: 'Years' },
                { value: '6', label: 'Verticals' },
                { value: '98%', label: 'Satisfaction' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-sans font-bold text-xl text-[var(--foreground)]">{stat.value}</div>
                  <div className="text-xs text-[var(--text-subtle)] mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Verticals grid */}
          <div className="hidden lg:grid grid-cols-2 gap-3">
            {verticals.map((v) => (
              <Link
                key={v.id}
                href={`/verticals/${v.id}`}
                className="brand-card rounded-lg p-5 group"
              >
                <div
                  className="w-2 h-2 rounded-full mb-3"
                  style={{ background: v.color === 'red' ? 'var(--brand-red)' : 'var(--brand-blue)' }}
                  aria-hidden="true"
                />
                <h3 className="font-sans font-semibold text-sm text-[var(--foreground)] mb-1 group-hover:text-[var(--brand-red)] transition-colors">
                  {v.title}
                </h3>
                <p className="text-xs text-[var(--text-subtle)] leading-relaxed line-clamp-2">{v.shortDesc}</p>
                <div className="mt-3 flex items-center gap-1 text-[10px] font-medium text-[var(--text-subtle)] group-hover:text-[var(--brand-red)] transition-colors">
                  Learn more
                  <svg className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 hr-brand" aria-hidden="true" />
    </section>
  )
}
