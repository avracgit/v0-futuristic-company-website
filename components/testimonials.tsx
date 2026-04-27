'use client'

import { useState } from 'react'
import { testimonials } from '@/lib/data'

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-slate-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
)

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* White background section */}
      <div className="white-section py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <svg className="w-4 h-4 text-[var(--brand-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-xs font-medium text-[var(--brand-blue)]">Testimonials</span>
            </div>
            <h2 className="font-semibold text-3xl md:text-4xl lg:text-5xl text-slate-900 text-balance">
              Here You Can Find Our <span className="text-[var(--brand-blue)]">Reviews</span>
            </h2>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={testimonial.id}
                className={`bg-white rounded-2xl border border-slate-200 p-6 transition-all duration-300 ${
                  i === currentIndex ? 'ring-2 ring-[var(--brand-blue)] shadow-lg' : 'hover:shadow-md'
                }`}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-medium text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-slate-500">{testimonial.role} @ {testimonial.location}</p>
                  </div>
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Content */}
                <h5 className="font-semibold text-slate-900 mb-2">{testimonial.title}</h5>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {testimonial.content}
                </p>

                {/* Company */}
                <div className="pt-4 border-t border-slate-100">
                  <span className="text-sm font-medium text-slate-700">{testimonial.company}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-white hover:bg-slate-800 transition-colors"
              aria-label="Next testimonial"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
