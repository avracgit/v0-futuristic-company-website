'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  from: 'bot' | 'user'
  text: string
}

function getResponse(msg: string): string {
  const m = msg.toLowerCase()
  if (m.includes('service') || m.includes('vertical') || m.includes('offer'))
    return 'ConglomerateIT operates across 6 verticals: Technology, Consulting, Staffing, Real Estate, Education, and Finance. Which one can I tell you more about?'
  if (m.includes('contact') || m.includes('reach') || m.includes('talk'))
    return 'You can reach us at info@conglomerateit.com or scroll down to the contact section. Our team responds within 24 hours.'
  if (m.includes('tech') || m.includes('software') || m.includes('cloud'))
    return 'Our Technology vertical delivers cloud infrastructure, AI/ML solutions, enterprise software, and cybersecurity services. Would you like to schedule a consultation?'
  if (m.includes('hire') || m.includes('job') || m.includes('career') || m.includes('work'))
    return "We're always looking for exceptional talent! Visit our Careers section or send your resume to careers@conglomerateit.com."
  if (m.includes('hello') || m.includes('hi') || m.includes('hey'))
    return "Hello! I'm the CGIT virtual assistant. I can help you learn about our verticals, services, or how to get in touch. What would you like to know?"
  if (m.includes('thank'))
    return "You're welcome! Is there anything else I can help you with?"
  return "That's a great question! For detailed information, I'd recommend connecting with our team directly. Shall I share the contact details?"
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: 'Welcome to ConglomerateIT! How can I assist you today?' },
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    const text = input.trim()
    if (!text) return
    setMessages((prev) => [...prev, { from: 'user', text }])
    setInput('')
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: getResponse(text) }])
    }, 600)
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle chat"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
          boxShadow: '0 0 20px rgba(0, 212, 255, 0.5), 0 4px 20px rgba(0,0,0,0.4)',
        }}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl overflow-hidden transition-all duration-400 ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        style={{
          background: '#0a0d1a',
          border: '1px solid rgba(0, 212, 255, 0.2)',
          boxShadow: '0 0 40px rgba(0, 212, 255, 0.1), 0 20px 60px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header */}
        <div
          className="px-5 py-4 flex items-center gap-3"
          style={{
            background: 'linear-gradient(90deg, rgba(0,212,255,0.1), rgba(124,58,237,0.1))',
            borderBottom: '1px solid rgba(0,212,255,0.15)',
          }}
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}>
              <span className="font-mono text-[10px] font-bold text-white">CG</span>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#0a0d1a]" />
          </div>
          <div>
            <p className="font-sans font-semibold text-sm text-foreground">CGIT Assistant</p>
            <p className="font-mono text-[10px] text-green-400">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="h-72 overflow-y-auto px-4 py-4 flex flex-col gap-3 scrollbar-thin">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.from === 'user'
                    ? 'text-black rounded-br-sm'
                    : 'text-[#d0d8f0] rounded-bl-sm'
                }`}
                style={
                  msg.from === 'user'
                    ? { background: 'linear-gradient(135deg, #00d4ff, #0066ff)' }
                    : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(0,212,255,0.12)' }
                }
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div
          className="px-4 py-3 flex items-center gap-2"
          style={{ borderTop: '1px solid rgba(0,212,255,0.12)' }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-[#6b7494] outline-none font-sans"
          />
          <button
            onClick={send}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              background: input.trim() ? 'var(--neon-cyan)' : 'rgba(0,212,255,0.1)',
              color: input.trim() ? 'black' : '#6b7494',
            }}
            aria-label="Send"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
