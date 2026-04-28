import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { services } from '@/lib/data'

const ServiceIcon = ({ icon, color }: { icon: string; color: string }) => {
  const iconClass = color === 'blue' ? 'text-[var(--brand-blue)]' : 'text-[var(--brand-red)]'
  
  const icons: Record<string, JSX.Element> = {
    shield: (
      <svg className={`w-8 h-8 ${iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    cloud: (
      <svg className={`w-8 h-8 ${iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    brain: (
      <svg className={`w-8 h-8 ${iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    server: (
      <svg className={`w-8 h-8 ${iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
    chart: (
      <svg className={`w-8 h-8 ${iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    code: (
      <svg className={`w-8 h-8 ${iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  }

  return icons[icon] || icons.code
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-badge badge-blue mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-blue)]" />
            <span className="text-xs font-medium">Our Services</span>
          </div>
          <h1 className="font-semibold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-balance leading-tight">
            Enterprise IT Services for
            <br />
            <span className="text-[var(--brand-blue)]">Digital Transformation</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Comprehensive technology solutions across QA, Cloud, AI, Infrastructure, Analytics, and Development to accelerate your business growth.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={service.id}
                id={service.id}
                className="glass-card rounded-2xl p-8 group"
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${
                  service.color === 'blue' 
                    ? 'bg-[var(--brand-blue)]/10 border border-[var(--brand-blue)]/20' 
                    : 'bg-[var(--brand-red)]/10 border border-[var(--brand-red)]/20'
                }`}>
                  <ServiceIcon icon={service.icon} color={service.color} />
                </div>

                {/* Content */}
                <h3 className="font-semibold text-xl text-foreground mb-2">{service.title}</h3>
                <p className={`text-xs font-medium mb-3 ${
                  service.color === 'blue' ? 'text-[var(--brand-blue)]' : 'text-[var(--brand-red)]'
                }`}>
                  {service.tagline}
                </p>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        service.color === 'blue'
                          ? 'bg-[var(--brand-blue)]/10 text-[var(--brand-blue)] border border-[var(--brand-blue)]/20'
                          : 'bg-[var(--brand-red)]/10 text-[var(--brand-red)] border border-[var(--brand-red)]/20'
                      }`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <Link
                  href="/contact"
                  className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                    service.color === 'blue' 
                      ? 'text-[var(--brand-blue)] hover:text-[var(--brand-blue-light)]' 
                      : 'text-[var(--brand-red)] hover:text-[var(--brand-red)]'
                  }`}
                >
                  Learn More
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto glass-panel rounded-2xl p-12 text-center">
          <h2 className="font-semibold text-3xl md:text-4xl text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mb-8 max-w-2xl mx-auto">
            Let us help you transform your business with our comprehensive IT services and solutions.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--brand-blue)] text-white font-medium hover:shadow-[0_0_30px_var(--brand-blue-glow)] transition-all"
          >
            Contact Us Today
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          </div>
      </section>

      <Footer />
    </main>
  )
}
