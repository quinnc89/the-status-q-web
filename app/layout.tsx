import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TheStatusQ — Web Design & Digital Marketing Agency',
  description: 'TheStatusQ builds high-converting websites, email funnels, and digital marketing systems for businesses ready to grow.',
  openGraph: {
    title: 'TheStatusQ — Web Design & Digital Marketing Agency',
    description: 'High-converting websites, email funnels, and digital marketing systems for businesses ready to grow.',
    url: 'https://thestatusq.io',
    type: 'website',
    siteName: 'TheStatusQ',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
