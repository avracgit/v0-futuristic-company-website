import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'ConglomerateIT | AI-First Enterprise Transformation Partner',
  description:
    'ConglomerateIT is an AI-first enterprise transformation partner delivering cloud, AI/ML, DevOps, and digital solutions across multiple industry verticals.',
  keywords: [
    'ConglomerateIT',
    'AI IT services',
    'enterprise transformation',
    'cloud solutions',
    'digital transformation',
    'offshore delivery',
    'Salesforce implementation',
  ],
  openGraph: {
    title: 'ConglomerateIT | AI-First Enterprise Transformation Partner',
    description: 'Transform your business with tomorrow\'s technology. AI-first solutions across QA, Cloud, AI, Infrastructure, Analytics, and Development.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} bg-background`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
