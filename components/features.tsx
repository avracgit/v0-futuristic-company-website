'use client'

import { useState } from 'react'
import Link from 'next/link'

const features = [
  {
    id: 'workflow',
    label: 'FEATURE 1',
    title: 'Workflow Automation',
    description: 'Save your team\'s valuable time by automatically generating workflows optimized for each of your projects.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    tableTitle: 'Streamlined Workflows',
    data: [
      { name: 'Target Store', company: 'Company Inc.', progress: 'In Progress', status: 'Priority', contact: 'John@...', action: 'Start' },
      { name: 'Time Analytics', company: 'Lab Ltd', progress: 'In Progress', status: 'Standard', contact: 'Tom@...', action: 'Start' },
      { name: 'Cloud Solution', company: 'Cloud Corp', progress: 'Completed', status: 'Urgent', contact: 'Mike@...', action: 'View' },
      { name: 'Data Pipeline', company: 'Data Inc', progress: 'In Progress', status: 'Standard', contact: 'Sara@...', action: 'Start' },
      { name: 'Tech Platform', company: 'Tech Ltd', progress: 'Pending', status: 'Priority', contact: 'Alex@...', action: 'Start' },
    ],
  },
  {
    id: 'outreach',
    label: 'FEATURE 2',
    title: 'Outreach Automation',
    description: 'Launch multi-channel outreach campaigns with content personalized for every decision maker.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
    tableTitle: 'Campaign Outreach',
    data: [
      { name: 'Email Sequence', company: 'Marketing Co', progress: 'Active', status: 'High Open Rate', contact: 'Lisa@...', action: 'Edit' },
      { name: 'LinkedIn Campaign', company: 'Sales Inc', progress: 'Active', status: 'Engaging', contact: 'Mark@...', action: 'Edit' },
      { name: 'Cold Outreach', company: 'Growth Ltd', progress: 'Paused', status: 'A/B Testing', contact: 'Emma@...', action: 'Resume' },
      { name: 'Webinar Follow-up', company: 'Event Corp', progress: 'Completed', status: 'Success', contact: 'Dave@...', action: 'View' },
      { name: 'Newsletter', company: 'Media Inc', progress: 'Scheduled', status: 'Ready', contact: 'Kate@...', action: 'Launch' },
    ],
  },
  {
    id: 'analytics',
    label: 'FEATURE 3',
    title: 'Advanced Analytics',
    description: 'Get real-time insights into performance metrics and optimize your strategy with data-driven decisions.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    tableTitle: 'Analytics Dashboard',
    data: [
      { name: 'Conversion Rate', company: 'Q1 2024', progress: '+23%', status: 'Above Target', contact: 'KPI 1', action: 'Details' },
      { name: 'User Engagement', company: 'Weekly', progress: '+15%', status: 'Growing', contact: 'KPI 2', action: 'Details' },
      { name: 'Revenue Growth', company: 'Monthly', progress: '+31%', status: 'Exceeding', contact: 'KPI 3', action: 'Details' },
      { name: 'Churn Rate', company: 'Quarterly', progress: '-8%', status: 'Improving', contact: 'KPI 4', action: 'Details' },
      { name: 'NPS Score', company: 'Annual', progress: '72', status: 'Excellent', contact: 'KPI 5', action: 'Details' },
    ],
  },
]

export default function Features() {
  const [activeFeature, setActiveFeature] = useState('workflow')
  const currentFeature = features.find(f => f.id === activeFeature) || features[0]

  return (
    <section className="relative py-24 overflow-hidden section-features">
      {/* Content */}
      <div className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Badge */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-blue">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="text-xs font-medium">Features</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Content */}
            <div>
              <h2 className="font-semibold text-3xl md:text-4xl lg:text-5xl text-[var(--foreground)] mb-6 leading-tight">
                Scale Automatically
                <br />
                For <span className="text-[var(--brand-blue)]">Success</span>
              </h2>

              {/* Feature list */}
              <div className="space-y-4 mt-10">
                {features.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => setActiveFeature(feature.id)}
                    className={`feature-btn w-full text-left p-5 rounded-xl border ${
                      activeFeature === feature.id
                        ? 'feature-btn-active border-[var(--brand-blue)]'
                        : 'border-[var(--border)] hover:border-[var(--brand-blue)]/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        activeFeature === feature.id
                          ? 'bg-[var(--brand-blue)] text-white'
                          : 'bg-[var(--surface-light)] text-[var(--text-secondary)]'
                      }`}>
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-[var(--text-muted)] font-medium mb-1">{feature.label}</p>
                        <h3 className="font-semibold text-[var(--foreground)] mb-1">{feature.title}</h3>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Dynamic Preview */}
            <div className="bg-white rounded-2xl border border-[var(--border)] shadow-xl overflow-hidden card-hover">
              <div className="p-4 border-b border-[var(--border)] flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[var(--brand-blue)]/10 flex items-center justify-center">
                  {currentFeature.icon}
                </div>
                <span className="text-sm font-medium text-[var(--foreground)]">
                  {currentFeature.tableTitle.split(' ')[0]}{' '}
                  <span className="text-[var(--brand-blue)]">{currentFeature.tableTitle.split(' ').slice(1).join(' ')}</span>
                </span>
              </div>

              <div className="p-4">
                <h4 className="text-sm font-medium text-[var(--foreground)] mb-4">
                  {currentFeature.id === 'analytics' ? 'Key Metrics' : 'Accounts'}
                </h4>
                
                {/* Table header */}
                <div className="grid grid-cols-6 gap-2 text-xs text-[var(--text-muted)] font-medium pb-2 border-b border-[var(--border)]">
                  <span>Name</span>
                  <span>Period</span>
                  <span>Progress</span>
                  <span>Status</span>
                  <span>Ref</span>
                  <span></span>
                </div>

                {/* Table rows - animated */}
                <div className="divide-y divide-[var(--border)]/50">
                  {currentFeature.data.map((row, i) => (
                    <div 
                      key={`${currentFeature.id}-${i}`} 
                      className="grid grid-cols-6 gap-2 py-3 text-xs items-center fade-in-up"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div>
                        <p className="font-medium text-[var(--foreground)]">{row.name}</p>
                        <p className="text-[var(--text-muted)]">{row.company}</p>
                      </div>
                      <span className="text-[var(--text-secondary)]">Active</span>
                      <div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                          row.progress === 'Completed' || row.progress.startsWith('+')
                            ? 'bg-green-100 text-green-700'
                            : row.progress === 'Pending' || row.progress === 'Paused' || row.progress.startsWith('-')
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {row.progress}
                        </span>
                      </div>
                      <span className="text-[var(--text-secondary)]">{row.status}</span>
                      <span className="text-[var(--text-muted)]">{row.contact}</span>
                      <button className="text-[var(--brand-blue)] hover:underline text-right font-medium">{row.action}</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Link
              href="/services"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium"
            >
              Explore All Services
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
