'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const WORDS = ['Innovation', 'Transformation', 'Excellence', 'Solutions']

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  // Typewriter effect
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero pt-20">
      {/* Floating workflow nodes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top left node */}
        <div className="absolute top-[20%] left-[10%] animate-float">
          <div className="node-card px-4 py-2 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--brand-blue)]/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-[var(--brand-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <span className="text-xs text-[var(--text-secondary)]">Import <span className="text-foreground">CRM data</span></span>
          </div>
        </div>

        {/* Top right node */}
        <div className="absolute top-[25%] right-[12%] animate-float-delayed">
          <div className="node-card px-4 py-2 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--brand-blue)]/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-[var(--brand-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xs text-[var(--text-secondary)]">Calendar <span className="text-foreground">Meetings</span></span>
          </div>
        </div>

        {/* Bottom left node */}
        <div className="absolute bottom-[25%] left-[15%] animate-float-delayed">
          <div className="badge-blue px-3 py-1.5 rounded-full text-xs font-medium">
            Launch
          </div>
        </div>

        {/* Bottom right node */}
        <div className="absolute bottom-[30%] right-[15%] animate-float">
          <div className="badge-blue px-3 py-1.5 rounded-full text-xs font-medium">
            Deliver
          </div>
        </div>

        {/* Bottom center floating cards */}
        <div className="absolute bottom-[15%] left-[30%] animate-float">
          <div className="node-card px-4 py-2 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[var(--brand-blue)]/20 flex items-center justify-center">
              <svg className="w-3 h-3 text-[var(--brand-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-[10px] text-[var(--text-muted)]">Custom <span className="text-foreground">websites & outreach</span> for each target</span>
          </div>
        </div>

        <div className="absolute bottom-[12%] right-[28%] animate-float-delayed">
          <div className="node-card px-4 py-2 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[var(--brand-blue)]/20 flex items-center justify-center">
              <svg className="w-3 h-3 text-[var(--brand-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <span className="text-[10px] text-[var(--text-muted)]"><span className="text-foreground">Automatic</span> improvements</span>
          </div>
        </div>

        {/* Small floating icons */}
        <div className="absolute top-[35%] left-[25%] w-10 h-10 rounded-xl bg-[var(--surface-card)] border border-white/5 flex items-center justify-center animate-float">
          <svg className="w-5 h-5 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <div className="absolute top-[40%] right-[20%] w-10 h-10 rounded-xl bg-[var(--surface-card)] border border-white/5 flex items-center justify-center animate-float-delayed">
          <svg className="w-5 h-5 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-blue mb-8 fade-in-up">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-blue)] pulse-glow" />
          <span className="text-xs font-medium tracking-wide">
            AI-First Enterprise Transformation Partner
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-balance mb-6 fade-in-up">
          <span className="text-foreground">Transform Your Business</span>
          <br />
          <span className="text-foreground">With Tomorrow&apos;s </span>
          <span className="text-[var(--brand-blue)]">{displayed}</span>
          <span className="text-[var(--brand-blue)] cursor-blink">|</span>
        </h1>

        {/* Subheadline */}
        <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 fade-in-up">
          Delivering exceptional results across QA, Cloud, AI, Infrastructure, Analytics, and Development for enterprises worldwide.
        </p>

        {/* CTA Input */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 fade-in-up max-w-lg mx-auto">
          <div className="w-full sm:flex-1 relative">
            <input
              type="text"
              placeholder="https://yourcompany.com"
              className="w-full px-5 py-3.5 rounded-xl bg-[var(--surface-card)] border border-white/10 text-foreground placeholder:text-[var(--text-muted)] text-sm focus:outline-none focus:border-[var(--brand-blue)] transition-colors"
            />
          </div>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[var(--brand-blue)] text-white font-medium text-sm hover:shadow-[0_0_30px_var(--brand-blue-glow)] transition-all duration-300 flex items-center justify-center gap-2"
          >
            Get Started
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Scroll indicator */}
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
