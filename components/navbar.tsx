'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Verticals', href: '#verticals' },
  { label: 'Stats', href: '#stats' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#03040a]/90 backdrop-blur-xl border-b border-[rgba(0,212,255,0.12)] shadow-[0_4px_30px_rgba(0,212,255,0.05)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 rounded-lg bg-[var(--neon-cyan)] opacity-20 group-hover:opacity-40 transition-opacity blur-sm" />
            <div className="relative w-9 h-9 rounded-lg border border-[var(--neon-cyan)] flex items-center justify-center">
              <span className="font-mono text-xs font-bold text-[var(--neon-cyan)]">CG</span>
            </div>
          </div>
          <span className="font-sans font-700 text-lg tracking-tight text-foreground">
            Conglomerate<span className="text-[var(--neon-cyan)]">IT</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-sm text-[#a0a8c0] hover:text-[var(--neon-cyan)] transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--neon-cyan)] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="#contact"
            className="px-5 py-2 rounded-lg border border-[var(--neon-cyan)] text-[var(--neon-cyan)] text-sm font-medium hover:bg-[var(--neon-cyan)] hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-[var(--neon-cyan)] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-[var(--neon-cyan)] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-[var(--neon-cyan)] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-[#03040a]/95 backdrop-blur-xl border-b border-[rgba(0,212,255,0.12)]`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-[#a0a8c0] hover:text-[var(--neon-cyan)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="px-5 py-2 rounded-lg border border-[var(--neon-cyan)] text-[var(--neon-cyan)] text-sm font-medium text-center hover:bg-[var(--neon-cyan)] hover:text-black transition-all duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </nav>
  )
}
