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
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setVisible(scrollY > 80)

      const mid = scrollY + window.innerHeight / 2
      let found = 0
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el && el.offsetTop <= mid) { found = i; break }
      }
      setActiveIndex(found)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      aria-label="Page sections"
      className={`fixed left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2 transition-all duration-500 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {sections.map((section, i) => {
        const isActive = i === activeIndex
        const isVisited = i < activeIndex
        return (
          <div key={section.id} className="relative flex items-center gap-2 group">
            {/* Vertical connecting line */}
            {i < sections.length - 1 && (
              <div
                className="absolute left-1.5 top-4 w-0.5 transition-colors duration-300"
                style={{
                  height: 16,
                  background: isVisited
                    ? 'rgba(59,130,246,0.30)'
                    : 'rgba(100,116,139,0.15)',
                }}
              />
            )}
            
            {/* Dot indicator */}
            <button
              onClick={() => scrollTo(section.id)}
              aria-label={`Go to ${section.label}`}
              title={section.label}
              className="relative z-10 flex items-center justify-center transition-all duration-300"
              style={{
                width: isActive ? 12 : 8,
                height: isActive ? 12 : 8,
              }}
            >
              {/* Outer ring for active state */}
              {isActive && (
                <div className="absolute inset-0 rounded-full bg-[var(--brand-blue)] animate-pulse opacity-20" />
              )}
              {/* Inner dot */}
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: '100%',
                  height: '100%',
                  background: isActive
                    ? 'var(--brand-blue)'
                    : isVisited
                    ? 'rgba(59,130,246,0.50)'
                    : 'rgba(100,116,139,0.30)',
                }}
              />
            </button>

            {/* Label — appears on hover or when active */}
            <span
              className="absolute left-full ml-3 whitespace-nowrap text-xs font-medium transition-all duration-200 pointer-events-none"
              style={{
                opacity: isActive ? 1 : 0,
                color: isActive ? 'var(--brand-blue)' : 'var(--text-muted)',
              }}
            >
              {section.label}
            </span>
          </div>
        )
      })}
    </nav>
  )
}
