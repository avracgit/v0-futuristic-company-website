import Link from 'next/link'

const footerLinks = {
  Company: ['About Us', 'Leadership', 'Careers', 'Press', 'Contact'],
  Verticals: ['Technology', 'Consulting', 'Staffing', 'Real Estate', 'Education', 'Finance'],
  Resources: ['Blog', 'Case Studies', 'Whitepapers', 'Events', 'Newsletter'],
}

export default function Footer() {
  return (
    <footer id="contact" className="relative pt-20 pb-10 px-6 overflow-hidden">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.3)] to-transparent" />

      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,212,255,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* CTA Band */}
        <div
          className="rounded-2xl p-10 mb-20 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(0,102,255,0.12) 0%, rgba(124,58,237,0.12) 100%)',
            border: '1px solid rgba(0,212,255,0.2)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,212,255,0.05) 0%, transparent 70%)' }}
          />
          <h3 className="font-sans font-bold text-3xl md:text-4xl text-foreground mb-4 text-balance relative z-10">
            Ready to Build Something <span className="text-[var(--neon-cyan)]">Exceptional?</span>
          </h3>
          <p className="text-[#a0a8c0] mb-8 max-w-xl mx-auto text-lg relative z-10">
            Partner with ConglomerateIT and unlock the full power of a multi-domain enterprise working for your success.
          </p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <a
              href="mailto:info@conglomerateit.com"
              className="px-8 py-3.5 rounded-xl bg-[var(--neon-cyan)] text-black font-semibold text-sm tracking-wide hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] hover:scale-105 transition-all duration-300"
            >
              Get in Touch
            </a>
            <a
              href="https://conglomerateit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl border border-[rgba(255,255,255,0.15)] text-foreground font-semibold text-sm tracking-wide hover:border-[var(--neon-cyan)] hover:text-[var(--neon-cyan)] transition-all duration-300"
            >
              Visit Website
            </a>
          </div>
        </div>

        {/* Footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg border border-[var(--neon-cyan)] flex items-center justify-center">
                <span className="font-mono text-xs font-bold text-[var(--neon-cyan)]">CG</span>
              </div>
              <span className="font-sans font-bold text-lg text-foreground">
                Conglomerate<span className="text-[var(--neon-cyan)]">IT</span>
              </span>
            </div>
            <p className="text-[#6b7494] text-sm leading-relaxed mb-5">
              A multi-domain powerhouse driving innovation and excellence across every industry we enter.
            </p>
            <div className="flex gap-3">
              {['LinkedIn', 'Twitter', 'Facebook'].map((s) => (
                <a
                  key={s}
                  href="https://conglomerateit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s}
                  className="w-9 h-9 rounded-lg border border-[rgba(0,212,255,0.2)] flex items-center justify-center text-[#6b7494] hover:border-[var(--neon-cyan)] hover:text-[var(--neon-cyan)] transition-all duration-200"
                >
                  <span className="font-mono text-[9px] font-bold">{s[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-mono text-xs text-[var(--neon-cyan)] tracking-widest uppercase mb-5">
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="https://conglomerateit.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#6b7494] hover:text-[var(--neon-cyan)] transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[rgba(0,212,255,0.08)]">
          <p className="font-mono text-xs text-[#6b7494]">
            &copy; {new Date().getFullYear()} ConglomerateIT. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="https://conglomerateit.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#6b7494] hover:text-[var(--neon-cyan)] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
