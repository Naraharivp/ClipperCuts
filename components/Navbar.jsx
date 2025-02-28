"use client"

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-primary">
            Clipper<span className="text-secondary">Cuts</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-primary font-medium">
            Home
          </Link>
          <Link href="/#services" className="text-gray-700 hover:text-primary font-medium">
            Services
          </Link>
          <Link href="/#barbers" className="text-gray-700 hover:text-primary font-medium">
            Our Barbers
          </Link>
          <Link href="/#gallery" className="text-gray-700 hover:text-primary font-medium">
            Gallery
          </Link>
          <Link href="/#contact" className="text-gray-700 hover:text-primary font-medium">
            Contact
          </Link>
          <Link href="/booking">
            <Button variant="secondary" className="font-semibold">
              Book Now
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg absolute top-16 left-0 right-0 z-50">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/#services"
              className="text-gray-700 hover:text-primary font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/#barbers"
              className="text-gray-700 hover:text-primary font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Barbers
            </Link>
            <Link
              href="/#gallery"
              className="text-gray-700 hover:text-primary font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="/#contact"
              className="text-gray-700 hover:text-primary font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link href="/booking" onClick={() => setIsMenuOpen(false)}>
              <Button variant="secondary" className="w-full font-semibold">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
