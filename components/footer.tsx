import Link from 'next/link'

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Leadership', href: '/about#leadership' },
  { label: 'Careers', href: '/contact' },
  { label: 'Press', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

const verticalLinks = [
  { label: 'Technology', href: '/verticals/technology' },
  { label: 'Consulting', href: '/verticals/consulting' },
  { label: 'Staffing', href: '/verticals/staffing' },
  { label: 'Real Estate', href: '/verticals/realestate' },
  { label: 'Education', href: '/verticals/education' },
  { label: 'Finance', href: '/verticals/finance' },
]

const resourceLinks = [
  { label: 'Blog', href: '/blog' },
  { label: 'Case Studies', href: '/blog' },
  { label: 'Whitepapers', href: '/blog' },
  { label: 'Newsletter', href: '/contact' },
]

export default function Footer() {
  return (
    <footer id="contact" className="relative pt-20 pb-10">
      {/* Top border */}
      <div className="hr-brand" aria-hidden="true" />

      <div className="section-container">
        {/* CTA Band */}
        <div className="rounded-lg p-10 my-16 text-center relative overflow-hidden border border-white/[0.07]"
          style={{ background: 'linear-gradient(135deg, rgba(224,32,32,0.08) 0%, rgba(26,79,204,0.10) 100%)' }}
        >
          {/* Stripe accent */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30 stripe-accent"
            aria-hidden="true"
          />
          <div className="relative z-10">
            <p className="section-label justify-center">Work With Us</p>
            <h3 className="font-sans font-bold text-3xl md:text-4xl text-[var(--foreground)] mb-4 text-balance">
              Ready to Build Something{' '}
              <span className="text-[var(--brand-red)]">Exceptional?</span>
            </h3>
            <p className="text-[var(--text-muted)] mb-8 max-w-xl mx-auto">
              Partner with ConglomerateIT and unlock the full power of a multi-domain enterprise working for your success.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Get in Touch
              </Link>
              <Link href="/verticals" className="btn-outline">
                Explore Verticals
              </Link>
            </div>
          </div>
        </div>

        {/* Footer columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-[var(--brand-red)]">
                <span className="font-mono text-[11px] font-bold text-white tracking-tight">CIT</span>
              </div>
              <span className="font-sans font-semibold text-base text-[var(--foreground)]">
                Conglomerate<span className="text-[var(--brand-red)]">IT</span>
              </span>
            </Link>
            <p className="text-[var(--text-subtle)] text-sm leading-relaxed mb-5">
              A multi-domain powerhouse driving innovation and excellence across every industry we enter.
            </p>
            <div className="flex gap-2">
              {['Li', 'Tw', 'Fb'].map((s, i) => (
                <a
                  key={s}
                  href="https://conglomerateit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={['LinkedIn', 'Twitter', 'Facebook'][i]}
                  className="w-8 h-8 rounded border border-white/[0.08] flex items-center justify-center text-[var(--text-subtle)] hover:border-[var(--brand-red)] hover:text-[var(--brand-red)] transition-colors text-[11px] font-mono font-bold"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-[10px] text-[var(--text-subtle)] tracking-widest uppercase mb-4">Company</h4>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[var(--text-subtle)] hover:text-[var(--foreground)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Verticals */}
          <div>
            <h4 className="font-mono text-[10px] text-[var(--text-subtle)] tracking-widest uppercase mb-4">Verticals</h4>
            <ul className="flex flex-col gap-2.5">
              {verticalLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[var(--text-subtle)] hover:text-[var(--foreground)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-mono text-[10px] text-[var(--text-subtle)] tracking-widest uppercase mb-4">Resources</h4>
            <ul className="flex flex-col gap-2.5">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[var(--text-subtle)] hover:text-[var(--foreground)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.05]">
          <p className="font-mono text-[11px] text-[var(--text-subtle)]">
            &copy; {new Date().getFullYear()} ConglomerateIT. All rights reserved.
          </p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link
                key={item}
                href="/contact"
                className="font-mono text-[11px] text-[var(--text-subtle)] hover:text-[var(--foreground)] transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
