import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  Services: [
    { label: 'QA & Testing', href: '/services#qa-testing' },
    { label: 'Cloud & DevOps', href: '/services#cloud-devops' },
    { label: 'AI & ML', href: '/services#ai-ml' },
    { label: 'Analytics', href: '/services#analytics' },
    { label: 'Development', href: '/services#development' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Leadership', href: '/about#leadership' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  Resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Whitepapers', href: '/resources' },
    { label: 'Events', href: '/events' },
  ],
}

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const socialLinks = [
  { name: 'LinkedIn', href: 'https://linkedin.com/company/conglomerateit', Icon: LinkedInIcon },
  { name: 'X', href: 'https://twitter.com/conglomerateit', Icon: XIcon },
  { name: 'Facebook', href: 'https://facebook.com/conglomerateit', Icon: FacebookIcon },
]

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-10 px-6 overflow-hidden">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-blue)]/30 to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 gradient-radial pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto relative">
        {/* CTA Band */}
        <div className="rounded-2xl p-10 mb-20 text-center relative overflow-hidden bg-gradient-to-br from-[var(--brand-blue)]/10 to-[var(--brand-red)]/5 border border-[var(--brand-blue)]/20">
          <h3 className="font-semibold text-3xl md:text-4xl text-foreground mb-4 text-balance">
            Ready to Transform Your <span className="text-[var(--brand-blue)]">Enterprise?</span>
          </h3>
          <p className="text-[var(--text-secondary)] mb-8 max-w-xl mx-auto text-lg">
            Partner with ConglomerateIT and leverage AI-first solutions for your digital transformation journey.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-xl bg-[var(--brand-blue)] text-white font-medium text-sm hover:shadow-[0_0_30px_var(--brand-blue-glow)] transition-all duration-300"
            >
              Get Started Today
            </Link>
            <Link
              href="/services"
              className="px-8 py-3.5 rounded-xl border border-white/15 text-foreground font-medium text-sm hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)] transition-all duration-300"
            >
              View Services
            </Link>
          </div>
        </div>

        {/* Footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner%20logo%20latest-Wy6FwAgjDavAiB9pvHR7pRWJVuZx3Z.png"
                alt="ConglomerateIT"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <span className="font-semibold text-lg text-foreground">
                Conglomerate<span className="text-[var(--brand-blue)]">IT</span>
              </span>
            </Link>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-5 max-w-xs">
              AI-first enterprise transformation partner delivering exceptional results across QA, Cloud, AI, Infrastructure, Analytics, and Development.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs text-[var(--brand-blue)] tracking-widest uppercase font-medium mb-5">
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--brand-blue)] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} ConglomerateIT LLC. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--brand-blue)] transition-colors"
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
