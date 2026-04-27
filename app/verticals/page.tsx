import Link from 'next/link'
import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { verticals } from '@/lib/verticals-data'

export const metadata: Metadata = {
  title: 'Our Verticals | ConglomerateIT',
  description: 'Explore all six industry verticals operated by ConglomerateIT — Technology, Consulting, Staffing, Real Estate, Education, and Finance.',
}

const icons: Record<string, React.ReactNode> = {
  technology: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
    </svg>
  ),
  consulting: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
    </svg>
  ),
  staffing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
  realestate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  ),
  education: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  ),
  finance: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

export default function VerticalsPage() {
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
            <span className="text-[var(--foreground)]">Verticals</span>
          </nav>
          <p className="section-label">What We Do</p>
          <h1 className="font-sans font-bold text-5xl md:text-6xl text-balance text-[var(--foreground)] leading-tight max-w-2xl mb-5">
            Six Industries.<br />
            <span className="text-[var(--brand-red)]">One</span> Conglomerate.
          </h1>
          <p className="text-[var(--text-muted)] text-lg max-w-xl leading-relaxed">
            ConglomerateIT operates across six distinct verticals, each with specialized teams,
            dedicated leadership, and a proven track record of exceptional results.
          </p>
        </div>
      </section>

      {/* Verticals grid */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {verticals.map((v, i) => (
              <Link
                key={v.id}
                href={`/verticals/${v.id}`}
                className="brand-card rounded-lg p-8 group flex gap-6"
              >
                {/* Number */}
                <div
                  className="flex-shrink-0 w-10 h-10 rounded flex items-center justify-center font-mono text-sm font-bold"
                  style={{
                    background: v.color === 'red' ? 'rgba(224,32,32,0.1)' : 'rgba(26,79,204,0.1)',
                    color: v.color === 'red' ? 'var(--brand-red)' : 'var(--brand-blue-light)',
                  }}
                  aria-hidden="true"
                >
                  {icons[v.id]}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h2 className="font-sans font-semibold text-lg text-[var(--foreground)] group-hover:text-[var(--brand-red)] transition-colors">
                        {v.title}
                      </h2>
                      <p
                        className="font-mono text-[11px]"
                        style={{ color: v.color === 'red' ? 'var(--brand-red)' : 'var(--brand-blue-light)' }}
                      >
                        {v.tagline}
                      </p>
                    </div>
                    <svg
                      className="w-4 h-4 text-[var(--text-subtle)] group-hover:text-[var(--brand-red)] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
                      viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </div>

                  <p className="text-[var(--text-subtle)] text-sm leading-relaxed mb-4 line-clamp-2">
                    {v.shortDesc}
                  </p>

                  {/* Stats row */}
                  <div className="flex gap-5 pt-4 border-t border-white/[0.05]">
                    {v.stats.slice(0, 3).map((s) => (
                      <div key={s.label}>
                        <div
                          className="font-bold text-sm"
                          style={{ color: v.color === 'red' ? 'var(--brand-red)' : 'var(--brand-blue-light)' }}
                        >
                          {s.value}
                        </div>
                        <div className="text-[10px] text-[var(--text-subtle)]">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/[0.05]">
        <div className="section-container text-center">
          <h2 className="font-sans font-bold text-3xl text-[var(--foreground)] mb-4">
            Not sure which vertical fits your needs?
          </h2>
          <p className="text-[var(--text-muted)] mb-8 max-w-lg mx-auto">
            Our team will help you identify the right ConglomerateIT division to partner with.
          </p>
          <Link href="/contact" className="btn-primary">
            Talk to Our Team
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
