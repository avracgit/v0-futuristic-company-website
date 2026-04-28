'use client'

import { useEffect, useRef, useState } from 'react'

function CountUp({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const observed = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !observed.current) {
        observed.current = true
        let start = 0
        const duration = 1400
        const step = (ts: number) => {
          if (!start) start = ts
          const p = Math.min((ts - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setCount(Math.floor(eased * target))
          if (p < 1) requestAnimationFrame(step)
          else setCount(target)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

// Each tab has its own seed so the chart looks distinct
const TAB_DATA: Record<string, { seed: number; peak: number; endLabel: string; stats: { value: number; prefix: string; suffix: string; label: string; period: string }[] }> = {
  EdTech: {
    seed: 42, peak: 38,
    endLabel: '+38%',
    stats: [
      { value: 38, prefix: '+', suffix: '%', label: 'Student Engagement', period: 'in 30 Days' },
      { value: 52, prefix: '+', suffix: '%', label: 'Course Completion', period: 'in 60 Days' },
      { value: 29, prefix: '+', suffix: '%', label: 'Lead Generation', period: 'in 45 Days' },
      { value: 44, prefix: '+', suffix: '%', label: 'Retention Growth', period: 'in 90 Days' },
    ],
  },
  SaaS: {
    seed: 17, peak: 40,
    endLabel: '+40%',
    stats: [
      { value: 35, prefix: '+', suffix: '%', label: 'Engagement Increase', period: 'in 30 Days' },
      { value: 56, prefix: '+', suffix: '%', label: 'Conversion Rate Boost', period: 'in 60 Days' },
      { value: 25, prefix: '+', suffix: '%', label: 'Lead Generation Rise', period: 'in 45 Days' },
      { value: 42, prefix: '+', suffix: '%', label: 'Customer Retention', period: 'in 90 Days' },
    ],
  },
  Fintech: {
    seed: 99, peak: 45,
    endLabel: '+45%',
    stats: [
      { value: 41, prefix: '+', suffix: '%', label: 'Transaction Volume', period: 'in 30 Days' },
      { value: 63, prefix: '+', suffix: '%', label: 'Approval Rate', period: 'in 60 Days' },
      { value: 31, prefix: '+', suffix: '%', label: 'User Acquisition', period: 'in 45 Days' },
      { value: 48, prefix: '+', suffix: '%', label: 'Portfolio Growth', period: 'in 90 Days' },
    ],
  },
}

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

function generateChartPoints(seed: number, peak: number) {
  const rand = seededRandom(seed)
  const points: { x: number; y: number }[] = []
  let val = 18
  for (let i = 0; i <= 30; i++) {
    val += (rand() - 0.42) * 3.5
    val = Math.max(12, Math.min(peak - 4, val))
    points.push({ x: i, y: val })
  }
  // Force a clear upward tail
  points[26] = { x: 26, y: peak - 8 }
  points[27] = { x: 27, y: peak - 5 }
  points[28] = { x: 28, y: peak - 3 }
  points[29] = { x: 29, y: peak - 1 }
  points[30] = { x: 30, y: peak }
  return points
}

const W = 600, H = 200, PAD = { left: 44, right: 16, top: 16, bottom: 28 }
const innerW = W - PAD.left - PAD.right
const innerH = H - PAD.top - PAD.bottom

function xS(day: number) { return PAD.left + (day / 30) * innerW }
function yS(val: number) { return H - PAD.bottom - ((val - 5) / 50) * innerH }

function buildPath(pts: { x: number; y: number }[]) {
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${xS(p.x).toFixed(1)},${yS(p.y).toFixed(1)}`).join(' ')
}

function buildArea(pts: { x: number; y: number }[]) {
  return `${buildPath(pts)} L${xS(30)},${H - PAD.bottom} L${xS(0)},${H - PAD.bottom}Z`
}

const XAXIS = ['Today', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30']
const YVALS = [10, 20, 30, 40]

export default function Results() {
  const [activeTab, setActiveTab] = useState<'EdTech' | 'SaaS' | 'Fintech'>('SaaS')
  const [animKey, setAnimKey] = useState(0)
  const tabs = ['EdTech', 'SaaS', 'Fintech'] as const

  const data = TAB_DATA[activeTab]
  const pts = generateChartPoints(data.seed, data.peak)
  const linePath = buildPath(pts)
  const areaPath = buildArea(pts)

  // Approximate path length for draw animation
  const pathLen = 1800

  function handleTab(tab: typeof activeTab) {
    if (tab === activeTab) return
    setActiveTab(tab)
    setAnimKey(k => k + 1)
  }

  return (
    <section id="results" className="section-base section-blend relative">
      <div className="absolute inset-0 gradient-radial pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-badge badge-blue text-xs font-medium">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Results
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-14">
          <h2 className="font-semibold text-3xl md:text-4xl text-foreground mb-3 text-balance leading-tight">
            We can increase your revenue, further client relationships,<br className="hidden md:block" />
            secure target companies. We have{' '}
            <span className="text-[var(--brand-blue)]">40% better conversion</span>
            <br className="hidden md:block" /> than existing automation tools.
          </h2>
        </div>

        {/* Chart card */}
        <div className="glass-card rounded-2xl p-6 md:p-8 mb-14">
          {/* Chart header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h3 className="text-base font-medium text-foreground">Outreach Performance</h3>
            <div className="flex items-center gap-2 glass-panel rounded-xl p-1.5">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => handleTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-[var(--brand-blue)] text-white shadow-lg shadow-blue-500/25'
                      : 'text-[var(--text-secondary)] hover:text-foreground hover:bg-white/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* SVG chart */}
          <div className="relative chart-glow" key={animKey}>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#3b82f6" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="#3b82f6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
                </linearGradient>
                <clipPath id="chartClip">
                  <rect x={PAD.left} y={PAD.top} width={innerW} height={innerH} />
                </clipPath>
              </defs>

              {/* Grid lines & Y labels */}
              {YVALS.map(v => (
                <g key={v}>
                  <text x={PAD.left - 6} y={yS(v) + 4} textAnchor="end" fontSize="9" fill="rgba(100,116,139,0.8)">{v}%</text>
                  <line x1={PAD.left} y1={yS(v)} x2={W - PAD.right} y2={yS(v)} stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
                </g>
              ))}

              {/* X labels */}
              {XAXIS.map((label, i) => (
                <text key={label} x={xS(i * 5)} y={H - 8} textAnchor="middle" fontSize="9" fill="rgba(100,116,139,0.8)">{label}</text>
              ))}

              {/* Area fill — clipped, no animation needed */}
              <path d={areaPath} fill="url(#areaGrad)" clipPath="url(#chartClip)" />

              {/* Line — animated draw */}
              <path
                d={linePath}
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                clipPath="url(#chartClip)"
                style={{ '--path-length': pathLen } as React.CSSProperties}
                className="chart-animate"
              />

              {/* End dot */}
              <circle cx={xS(30)} cy={yS(data.peak)} r="5" fill="#3b82f6" stroke="#06091a" strokeWidth="2" />

              {/* Max label */}
              <g transform={`translate(${xS(30) - 78},${yS(data.peak) - 32})`}>
                <rect width="72" height="26" rx="5" fill="rgba(13,18,36,0.95)" stroke="rgba(59,130,246,0.3)" strokeWidth="1" />
                <text x="36" y="10" textAnchor="middle" fontSize="8" fill="rgba(148,163,184,0.8)">Maximum</text>
                <text x="36" y="20" textAnchor="middle" fontSize="9" fill="#f0f4ff" fontWeight="600">{data.endLabel}</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {data.stats.map((s, i) => (
            <div key={`${activeTab}-${i}`} className="glass-stat text-center fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="text-4xl md:text-5xl font-semibold text-[var(--brand-blue)] mb-1">
                <CountUp target={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <p className="text-sm font-medium text-foreground mb-0.5">{s.label}</p>
              <p className="text-xs text-[var(--text-muted)]">{s.period}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
