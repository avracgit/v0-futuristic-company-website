'use client'

import Image from 'next/image'

// Tech partner names with simple letter-avatar fallback
const partners = [
  { name: 'Salesforce', abbr: 'SF', color: '#00A1E0' },
  { name: 'AWS',        abbr: 'AW', color: '#FF9900' },
  { name: 'Azure',      abbr: 'AZ', color: '#0078D4' },
  { name: 'GCP',        abbr: 'GC', color: '#4285F4' },
  { name: 'ServiceNow', abbr: 'SN', color: '#62D84E' },
  { name: 'Kubernetes', abbr: 'K8', color: '#326CE5' },
  { name: 'Docker',     abbr: 'DK', color: '#2496ED' },
  { name: 'Terraform',  abbr: 'TF', color: '#7B42BC' },
  { name: 'Jenkins',    abbr: 'JK', color: '#D24939' },
  { name: 'GitHub',     abbr: 'GH', color: '#f0f6fc' },
  { name: 'Jira',       abbr: 'JR', color: '#0052CC' },
  { name: 'Slack',      abbr: 'SL', color: '#4A154B' },
  { name: 'Datadog',    abbr: 'DD', color: '#632CA6' },
  { name: 'Teams',      abbr: 'TM', color: '#6264A7' },
]

// SVG canvas dimensions
const W = 800
const H = 600
const CX = W / 2
const CY = H / 2
const RADIUS = 220   // orbit radius
const NODE_R = 30    // half-size of each node box

export default function Integrations() {
  return (
    <section className="section-base section-blend relative">
      <div className="absolute inset-0 gradient-radial pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-semibold text-3xl md:text-4xl lg:text-5xl text-foreground text-balance leading-tight">
            ConglomerateIT Connects You
            <br />
            With{' '}
            <span className="text-[var(--brand-blue)]">25+ Technology Partners</span>
          </h2>
        </div>

        {/* Hub-and-spoke SVG */}
        <div className="relative max-w-3xl mx-auto select-none">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto"
            aria-label="Technology partners network diagram"
          >
            <defs>
              {/* Gradient for each spoke line */}
              <linearGradient id="spokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#3b82f6" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.15" />
              </linearGradient>

              {/* Glow filter for center hub */}
              <filter id="hubGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Subtle node glow */}
              <filter id="nodeGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ── Spoke lines from hub center to each node center ── */}
            {partners.map((p, i) => {
              const angle = (2 * Math.PI * i) / partners.length - Math.PI / 2
              const nx = CX + RADIUS * Math.cos(angle)
              const ny = CY + RADIUS * Math.sin(angle)
              return (
                <line
                  key={`line-${p.name}`}
                  x1={CX}
                  y1={CY}
                  x2={nx}
                  y2={ny}
                  stroke="url(#spokeGrad)"
                  strokeWidth="1.5"
                  className="connection-line"
                  style={{ animationDelay: `${i * 0.12}s` }}
                />
              )
            })}

            {/* ── Orbit ring ── */}
            <circle
              cx={CX}
              cy={CY}
              r={RADIUS}
              fill="none"
              stroke="rgba(59,130,246,0.10)"
              strokeWidth="1"
              strokeDasharray="4 8"
            />

            {/* ── Partner nodes ── */}
            {partners.map((p, i) => {
              const angle = (2 * Math.PI * i) / partners.length - Math.PI / 2
              const nx = CX + RADIUS * Math.cos(angle)
              const ny = CY + RADIUS * Math.sin(angle)
              return (
                <g key={p.name} transform={`translate(${nx - NODE_R}, ${ny - NODE_R})`} filter="url(#nodeGlow)">
                  {/* Node background rect */}
                  <rect
                    width={NODE_R * 2}
                    height={NODE_R * 2}
                    rx="10"
                    fill="#0d1224"
                    stroke="rgba(255,255,255,0.10)"
                    strokeWidth="1"
                  />
                  {/* Abbr text */}
                  <text
                    x={NODE_R}
                    y={NODE_R - 4}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={p.color}
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="monospace"
                  >
                    {p.abbr}
                  </text>
                  {/* Partner name */}
                  <text
                    x={NODE_R}
                    y={NODE_R + 11}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="rgba(148,163,184,0.9)"
                    fontSize="7.5"
                    fontFamily="sans-serif"
                  >
                    {p.name}
                  </text>
                </g>
              )
            })}

            {/* ── Center hub ── */}
            <g filter="url(#hubGlow)">
              {/* Outer glow ring */}
              <circle cx={CX} cy={CY} r="46" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.25)" strokeWidth="1" />
              {/* Inner bg */}
              <circle cx={CX} cy={CY} r="36" fill="#0d1224" stroke="rgba(59,130,246,0.40)" strokeWidth="1.5" />
            </g>

            {/* Center logo via foreignObject */}
            <foreignObject x={CX - 24} y={CY - 24} width="48" height="48">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner%20logo%20latest-Wy6FwAgjDavAiB9pvHR7pRWJVuZx3Z.png"
                alt="ConglomerateIT"
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
            </foreignObject>
          </svg>
        </div>

        {/* Partner name strip */}
        <p className="text-center text-[var(--text-muted)] text-sm mt-6 max-w-2xl mx-auto">
          Seamlessly integrating with your existing tools and technology stack across cloud, DevOps, CRM, and collaboration platforms.
        </p>
      </div>
    </section>
  )
}
