'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
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

// Different chart data for each industry
const industryData: Record<string, number[]> = {
  EdTech: [18, 22, 19, 25, 28, 24, 30, 27, 32, 29, 35, 31, 38, 34, 42, 38, 45, 41, 48, 44, 50, 46, 52, 48, 55, 51, 58, 54, 60, 57, 62],
  SaaS: [20, 19, 23, 21, 26, 24, 28, 26, 31, 28, 33, 30, 36, 33, 39, 35, 41, 37, 44, 40, 46, 42, 49, 45, 51, 47, 54, 50, 56, 52, 58],
  Fintech: [15, 18, 16, 21, 19, 24, 22, 27, 25, 29, 27, 32, 30, 35, 33, 38, 36, 40, 38, 43, 41, 46, 44, 48, 46, 51, 49, 53, 51, 55, 53],
}

export default function Results() {
  const [activeTab, setActiveTab] = useState('SaaS')
  const [animationKey, setAnimationKey] = useState(0)
  const tabs = ['EdTech', 'SaaS', 'Fintech']

  // Trigger re-animation when tab changes
  useEffect(() => {
    setAnimationKey(prev => prev + 1)
  }, [activeTab])

  const chartData = useMemo(() => industryData[activeTab], [activeTab])
  const maxValue = useMemo(() => Math.max(...chartData), [chartData])

  // SVG dimensions
  const width = 700
  const height = 250
  const padding = { top: 30, right: 60, bottom: 40, left: 50 }

  const xScale = (i: number) => padding.left + (i / 30) * (width - padding.left - padding.right)
  const yScale = (value: number) => height - padding.bottom - ((value - 10) / (maxValue - 5)) * (height - padding.top - padding.bottom)

  const linePath = chartData
    .map((value, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(value)}`)
    .join(' ')

  const areaPath = `${linePath} L ${xScale(30)} ${height - padding.bottom} L ${xScale(0)} ${height - padding.bottom} Z`

  return (
    <section className="relative py-24 px-6 overflow-hidden section-results dark-section">
      <div className="max-w-6xl mx-auto">
        {/* Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
            <svg className="w-4 h-4 text-[var(--brand-blue-light)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-xs font-medium text-white/70">Results</span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-16">
          <h2 className="font-semibold text-3xl md:text-4xl lg:text-5xl text-white mb-4 text-balance">
            We can increase your revenue, further client relationships,
            <br className="hidden md:block" />
            secure target companies. We have <span className="text-[var(--brand-blue-light)]">40% better conversion</span>
            <br className="hidden md:block" />
            than existing automation tools.
          </h2>
        </div>

        {/* Chart Section */}
        <div className="glass-card rounded-2xl p-6 md:p-8 mb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h3 className="text-lg font-medium text-white">Outreach Performance</h3>
            <div className="flex items-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-button px-4 py-1.5 rounded-lg text-sm font-medium ${
                    activeTab === tab
                      ? 'tab-active'
                      : 'bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Animated Chart */}
          <div className="relative" key={animationKey}>
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--brand-blue-light)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--brand-blue-light)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--brand-blue)" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="var(--brand-blue-light)" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {[20, 30, 40, 50, 60].map((val) => (
                <g key={val}>
                  <text
                    x={padding.left - 10}
                    y={yScale(val)}
                    textAnchor="end"
                    className="fill-white/30 text-[10px]"
                    dominantBaseline="middle"
                  >
                    {val}%
                  </text>
                  <line
                    x1={padding.left}
                    y1={yScale(val)}
                    x2={width - padding.right}
                    y2={yScale(val)}
                    stroke="rgba(255,255,255,0.06)"
                    strokeDasharray="4 4"
                  />
                </g>
              ))}

              {/* X-axis labels */}
              {['Today', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'].map((label, i) => (
                <text
                  key={label}
                  x={xScale(i * 5)}
                  y={height - 12}
                  textAnchor="middle"
                  className="fill-white/30 text-[10px]"
                >
                  {label}
                </text>
              ))}

              {/* Animated area fill */}
              <path 
                d={areaPath} 
                fill="url(#areaGradient)" 
                className="chart-area"
              />

              {/* Animated line */}
              <path
                d={linePath}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="chart-line"
              />

              {/* End point with pulse */}
              <circle
                cx={xScale(30)}
                cy={yScale(chartData[30])}
                r="8"
                fill="var(--brand-blue)"
                opacity="0.2"
                className="animate-pulse"
              />
              <circle
                cx={xScale(30)}
                cy={yScale(chartData[30])}
                r="5"
                fill="var(--brand-blue-light)"
                stroke="#0f172a"
                strokeWidth="2"
              />

              {/* Maximum Value label */}
              <g transform={`translate(${xScale(30) + 12}, ${yScale(chartData[30])})`}>
                <rect
                  x="0"
                  y="-18"
                  width="85"
                  height="36"
                  rx="6"
                  fill="rgba(30, 41, 59, 0.95)"
                  stroke="rgba(255,255,255,0.1)"
                />
                <text x="42" y="-4" textAnchor="middle" className="fill-white/50 text-[9px]">
                  Maximum Value
                </text>
                <text x="42" y="10" textAnchor="middle" className="fill-white text-[11px] font-semibold">
                  (+{chartData[30]}%)
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {resultStats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[var(--brand-blue-light)] mb-2">
                <CountUp target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-white font-medium mb-1">{stat.label}</p>
              <p className="text-xs text-white/40">{stat.period}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
