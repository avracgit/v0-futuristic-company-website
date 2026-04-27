'use client'

import { testimonials } from '@/lib/data'

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-slate-200'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
)

// Double the testimonials for seamless infinite scroll
const doubledTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials]

export default function Testimonials() {
  return (
    <section className="relative py-24 overflow-hidden section-testimonials">
      {/* Content */}
      <div className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-blue mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-xs font-medium">Testimonials</span>
            </div>
            <h2 className="font-semibold text-3xl md:text-4xl lg:text-5xl text-[var(--foreground)] text-balance">
              Here You Can Find Our <span className="text-[var(--brand-blue)]">Reviews</span>
            </h2>
          </div>

          {/* Auto-scrolling Marquee */}
          <div className="marquee-container py-4">
            <div className="marquee-track">
              {doubledTestimonials.map((testimonial, i) => (
                <div
                  key={`${testimonial.id}-${i}`}
                  className="flex-shrink-0 w-[380px] bg-white rounded-2xl border border-[var(--border)] p-6 card-hover"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-red)] flex items-center justify-center text-white font-medium text-sm">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[var(--foreground)] text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-[var(--text-muted)]">{testimonial.role} @ {testimonial.location}</p>
                    </div>
                    <StarRating rating={testimonial.rating} />
                  </div>

                  {/* Content */}
                  <h5 className="font-semibold text-[var(--foreground)] mb-2">{testimonial.title}</h5>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-3">
                    {testimonial.content}
                  </p>

                  {/* Company */}
                  <div className="pt-4 border-t border-[var(--border)]">
                    <span className="text-sm font-medium text-[var(--brand-blue)]">{testimonial.company}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 text-center">
            <p className="text-sm text-[var(--text-muted)] mb-4">Trusted by leading enterprises worldwide</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
              {['Fortune 500', 'Tech Giants', 'Healthcare Leaders', 'Financial Services'].map((label) => (
                <span key={label} className="text-sm font-medium text-[var(--text-secondary)]">{label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
