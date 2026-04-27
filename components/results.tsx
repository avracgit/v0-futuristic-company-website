'use client'

import { useEffect, useRef, useState } from 'react'
import { resultStats } from '@/lib/data'

function CountUp({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const observed = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !observed.current) {
          observed.current = true
          let start = 0
          const duration = 1500
          const step = (timestamp: number) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(step)
            else setCount(target)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}

// Generate chart data
const generateChartData = () => {
  const points = []
  let value = 20
  for (let i = 0; i <= 30; i++) {
    value += Math.random() * 4 - 1
    value = Math.max(15, Math.min(45, value))
    points.push({ day: i, value })
  }
  // Ensure upward trend at the end
  points[28] = { day: 28, value: 35 }
  points[29] = { day: 29, value: 38 }
  points[30] = { day: 30, value: 40 }
  return points
}

const chartData = generateChartData()

export default function Results() {
  const [activeTab, setActiveTab] = useState('SaaS')
  const tabs = ['EdTech', 'SaaS', 'Fintech']

  // Create SVG path from data
  const width = 600
  const height = 200
  const padding = 40

  const xScale = (day: number) => padding + (day / 30) * (width - padding * 2)
  const yScale = (value: number) => height - padding - ((value - 10) / 40) * (height - padding * 2)

  const linePath = chartData
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(p.day)} ${yScale(p.value)}`)
    .join(' ')

  const areaPath = `${linePath} L ${xScale(30)} ${height - padding} L ${xScale(0)} ${height - padding} Z`

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-radial pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-blue">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-xs font-medium">Results</span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-16">
          <h2 className="font-semibold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 text-balance">
            We can increase your revenue, further client relationships,
            <br className="hidden md:block" />
            secure target companies. We have <span className="text-[var(--brand-blue)]">40% better conversion</span>
            <br className="hidden md:block" />
            than existing automation tools.
          </h2>
        </div>

        {/* Chart Section */}
        <div className="glass-card rounded-2xl p-6 md:p-8 mb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h3 className="text-lg font-medium text-foreground">Outreach</h3>
            <div className="flex items-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-sm transition-all ${
                    activeTab === tab
                      ? 'bg-[var(--brand-blue)] text-white'
                      : 'bg-white/5 text-[var(--text-secondary)] hover:bg-white/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="relative">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto chart-glow">
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--brand-blue)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--brand-blue)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--brand-blue)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="var(--brand-blue)" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Y-axis labels */}
              {[0, 10, 20, 30, 40].map((val) => (
                <g key={val}>
                  <text
                    x={padding - 10}
                    y={yScale(val + 10)}
                    textAnchor="end"
                    className="fill-[var(--text-muted)] text-[10px]"
                  >
                    {val}%
                  </text>
                  <line
                    x1={padding}
                    y1={yScale(val + 10)}
                    x2={width - padding}
                    y2={yScale(val + 10)}
                    stroke="rgba(255,255,255,0.05)"
                    strokeDasharray="4 4"
                  />
                </g>
              ))}

              {/* X-axis labels */}
              {['Today', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'].map((label, i) => (
                <text
                  key={label}
                  x={xScale(i * 5)}
                  y={height - 10}
                  textAnchor="middle"
                  className="fill-[var(--text-muted)] text-[10px]"
                >
                  {label}
                </text>
              ))}

              {/* Area fill */}
              <path d={areaPath} fill="url(#areaGradient)" />

              {/* Line */}
              <path
                d={linePath}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* End point */}
              <circle
                cx={xScale(30)}
                cy={yScale(40)}
                r="6"
                fill="var(--brand-blue)"
                stroke="var(--background)"
                strokeWidth="2"
              />

              {/* Maximum Value label */}
              <g transform={`translate(${xScale(30) + 10}, ${yScale(40) - 10})`}>
                <rect
                  x="-5"
                  y="-15"
                  width="80"
                  height="30"
                  rx="4"
                  fill="var(--surface-card)"
                  stroke="rgba(255,255,255,0.1)"
                />
                <text x="35" y="-2" textAnchor="middle" className="fill-[var(--text-muted)] text-[9px]">
                  Maximum Value
                </text>
                <text x="35" y="10" textAnchor="middle" className="fill-foreground text-[10px] font-medium">
                  (+40%)
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {resultStats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[var(--brand-blue)] mb-2">
                <CountUp target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-foreground font-medium mb-1">{stat.label}</p>
              <p className="text-xs text-[var(--text-muted)]">{stat.period}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
