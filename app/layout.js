import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import ClientLayout from '@/components/ClientLayout'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'ClipperCuts - Modern Barbershop Booking',
  description: 'Book your next haircut at ClipperCuts - the premier barbershop for modern styles and classic cuts.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <ClientLayout>
          {children}
        </ClientLayout>
        <Script src="/js/scroll-animations.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}