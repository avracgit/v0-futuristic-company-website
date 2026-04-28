'use client'

import { useState } from 'react'

const verticals = [
  {
    id: 'technology',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
    title: 'Technology',
    tagline: 'Engineering the Future',
    description:
      'Cutting-edge software development, cloud infrastructure, AI solutions, and enterprise IT services that power businesses at scale.',
    features: ['Cloud & DevOps', 'AI / ML Solutions', 'Enterprise Software', 'Cybersecurity'],
    color: '#00d4ff',
    glow: 'rgba(0, 212, 255, 0.15)',
  },
  {
    id: 'consulting',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    title: 'Business Consulting',
    tagline: 'Strategy at Every Scale',
    description:
      'End-to-end business transformation services — from organizational design to process optimization and market expansion strategies.',
    features: ['Digital Transformation', 'Process Optimization', 'Market Strategy', 'Change Management'],
    color: '#7c3aed',
    glow: 'rgba(124, 58, 237, 0.15)',
  },
  {
    id: 'staffing',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: 'Staffing & HR',
    tagline: 'Human Capital, Amplified',
    description:
      'Talent acquisition, workforce management, and HR solutions that connect the right people to the right opportunities, at the right time.',
    features: ['Executive Search', 'Contract Staffing', 'HR Outsourcing', 'Training & Development'],
    color: '#00d4ff',
    glow: 'rgba(0, 212, 255, 0.15)',
  },
  {
    id: 'realestate',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: 'Real Estate',
    tagline: 'Building Tomorrow',
    description:
      'Strategic real estate investments, property development, and smart space management solutions redefining urban landscapes.',
    features: ['Commercial Development', 'Smart Infrastructure', 'Property Management', 'Investment Advisory'],
    color: '#7c3aed',
    glow: 'rgba(124, 58, 237, 0.15)',
  },
  {
    id: 'education',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    title: 'Education & Training',
    tagline: 'Shaping Tomorrow\'s Leaders',
    description:
      'World-class educational programs, corporate training, and skill development platforms that prepare professionals for an evolving world.',
    features: ['Corporate Training', 'E-Learning Platforms', 'Certification Programs', 'Leadership Development'],
    color: '#00d4ff',
    glow: 'rgba(0, 212, 255, 0.15)',
  },
  {
    id: 'finance',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Finance & Fintech',
    tagline: 'Capital Intelligence',
    description:
      'Financial advisory, investment management, and fintech solutions that bring clarity to complex financial landscapes.',
    features: ['Investment Advisory', 'Fintech Products', 'Risk Management', 'Wealth Planning'],
    color: '#7c3aed',
    glow: 'rgba(124, 58, 237, 0.15)',
  },
]

export default function Verticals() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section id="verticals" className="relative py-28 px-6 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124,58,237,0.06) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-badge border-[var(--brand-blue)]/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-blue)]" />
            <span className="font-mono text-xs text-[var(--brand-blue)] tracking-widest uppercase">
              Our Verticals
            </span>
          </div>
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-balance text-foreground mb-4">
            Multiple Domains,{' '}
            <span className="text-[var(--neon-cyan)]">One Vision</span>
          </h2>
          <p className="text-[#a0a8c0] text-lg max-w-xl mx-auto leading-relaxed">
            We operate across diverse industries, bringing unparalleled expertise and proven results
            to every domain we enter.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verticals.map((v, i) => (
            <div
              key={v.id}
              onMouseEnter={() => setActive(v.id)}
              onMouseLeave={() => setActive(null)}
              className="glass-card rounded-2xl p-7 cursor-default group fade-in-up"
              style={{
                animationDelay: `${i * 0.1}s`,
                boxShadow: active === v.id ? `0 0 40px ${v.glow}, 0 0 80px ${v.glow}` : undefined,
                borderColor: active === v.id ? `${v.color}50` : undefined,
              }}
            >
              {/* Icon */}
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 transition-all duration-300"
                style={{
                  background: `${v.color}15`,
                  border: `1px solid ${v.color}30`,
                  color: v.color,
                  boxShadow: active === v.id ? `0 0 16px ${v.glow}` : undefined,
                }}
              >
                {v.icon}
              </div>

              {/* Title */}
              <div className="mb-3">
                <h3 className="font-sans font-semibold text-xl text-foreground">{v.title}</h3>
                <p className="font-mono text-xs mt-0.5" style={{ color: v.color }}>
                  {v.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-[#a0a8c0] text-sm leading-relaxed mb-6">{v.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {v.features.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: `${v.color}10`,
                      border: `1px solid ${v.color}25`,
                      color: v.color,
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* Bottom line accent */}
              <div
                className="mt-6 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: `linear-gradient(90deg, ${v.color}, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
