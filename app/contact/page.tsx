'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { verticals } from '@/lib/verticals-data'

const offices = [
  {
    city: 'Bangalore',
    role: 'Headquarters',
    address: '100 Tech Park, Electronic City Phase 1, Bangalore 560100',
    phone: '+91 80 1234 5678',
    email: 'india@conglomerateit.com',
  },
  {
    city: 'Mumbai',
    role: 'Finance & Real Estate Hub',
    address: '22nd Floor, BKC Tower, Bandra Kurla Complex, Mumbai 400051',
    phone: '+91 22 1234 5678',
    email: 'mumbai@conglomerateit.com',
  },
  {
    city: 'Dubai',
    role: 'Middle East Operations',
    address: 'Office 1204, One Central, Dubai World Trade Centre, UAE',
    phone: '+971 4 123 4567',
    email: 'mena@conglomerateit.com',
  },
]

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    vertical: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

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
            <span className="text-[var(--foreground)]">Contact</span>
          </nav>
          <p className="section-label">Get in Touch</p>
          <h1 className="font-sans font-bold text-5xl md:text-6xl text-balance text-[var(--foreground)] leading-tight max-w-xl mb-5">
            Let&apos;s Start a<br />
            <span className="text-[var(--brand-red)]">Conversation</span>
          </h1>
          <p className="text-[var(--text-muted)] text-lg max-w-md leading-relaxed">
            Tell us about your business and we will connect you with the right team across our six verticals.
          </p>
        </div>
      </section>

      {/* Form + info */}
      <section className="py-20 border-b border-white/[0.05]">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h2 className="font-sans font-semibold text-xl text-[var(--foreground)] mb-8">
                Send us a message
              </h2>

              {submitted ? (
                <div
                  className="rounded-lg p-8 border text-center"
                  style={{ background: 'rgba(224,32,32,0.06)', borderColor: 'rgba(224,32,32,0.2)' }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'rgba(224,32,32,0.12)' }}
                    aria-hidden="true"
                  >
                    <svg className="w-6 h-6 text-[var(--brand-red)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="font-sans font-semibold text-lg text-[var(--foreground)] mb-2">
                    Message Received
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm">
                    Thank you for reaching out. A member of our team will be in touch within 1–2 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-xs font-medium text-[var(--text-muted)]">
                        Full Name <span className="text-[var(--brand-red)]" aria-label="required">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className="px-4 py-2.5 rounded border border-white/[0.1] bg-[var(--card)] text-[var(--foreground)] text-sm placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-[var(--brand-red)] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-medium text-[var(--text-muted)]">
                        Email Address <span className="text-[var(--brand-red)]" aria-label="required">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="px-4 py-2.5 rounded border border-white/[0.1] bg-[var(--card)] text-[var(--foreground)] text-sm placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-[var(--brand-red)] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="company" className="text-xs font-medium text-[var(--text-muted)]">Company</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formState.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                      className="px-4 py-2.5 rounded border border-white/[0.1] bg-[var(--card)] text-[var(--foreground)] text-sm placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-[var(--brand-red)] transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="vertical" className="text-xs font-medium text-[var(--text-muted)]">
                      Area of Interest
                    </label>
                    <select
                      id="vertical"
                      name="vertical"
                      value={formState.vertical}
                      onChange={handleChange}
                      className="px-4 py-2.5 rounded border border-white/[0.1] bg-[var(--card)] text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--brand-red)] transition-colors"
                    >
                      <option value="">Select a vertical (optional)</option>
                      {verticals.map((v) => (
                        <option key={v.id} value={v.id}>{v.title}</option>
                      ))}
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-medium text-[var(--text-muted)]">
                      Message <span className="text-[var(--brand-red)]" aria-label="required">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project or how we can help..."
                      className="px-4 py-2.5 rounded border border-white/[0.1] bg-[var(--card)] text-[var(--foreground)] text-sm placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-[var(--brand-red)] transition-colors resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-primary justify-center mt-2">
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div>
              <h2 className="font-sans font-semibold text-xl text-[var(--foreground)] mb-8">
                Our Offices
              </h2>
              <div className="flex flex-col gap-4 mb-10">
                {offices.map((office, i) => (
                  <div key={office.city} className="brand-card rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className="flex-shrink-0 w-8 h-8 rounded flex items-center justify-center font-mono text-[11px] font-bold text-white"
                        style={{ background: i % 2 === 0 ? 'var(--brand-red)' : 'var(--brand-blue)' }}
                        aria-hidden="true"
                      >
                        {office.city[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-sans font-semibold text-sm text-[var(--foreground)]">{office.city}</h3>
                          <span
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                            style={{
                              background: i % 2 === 0 ? 'rgba(224,32,32,0.08)' : 'rgba(26,79,204,0.08)',
                              color: i % 2 === 0 ? 'var(--brand-red)' : 'var(--brand-blue-light)',
                            }}
                          >
                            {office.role}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-subtle)] mb-2 leading-relaxed">{office.address}</p>
                        <div className="flex flex-col gap-1">
                          <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="text-xs text-[var(--text-subtle)] hover:text-[var(--foreground)] transition-colors">
                            {office.phone}
                          </a>
                          <a href={`mailto:${office.email}`} className="text-xs text-[var(--text-subtle)] hover:text-[var(--brand-red)] transition-colors">
                            {office.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct email */}
              <div className="rounded-lg p-6 border border-white/[0.07]"
                style={{ background: 'rgba(224,32,32,0.04)' }}
              >
                <p className="text-xs text-[var(--text-subtle)] mb-1">General Enquiries</p>
                <a
                  href="mailto:info@conglomerateit.com"
                  className="font-sans font-semibold text-[var(--foreground)] hover:text-[var(--brand-red)] transition-colors"
                >
                  info@conglomerateit.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
