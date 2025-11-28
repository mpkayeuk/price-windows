'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    alert('Thank you for your commercial inquiry! We will contact you soon.')
    setFormData({ name: '', company: '', email: '', phone: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get Your Free Commercial Quote
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Contact us today for a no-obligation quote on your commercial project
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-xl shadow-lg">
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                placeholder="John Doe"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="company" className="block text-gray-700 font-semibold mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                placeholder="Your Company Ltd"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Business Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                placeholder="john@company.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                Business Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                placeholder="+44 123 456 7890"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                Commercial Project Details
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none"
                placeholder="Tell us about your commercial project: property type (office/retail/warehouse), number of windows/doors, timeline, etc..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition transform hover:scale-105 shadow-lg"
            >
              Request Free Quote
            </button>
          </form>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">📞</div>
              <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
              <p className="text-gray-600">0800 123 4567</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">✉️</div>
              <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
              <p className="text-gray-600">info@pricewindows.co.uk</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">🕒</div>
              <h3 className="font-semibold text-gray-900 mb-1">Opening Hours</h3>
              <p className="text-gray-600">Mon-Fri: 8am-6pm</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

