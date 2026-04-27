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
      setWordIndex(i => (i + 1) % WORDS.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, wordIndex])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero pt-20 pb-0">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[var(--brand-blue)]/5 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--brand-red)]/4 blur-[100px]" />
      </div>

      {/* Gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[var(--background)] pointer-events-none z-10" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pb-32">
        <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-balance mb-6 fade-in-up">
          <span className="text-foreground">Transform Your Business</span>
          <br />
          <span className="text-foreground">With Tomorrow&apos;s </span>
          <span className="text-[var(--brand-blue)]">{displayed}</span>
          <span className="text-[var(--brand-blue)] cursor-blink">|</span>
        </h1>

        <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 fade-in-up">
          Delivering exceptional results across QA, Cloud, AI, Infrastructure, Analytics, and Development for enterprises worldwide.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in-up">
          <Link href="/services" className="btn-primary">
            Explore Services
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link href="/contact" className="btn-ghost">
            Contact Us
          </Link>
        </div>

        <div className="mt-20 flex flex-col items-center gap-2">
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
