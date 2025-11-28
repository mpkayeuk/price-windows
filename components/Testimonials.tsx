export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechCorp Ltd - Office Building',
      text: 'Price Glazing transformed our entire office building. The installation was completed with minimal disruption to our operations, and our energy costs have dropped significantly. Professional service from start to finish.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      company: 'Retail Solutions Inc - Retail Chain',
      text: 'We replaced windows across 12 retail locations. The team understood our commercial needs, worked around trading hours, and delivered exceptional quality at a price that made business sense. Outstanding value!',
      rating: 5,
    },
    {
      name: 'Emma Williams',
      company: 'Modern Spaces Co - Warehouse Facility',
      text: 'Our warehouse needed urgent window replacements. Price Glazing handled the large-scale commercial project efficiently, stayed within budget, and the results exceeded expectations. Highly recommended for commercial work!',
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trusted by commercial property owners, facility managers, and business operators across the region
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="border-t pt-4">
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

