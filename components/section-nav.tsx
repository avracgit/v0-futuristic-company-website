'use client'

import { useState, useEffect } from 'react'

const sections = [
  { id: 'hero',         label: 'Home'         },
  { id: 'stats',        label: 'Stats'        },
  { id: 'clients',      label: 'Clients'      },
  { id: 'results',      label: 'Results'      },
  { id: 'features',     label: 'Features'     },
  { id: 'integrations', label: 'Integrations' },
  { id: 'testimonials', label: 'Testimonials' },
]

export default function SectionNav() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visible, setVisible]         = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 100)
      const mid = window.scrollY + window.innerHeight * 0.45
      let found = 0
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el && el.offsetTop <= mid) { found = i; break }
      }
      setActiveIndex(found)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav
      aria-label="Page sections"
      className={`fixed left-5 top-1/2 -translate-y-1/2 z-40
        hidden xl:flex flex-col items-start gap-0
        transition-all duration-500
        ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      {sections.map((s, i) => {
        const isActive  = i === activeIndex
        const isPast    = i < activeIndex

        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            aria-label={`Go to ${s.label}`}
            className="group flex items-center gap-2.5 py-1.5 focus:outline-none"
          >
            {/* Track + dot column */}
            <div className="relative flex flex-col items-center" style={{ width: 14 }}>
              {/* Top connecting line */}
              {i > 0 && (
                <div
                  className="w-px transition-colors duration-300"
                  style={{
                    height: 10,
                    background: isPast || isActive
                      ? 'rgba(59,130,246,0.35)'
                      : 'rgba(148,163,184,0.18)',
                  }}
                />
              )}

              {/* Dot */}
              <div
                className="rounded-full transition-all duration-300 relative"
                style={{
                  width:  isActive ? 8 : 5,
                  height: isActive ? 8 : 5,
                  background: isActive
                    ? 'var(--brand-blue)'
                    : isPast
                    ? 'rgba(59,130,246,0.45)'
                    : 'rgba(148,163,184,0.30)',
                  boxShadow: isActive
                    ? '0 0 0 3px rgba(59,130,246,0.15)'
                    : 'none',
                }}
              />

              {/* Bottom connecting line */}
              {i < sections.length - 1 && (
                <div
                  className="w-px transition-colors duration-300"
                  style={{
                    height: 10,
                    background: isPast
                      ? 'rgba(59,130,246,0.35)'
                      : 'rgba(148,163,184,0.18)',
                  }}
                />
              )}
            </div>

            {/* Label */}
            <span
              className="text-[11px] font-medium tracking-wide transition-all duration-200 whitespace-nowrap"
              style={{
                color: isActive
                  ? 'var(--brand-blue)'
                  : 'transparent',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateX(0)' : 'translateX(-4px)',
              }}
            >
              {s.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
