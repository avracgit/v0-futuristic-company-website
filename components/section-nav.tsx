'use client'

import { useState, useEffect } from 'react'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'stats', label: 'Stats' },
  { id: 'results', label: 'Results' },
  { id: 'features', label: 'Features' },
  { id: 'integrations', label: 'Partners' },
  { id: 'testimonials', label: 'Reviews' },
]

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id)
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group flex items-center gap-3"
          aria-label={`Go to ${section.label}`}
        >
          <span
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeSection === section.id
                ? 'bg-[var(--brand-blue)] scale-125 shadow-[0_0_8px_var(--brand-blue-glow)]'
                : 'bg-[var(--text-muted)] group-hover:bg-[var(--brand-blue)] group-hover:scale-110'
            }`}
          />
          <span
            className={`text-xs font-medium transition-all duration-300 ${
              activeSection === section.id
                ? 'text-[var(--brand-blue)] opacity-100 translate-x-0'
                : 'text-[var(--text-muted)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
            }`}
          >
            {section.label}
          </span>
        </button>
      ))}
    </nav>
  )
}
