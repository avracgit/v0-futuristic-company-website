'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const WORDS = ['Innovation', 'Transformation', 'Excellence', 'Solutions']

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = WORDS[wordIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setWordIndex((i) => (i + 1) % WORDS.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, wordIndex])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-hero pt-20">
      {/* Subtle gradient accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[var(--brand-blue)]/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[var(--brand-red)]/5 blur-[100px]" />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--brand-blue)]/5 border border-[var(--brand-blue)]/10 mb-8 fade-in-up">
          <span className="w-2 h-2 rounded-full bg-[var(--brand-blue)] animate-pulse" />
          <span className="text-sm text-[var(--text-secondary)] font-medium">AI-First Enterprise Solutions</span>
        </div>

        {/* Headline */}
        <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-balance mb-6 fade-in-up text-[var(--foreground)]">
          Transform Your Business
          <br />
          With Tomorrow&apos;s{' '}
          <span className="text-[var(--brand-blue)]">{displayed}</span>
          <span className="text-[var(--brand-blue)] cursor-blink">|</span>
        </h1>

        {/* Subheadline */}
        <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 fade-in-up">
          Delivering exceptional results across QA, Cloud, AI, Infrastructure, Analytics, and Development for enterprises worldwide.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in-up">
          <Link
            href="/services"
            className="btn-primary px-8 py-4 rounded-xl font-medium text-sm flex items-center gap-2"
          >
            Explore Services
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="btn-secondary px-8 py-4 rounded-xl font-medium text-sm"
          >
            Contact Us
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="mt-24 flex flex-col items-center gap-2">
          <span className="text-xs text-[var(--text-muted)]">Scroll to explore</span>
          <div className="scroll-indicator">
            <svg className="w-5 h-5 text-[var(--brand-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
