"use client"

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { usePathname } from 'next/navigation'
import ScrollAnimation from '@/components/animations/ScrollAnimation'

export default function ClientLayout({ children }) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')

  return (
    <>
      {!isAdminPage && <Navbar />}
      <ScrollAnimation />
      {children}
      {!isAdminPage && <Footer />}
    </>
  )
}
