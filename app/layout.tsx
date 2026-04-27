import type { Metadata } from 'next'
import { Space_Grotesk, Space_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'ConglomerateIT — Multi-Domain Enterprise',
  description:
    'ConglomerateIT is a diversified enterprise operating across Technology, Consulting, Staffing, Real Estate, Education, and Finance — each vertical a leader in its field.',
  keywords: ['ConglomerateIT', 'technology', 'consulting', 'staffing', 'real estate', 'education', 'finance', 'enterprise', 'multi-domain'],
  openGraph: {
    title: 'ConglomerateIT — Multi-Domain Enterprise',
    description: 'A diversified enterprise operating across six industry verticals with exceptional results.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable} bg-background`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
