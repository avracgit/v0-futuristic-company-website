import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { verticals } from '@/lib/verticals-data'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return verticals.map((v) => ({ id: v.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const vertical = verticals.find((v) => v.id === id)
  if (!vertical) return {}
  return {
    title: `${vertical.title} | ConglomerateIT`,
    description: vertical.shortDesc,
  }
}

export default async function VerticalDetailPage({ params }: Props) {
  const { id } = await params
  const vertical = verticals.find((v) => v.id === id)

  if (!vertical) notFound()

  const brandColor = vertical.color === 'red' ? 'var(--brand-red)' : 'var(--brand-blue-light)'
  const brandBg = vertical.color === 'red' ? 'rgba(224,32,32,0.08)' : 'rgba(26,79,204,0.08)'
  const brandBorder = vertical.color === 'red' ? 'rgba(224,32,32,0.2)' : 'rgba(26,79,204,0.2)'

  // Get adjacent verticals for navigation
  const currentIdx = verticals.findIndex((v) => v.id === id)
  const prevVertical = currentIdx > 0 ? verticals[currentIdx - 1] : null
  const nextVertical = currentIdx < verticals.length - 1 ? verticals[currentIdx + 1] : null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Page hero */}
      <section className="relative pt-32 pb-20 border-b border-white/[0.05] grid-bg">
        {/* Color accent bar */}
        <div
          className="absolute top-0 left-0 w-1 h-full"
          aria-hidden="true"
          style={{ background: `linear-gradient(180deg, transparent, ${brandColor} 40%, transparent)` }}
        />
        {/* Subtle background wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: `radial-gradient(ellipse 60% 70% at 80% 30%, ${vertical.color === 'red' ? 'rgba(224,32,32,0.05)' : 'rgba(26,79,204,0.06)'} 0%, transparent 60%)`,
          }}
        />

        <div className="section-container relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[var(--text-subtle)] mb-8 font-mono" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/verticals" className="hover:text-[var(--foreground)] transition-colors">Verticals</Link>
            <span>/</span>
            <span className="text-[var(--foreground)]">{vertical.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Headline */}
            <div>
              <p className="section-label" style={{ color: brandColor }}>
                <span style={{ background: brandColor }} className="w-5 h-0.5 block mr-2 flex-shrink-0" />
                {vertical.tagline}
              </p>
              <h1 className="font-sans font-bold text-5xl md:text-6xl text-balance text-[var(--foreground)] leading-tight mb-5">
                {vertical.title}
              </h1>
              <p className="text-[var(--text-muted)] text-lg leading-relaxed mb-8 max-w-lg">
                {vertical.shortDesc}
              </p>
              <Link href="/contact" className="btn-primary">
                Work With Us
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

            {/* Right: Stats */}
            <div className="grid grid-cols-2 gap-4">
              {vertical.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg p-5 border"
                  style={{ background: brandBg, borderColor: brandBorder }}
                >
                  <div className="font-sans font-bold text-3xl mb-1" style={{ color: brandColor }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About this vertical */}
      <section className="py-20 border-b border-white/[0.05]">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <p className="section-label">Overview</p>
              <h2 className="font-sans font-bold text-3xl text-[var(--foreground)] mb-6">
                About {vertical.title}
              </h2>
              <div className="flex flex-col gap-4">
                {vertical.fullDesc.map((para, i) => (
                  <p key={i} className="text-[var(--text-muted)] leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Sidebar: Other verticals */}
            <div>
              <p className="font-mono text-[10px] text-[var(--text-subtle)] tracking-widest uppercase mb-4">Other Verticals</p>
              <div className="flex flex-col gap-2">
                {verticals
                  .filter((v) => v.id !== vertical.id)
                  .map((v) => (
                    <Link
                      key={v.id}
                      href={`/verticals/${v.id}`}
                      className="flex items-center justify-between px-4 py-3 rounded border border-white/[0.06] text-sm text-[var(--text-subtle)] hover:text-[var(--foreground)] hover:border-white/[0.12] transition-all group"
                    >
                      {v.title}
                      <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 border-b border-white/[0.05]">
        <div className="section-container">
          <p className="section-label">What We Offer</p>
          <h2 className="font-sans font-bold text-3xl text-[var(--foreground)] mb-10">
            Services & Capabilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vertical.services.map((service, i) => (
              <div key={service.name} className="brand-card rounded-lg p-6">
                <div
                  className="w-6 h-0.5 rounded-full mb-4"
                  style={{ background: i % 2 === 0 ? brandColor : (vertical.color === 'red' ? 'var(--brand-blue-light)' : 'var(--brand-red)') }}
                  aria-hidden="true"
                />
                <h3 className="font-sans font-semibold text-sm text-[var(--foreground)] mb-2">
                  {service.name}
                </h3>
                <p className="text-[var(--text-subtle)] text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-b border-white/[0.05]">
        <div className="section-container">
          <div
            className="rounded-lg p-10 text-center border relative overflow-hidden"
            style={{ background: brandBg, borderColor: brandBorder }}
          >
            <div className="absolute inset-0 pointer-events-none opacity-30 stripe-accent" aria-hidden="true" />
            <div className="relative z-10">
              <h2 className="font-sans font-bold text-3xl text-[var(--foreground)] mb-4 text-balance">
                Interested in our{' '}
                <span style={{ color: brandColor }}>{vertical.title}</span> practice?
              </h2>
              <p className="text-[var(--text-muted)] mb-8 max-w-lg mx-auto">
                Get in touch with our team to discuss your needs and how we can help.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact" className="btn-primary">
                  Get in Touch
                </Link>
                <Link href="/verticals" className="btn-outline">
                  All Verticals
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prev / next navigation */}
      {(prevVertical || nextVertical) && (
        <section className="py-10 border-b border-white/[0.05]">
          <div className="section-container flex items-center justify-between gap-4">
            {prevVertical ? (
              <Link
                href={`/verticals/${prevVertical.id}`}
                className="flex items-center gap-2 text-sm text-[var(--text-subtle)] hover:text-[var(--foreground)] transition-colors group"
              >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
                </svg>
                <span>
                  <span className="block text-[10px] font-mono text-[var(--text-subtle)] uppercase tracking-wider">Previous</span>
                  {prevVertical.title}
                </span>
              </Link>
            ) : <div />}

            {nextVertical ? (
              <Link
                href={`/verticals/${nextVertical.id}`}
                className="flex items-center gap-2 text-sm text-[var(--text-subtle)] hover:text-[var(--foreground)] transition-colors group text-right"
              >
                <span>
                  <span className="block text-[10px] font-mono text-[var(--text-subtle)] uppercase tracking-wider">Next</span>
                  {nextVertical.title}
                </span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </Link>
            ) : <div />}
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
