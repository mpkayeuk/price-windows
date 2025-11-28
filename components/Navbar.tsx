'use client'

import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-700">
              Price Windows and Doors
            </h1>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-primary-600 transition flex items-center h-10">Home</a>
            <a href="#services" className="text-gray-700 hover:text-primary-600 transition flex items-center h-10">Services</a>
            <a href="/projects" className="text-gray-700 hover:text-primary-600 transition flex items-center h-10">Projects</a>
            <a href="#why-us" className="text-gray-700 hover:text-primary-600 transition flex items-center h-10">Why Us</a>
            <a href="#testimonials" className="text-gray-700 hover:text-primary-600 transition flex items-center h-10">Testimonials</a>
            <a href="/admin" className="text-gray-500 hover:text-gray-700 transition flex items-center h-10 text-sm">Admin</a>
            <a href="#contact" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center h-10">
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
            <a href="#home" className="block px-3 py-2 text-gray-700 hover:bg-primary-50 rounded">Home</a>
            <a href="#services" className="block px-3 py-2 text-gray-700 hover:bg-primary-50 rounded">Services</a>
            <a href="/projects" className="block px-3 py-2 text-gray-700 hover:bg-primary-50 rounded">Projects</a>
            <a href="#why-us" className="block px-3 py-2 text-gray-700 hover:bg-primary-50 rounded">Why Us</a>
            <a href="#testimonials" className="block px-3 py-2 text-gray-700 hover:bg-primary-50 rounded">Testimonials</a>
            <a href="/admin" className="block px-3 py-2 text-gray-500 hover:bg-primary-50 rounded">Admin</a>
            <a href="#contact" className="block px-3 py-2 bg-primary-600 text-white rounded text-center">Get Quote</a>
          </div>
        </div>
      )}
    </nav>
  )
}

