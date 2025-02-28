import Link from 'next/link'
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Clipper<span className="text-secondary">Cuts</span>
            </h3>
            <p className="mb-4 text-gray-300">
              Premium barbershop providing top-notch haircuts and grooming services in a modern, relaxed environment.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-secondary" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-secondary" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-secondary" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-secondary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-gray-300 hover:text-secondary">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#barbers" className="text-gray-300 hover:text-secondary">
                  Our Barbers
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="text-gray-300 hover:text-secondary">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-300 hover:text-secondary">
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <Clock size={16} className="mr-2" />
                <span>Monday - Friday: 9AM - 6PM</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Clock size={16} className="mr-2" />
                <span>Saturday: 9AM - 5PM</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Clock size={16} className="mr-2" />
                <span>Sunday: Closed</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start text-gray-300">
                <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                <span>Jl. Pogung Kidul No.2a, Pogung Kidul, Sinduadi, Kec. Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55284</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Phone size={16} className="mr-2" />
                <span>0882007948911</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Mail size={16} className="mr-2" />
                <span>info@clippercuts.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ClipperCuts. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
