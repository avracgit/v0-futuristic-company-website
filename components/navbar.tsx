'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Verticals', href: '/verticals' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08090f]/95 backdrop-blur-md border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="ConglomerateIT Home">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-[var(--brand-red)]">
              <span className="font-mono text-[11px] font-bold text-white tracking-tight">CIT</span>
            </div>
            <span className="font-sans font-semibold text-base text-[var(--foreground)] tracking-tight">
              Conglomerate<span className="text-[var(--brand-red)]">IT</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-[var(--brand-red)] bg-[rgba(224,32,32,0.08)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-white/[0.05]'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex">
            <Link href="/contact" className="btn-primary text-sm py-2 px-5">
              Get in Touch
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-5 h-0.5 bg-[var(--foreground)] transition-all duration-250 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block w-5 h-0.5 bg-[var(--foreground)] transition-all duration-250 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-5 h-0.5 bg-[var(--foreground)] transition-all duration-250 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-80' : 'max-h-0'
        } bg-[#08090f]/98 backdrop-blur-md border-b border-white/[0.06]`}
      >
        <div className="section-container py-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[var(--brand-red)] bg-[rgba(224,32,32,0.08)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--foreground)]'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <Link href="/contact" className="btn-primary text-sm mt-2 justify-center">
            Get in Touch
          </Link>
        </div>
      </div>
    </nav>
  )
}
