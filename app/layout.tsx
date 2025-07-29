import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dental Analytics Dashboard',
  description: 'Real-time insights for your dental practice',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 