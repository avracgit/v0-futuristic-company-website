'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { services } from '@/lib/data'

const offices = [
  {
    city: 'Headquarters',
    address: 'United States',
    email: 'info@conglomerateit.com',
    phone: '+1 (555) 000-0000',
  },
  {
    city: 'Development Center',
    address: 'India',
    email: 'india@conglomerateit.com',
    phone: '+91 (000) 000-0000',
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send to an API
    console.log('Form submitted:', formData)
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-blue mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-blue)]" />
            <span className="text-xs font-medium">Contact Us</span>
          </div>
          <h1 className="font-semibold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-balance leading-tight">
            Let&apos;s Build Something
            <br />
            <span className="text-[var(--brand-blue)]">Exceptional Together</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Ready to transform your enterprise? Get in touch with our team to discuss your project requirements.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div className="glass-card rounded-2xl p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-2xl text-foreground mb-3">Thank You!</h3>
                  <p className="text-[var(--text-secondary)]">
                    We&apos;ve received your message and will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="font-semibold text-2xl text-foreground mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm text-[var(--text-secondary)] mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--surface-elevated)] border border-white/10 text-foreground placeholder:text-[var(--text-muted)] text-sm focus:outline-none focus:border-[var(--brand-blue)] transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm text-[var(--text-secondary)] mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--surface-elevated)] border border-white/10 text-foreground placeholder:text-[var(--text-muted)] text-sm focus:outline-none focus:border-[var(--brand-blue)] transition-colors"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm text-[var(--text-secondary)] mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--surface-elevated)] border border-white/10 text-foreground placeholder:text-[var(--text-muted)] text-sm focus:outline-none focus:border-[var(--brand-blue)] transition-colors"
                        placeholder="Your Company Inc."
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm text-[var(--text-secondary)] mb-2">
                        Service of Interest
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--surface-elevated)] border border-white/10 text-foreground text-sm focus:outline-none focus:border-[var(--brand-blue)] transition-colors"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.title}
                          </option>
                        ))}
                        <option value="other">Other / General Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm text-[var(--text-secondary)] mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--surface-elevated)] border border-white/10 text-foreground placeholder:text-[var(--text-muted)] text-sm focus:outline-none focus:border-[var(--brand-blue)] transition-colors resize-none"
                        placeholder="Tell us about your project requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-4 rounded-xl bg-[var(--brand-blue)] text-white font-medium hover:shadow-[0_0_30px_var(--brand-blue-glow)] transition-all flex items-center justify-center gap-2"
                    >
                      Send Message
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-semibold text-2xl text-foreground mb-6">Get in Touch</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                Have a question or ready to start your digital transformation journey? Our team is here to help you every step of the way.
              </p>

              {/* Direct Contact */}
              <div className="space-y-4 mb-10">
                <a
                  href="mailto:info@conglomerateit.com"
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-[var(--brand-blue)]/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--brand-blue)]/10 flex items-center justify-center text-[var(--brand-blue)]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)]">Email Us</p>
                    <p className="text-foreground font-medium group-hover:text-[var(--brand-blue)] transition-colors">info@conglomerateit.com</p>
                  </div>
                </a>

                <a
                  href="https://conglomerateit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-[var(--brand-blue)]/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--brand-blue)]/10 flex items-center justify-center text-[var(--brand-blue)]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)]">Visit Website</p>
                    <p className="text-foreground font-medium group-hover:text-[var(--brand-blue)] transition-colors">conglomerateit.com</p>
                  </div>
                </a>
              </div>

              {/* Offices */}
              <h3 className="font-semibold text-lg text-foreground mb-4">Our Offices</h3>
              <div className="space-y-4">
                {offices.map((office, i) => (
                  <div key={i} className="p-4 rounded-xl border border-white/10">
                    <h4 className="font-medium text-foreground mb-1">{office.city}</h4>
                    <p className="text-sm text-[var(--text-muted)] mb-2">{office.address}</p>
                    <p className="text-sm text-[var(--brand-blue)]">{office.email}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
