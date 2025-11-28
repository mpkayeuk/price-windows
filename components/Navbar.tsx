'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const handleHashLink = (hash: string) => {
    if (pathname === '/') {
      // On homepage, use hash navigation
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // On other pages, navigate to homepage with hash
      window.location.href = `/${hash}`
    }
  }

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary-700 hover:text-primary-800 transition">
              Price Windows and Doors
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition flex items-center h-10">Home</Link>
            <a 
              href="#services" 
              onClick={(e) => {
                e.preventDefault()
                handleHashLink('#services')
              }}
              className="text-gray-700 hover:text-primary-600 transition flex items-center h-10"
            >
              Services
            </a>
            <Link href="/projects" className="text-gray-700 hover:text-primary-600 transition flex items-center h-10">Projects</Link>
            <a 
              href="#why-us" 
              onClick={(e) => {
                e.preventDefault()
                handleHashLink('#why-us')
              }}
              className="text-gray-700 hover:text-primary-600 transition flex items-center h-10"
            >
              Why Us
            </a>
            <a 
              href="#testimonials" 
              onClick={(e) => {
                e.preventDefault()
                handleHashLink('#testimonials')
              }}
              className="text-gray-700 hover:text-primary-600 transition flex items-center h-10"
            >
              Testimonials
            </a>
            <Link href="/admin" className="text-gray-500 hover:text-gray-700 transition flex items-center h-10 text-sm">Admin</Link>
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault()
                handleHashLink('#contact')
              }}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center h-10"
            >
              Get Quote
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:bg-primary-50 rounded"
            >
              Home
            </Link>
            <a 
              href="#services" 
              onClick={(e) => {
                e.preventDefault()
                setIsOpen(false)
                handleHashLink('#services')
              }}
              className="block px-3 py-2 text-gray-700 hover:bg-primary-50 rounded"
            >
              Services
            </a>
            <Link 
              href="/projects" 
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:bg-primary-50 rounded"
            >
              Projects
            </Link>
            <a 
              href="#why-us" 
              onClick={(e) => {
                e.preventDefault()
                setIsOpen(false)
                handleHashLink('#why-us')
              }}
              className="block px-3 py-2 text-gray-700 hover:bg-primary-50 rounded"
            >
              Why Us
            </a>
            <a 
              href="#testimonials" 
              onClick={(e) => {
                e.preventDefault()
                setIsOpen(false)
                handleHashLink('#testimonials')
              }}
              className="block px-3 py-2 text-gray-700 hover:bg-primary-50 rounded"
            >
              Testimonials
            </a>
            <Link 
              href="/admin" 
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-gray-500 hover:bg-primary-50 rounded"
            >
              Admin
            </Link>
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault()
                setIsOpen(false)
                handleHashLink('#contact')
              }}
              className="block px-3 py-2 bg-primary-600 text-white rounded text-center"
            >
              Get Quote
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

