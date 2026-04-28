'use client'

import { useState } from 'react'
import Link from 'next/link'

const features = [
  {
    id: 'workflow',
    label: 'FEATURE 1',
    title: 'Workflow Automation',
    description: 'Save your team\'s valuable time by automatically generating workflows optimized for each of your campaigns and client engagements.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    preview: {
      title: 'Streamlined Workflows',
      subtitle: 'Accounts',
      rows: [
        { name: 'Target Store',    company: 'Company Inc.',   status: 'In Progress', badge: 'blue' },
        { name: 'Time Committed',  company: 'Lab Ltd',        status: 'Completed',   badge: 'green' },
        { name: 'Cloud Solution',  company: 'Cloud Corp',     status: 'Completed',   badge: 'green' },
        { name: 'Data Service',    company: 'Data Inc.',      status: 'In Progress', badge: 'blue' },
        { name: 'Tech Platform',   company: 'Tech Ltd',       status: 'Pending',     badge: 'yellow' },
      ],
      columns: ['Account', 'Company', 'Progress', 'Action'],
    },
  },
  {
    id: 'outreach',
    label: 'FEATURE 2',
    title: 'Outreach Automation',
    description: 'Launch multi-channel outreach campaigns with content personalized for every decision maker at scale.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
    preview: {
      title: 'Active Campaigns',
      subtitle: 'Outreach Queue',
      rows: [
        { name: 'Email Sequence A',    company: 'FinTech Leads',  status: 'Sent 840',    badge: 'green' },
        { name: 'LinkedIn Campaign B', company: 'SaaS Targets',   status: 'Sent 320',    badge: 'blue' },
        { name: 'Follow-up Round 3',   company: 'EdTech Segment', status: 'Queued 210',  badge: 'yellow' },
        { name: 'Cold Call Script',    company: 'Enterprise',     status: 'Active',      badge: 'green' },
        { name: 'Nurture Track 2',     company: 'SMB Prospects',  status: 'Draft',       badge: 'yellow' },
      ],
      columns: ['Campaign', 'Segment', 'Status', 'Edit'],
    },
  },
  {
    id: 'analytics',
    label: 'FEATURE 3',
    title: 'Advanced Analytics',
    description: 'Get real-time insights into performance metrics and optimize your strategy continuously with data-driven decisions.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    preview: {
      title: 'Performance Overview',
      subtitle: 'Key Metrics',
      rows: [
        { name: 'Open Rate',         company: 'Email Channel',  status: '34.8%', badge: 'green' },
        { name: 'Click-through',     company: 'All Channels',   status: '12.3%', badge: 'blue' },
        { name: 'Response Rate',     company: 'LinkedIn',       status: '8.7%',  badge: 'blue' },
        { name: 'Meeting Booked',    company: 'All Sequences',  status: '4.2%',  badge: 'green' },
        { name: 'Deal Closed',       company: 'Pipeline',       status: '1.9%',  badge: 'yellow' },
      ],
      columns: ['Metric', 'Channel', 'Rate', 'Trend'],
    },
  },
]

const badgeClass: Record<string, string> = {
  green:  'bg-emerald-500/15 text-emerald-400',
  blue:   'bg-blue-500/15 text-blue-400',
  yellow: 'bg-amber-500/15 text-amber-400',
}

export default function Features() {
  const [activeId, setActiveId] = useState('workflow')
  const active = features.find(f => f.id === activeId)!

  return (
    <section id="features" className="section-base section-blend relative bg-[var(--surface-mid)]">
      {/* Soft gradient top transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--background)] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Badge */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-blue text-xs font-medium">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Features
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left: feature selector */}
          <div>
            <h2 className="font-semibold text-2xl md:text-4xl lg:text-5xl text-foreground mb-6 md:mb-10 leading-tight">
              Scale Automatically
              <br />
              For <span className="text-[var(--brand-blue)]">Success</span>
            </h2>

            <div className="space-y-4">
              {features.map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveId(f.id)}
                  className={`w-full text-left p-3 md:p-5 rounded-xl border transition-all duration-200 ${
                    activeId === f.id
                      ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/8 shadow-md shadow-blue-500/10'
                      : 'border-white/8 hover:border-white/20 hover:bg-white/4'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                      activeId === f.id ? 'bg-[var(--brand-blue)] text-white' : 'bg-white/8 text-[var(--text-secondary)]'
                    }`}>
                      {f.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[var(--text-muted)] font-medium mb-1">{f.label}</p>
                      <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: dynamic preview panel */}
          <div className="glass-card rounded-2xl overflow-x-auto" key={activeId}>
            {/* Panel header */}
            <div className="px-5 py-4 border-b border-white/8 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--brand-blue)]/15 flex items-center justify-center text-[var(--brand-blue)]">
                {active.icon}
              </div>
              <span className="text-sm font-medium text-foreground">
                {active.preview.title}
              </span>
            </div>

            <div className="p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4">{active.preview.subtitle}</h4>

              {/* Column headers */}
              <div className="grid grid-cols-4 gap-2 text-[10px] text-[var(--text-muted)] font-medium uppercase tracking-wide pb-2 border-b border-white/6">
                {active.preview.columns.map(c => <span key={c}>{c}</span>)}
              </div>

              {/* Rows */}
              <div className="divide-y divide-white/5">
                {active.preview.rows.map((row, i) => (
                  <div key={i} className="grid grid-cols-4 gap-2 py-3 items-center">
                    <div>
                      <p className="text-xs font-medium text-foreground truncate">{row.name}</p>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] truncate">{row.company}</p>
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-medium w-fit ${badgeClass[row.badge]}`}>
                      {row.status}
                    </span>
                    <button className="text-[var(--brand-blue)] text-xs hover:underline text-left transition-opacity hover:opacity-80">
                      View →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link href="/services" className="btn-primary">
            Explore All Services
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
