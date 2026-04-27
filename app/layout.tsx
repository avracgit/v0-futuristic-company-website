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
  title: 'ConglomerateIT — Redefining Industries',
  description:
    'ConglomerateIT is a multi-domain powerhouse driving innovation across technology, business, and beyond. Discover our verticals and join the future.',
  keywords: ['ConglomerateIT', 'technology', 'innovation', 'multi-domain', 'enterprise', 'IT solutions'],
  openGraph: {
    title: 'ConglomerateIT — Redefining Industries',
    description: 'A multi-domain powerhouse driving innovation across technology, business, and beyond.',
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
