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

const socialLinks = [
  { name: 'LinkedIn', href: 'https://linkedin.com/company/conglomerateit', icon: 'L' },
  { name: 'Twitter', href: 'https://twitter.com/conglomerateit', icon: 'X' },
  { name: 'Facebook', href: 'https://facebook.com/conglomerateit', icon: 'F' },
]

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-10 px-6 overflow-hidden section-footer">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        {/* CTA Band */}
        <div className="rounded-2xl p-10 mb-20 text-center relative overflow-hidden bg-gradient-to-br from-[var(--brand-blue)]/5 to-[var(--brand-red)]/5 border border-[var(--border)]">
          <h3 className="font-semibold text-3xl md:text-4xl text-[var(--foreground)] mb-4 text-balance">
            Ready to Transform Your <span className="text-[var(--brand-blue)]">Enterprise?</span>
          </h3>
          <p className="text-[var(--text-secondary)] mb-8 max-w-xl mx-auto text-lg">
            Partner with ConglomerateIT and leverage AI-first solutions for your digital transformation journey.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="btn-primary px-8 py-3.5 rounded-xl text-sm font-medium"
            >
              Get Started Today
            </Link>
            <Link
              href="/services"
              className="btn-secondary px-8 py-3.5 rounded-xl text-sm font-medium"
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
              <span className="font-semibold text-lg text-[var(--foreground)]">
                Conglomerate<span className="text-[var(--brand-blue)]">IT</span>
              </span>
            </Link>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-5 max-w-xs">
              AI-first enterprise transformation partner delivering exceptional results across QA, Cloud, AI, Infrastructure, Analytics, and Development.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)] hover:-translate-y-1 transition-all duration-200"
                >
                  <span className="text-xs font-bold">{social.icon}</span>
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[var(--border)]">
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
