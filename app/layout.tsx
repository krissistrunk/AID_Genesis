import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AID Commander Genesis - Code Generation Interface',
  description: 'Transform ideas into complete, working products with AI-powered code generation',
  keywords: ['AI', 'code generation', 'development', 'Genesis', 'programming'],
  authors: [{ name: 'AID Commander Genesis Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        <div id="portal-root" />
        {children}
      </body>
    </html>
  )
}