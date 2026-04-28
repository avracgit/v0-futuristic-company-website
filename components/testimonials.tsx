'use client'

const reviews = [
  {
    name: 'Richard Chen',
    role: 'CTO, TechVentures Inc',
    initials: 'RC',
    rating: 5,
    title: 'Revolutionized Our Infrastructure',
    content: 'Our cloud infrastructure capabilities were transformed since partnering with ConglomerateIT. Their migration expertise saved us 40% in operational costs within the first quarter.',
    company: 'TechVentures Inc.',
  },
  {
    name: 'Sarah Miller',
    role: 'VP Engineering, DataFlow',
    initials: 'SM',
    rating: 5,
    title: 'Exceptional AI Solutions',
    content: 'The AI/ML solutions implemented transformed our data analytics capabilities completely. We now process insights 10x faster and our prediction accuracy improved dramatically.',
    company: 'DataFlow Systems',
  },
  {
    name: 'Leon Martinez',
    role: 'Director of IT, GlobalRetail',
    initials: 'LM',
    rating: 5,
    title: 'Outstanding DevOps Team',
    content: 'ConglomerateIT\'s DevOps expertise helped us achieve 99.9% uptime and reduced deployment cycles from weeks to hours. A true partner in every sense.',
    company: 'GlobalRetail Corp',
  },
  {
    name: 'Priya Nair',
    role: 'Head of Engineering, FinEdge',
    initials: 'PN',
    rating: 5,
    title: 'Best QA Partnership',
    content: 'Their QA and testing services caught critical issues before launch, saving us from costly post-release fixes. The team is thorough, fast, and genuinely invested.',
    company: 'FinEdge Solutions',
  },
  {
    name: 'James Owens',
    role: 'CEO, StackBridge',
    initials: 'JO',
    rating: 5,
    title: 'Scalable Cloud Architecture',
    content: 'ConglomerateIT designed a cloud architecture that scaled from 10k to 2M users seamlessly. Their AWS expertise is second to none in the industry.',
    company: 'StackBridge',
  },
  {
    name: 'Anita Patel',
    role: 'COO, EduNova',
    initials: 'AP',
    rating: 5,
    title: 'Delivered Ahead of Schedule',
    content: 'We engaged ConglomerateIT for a platform rewrite and they delivered weeks ahead of schedule without compromising quality. Highly recommend for complex projects.',
    company: 'EduNova',
  },
]

// Duplicate for seamless infinite loop
const allCards = [...reviews, ...reviews]

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`w-3.5 h-3.5 ${i < rating ? 'text-amber-400' : 'text-white/15'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
)

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-base section-blend relative overflow-hidden">
      <div className="absolute inset-0 gradient-radial pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-blue text-xs font-medium mb-4 md:mb-6">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Testimonials
          </div>
          <h2 className="font-semibold text-2xl md:text-4xl lg:text-5xl text-foreground text-balance">
            Here You Can Find <span className="text-[var(--brand-blue)]">Our Reviews</span>
          </h2>
        </div>

        {/* Marquee — fade edges */}
        <div className="relative overflow-hidden">
          {/* Left/right fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

          <div className="marquee-track gap-5 pb-2">
            {allCards.map((r, i) => (
              <article
                key={i}
                className="glass-card rounded-2xl p-6 w-80 flex-shrink-0"
                aria-label={`Review by ${r.name}`}
              >
                {/* Author row */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-[var(--brand-blue)]/20 border border-[var(--brand-blue)]/30 flex items-center justify-center text-[var(--brand-blue)] font-semibold text-xs flex-shrink-0">
                    {r.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{r.name}</p>
                    <p className="text-xs text-[var(--text-muted)] truncate">{r.role}</p>
                  </div>
                  <StarRating rating={r.rating} />
                </div>

                <h3 className="text-sm font-semibold text-foreground mb-2">{r.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">{r.content}</p>

                <div className="mt-4 pt-4 border-t border-white/6">
                  <span className="text-xs font-medium text-[var(--text-muted)]">{r.company}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
