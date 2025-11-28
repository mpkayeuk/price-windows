export default function Services() {
  const services = [
    {
      title: 'Commercial Double Glazed Windows',
      description: 'Energy-efficient double glazed windows for offices, retail units, and industrial buildings. Reduce energy costs and create a comfortable working environment.',
      icon: '🪟',
    },
    {
      title: 'Commercial Entrance Doors',
      description: 'Heavy-duty commercial doors designed for high-traffic business entrances. Secure, durable, and compliant with commercial building regulations.',
      icon: '🚪',
    },
    {
      title: 'Commercial Sliding Doors',
      description: 'Large-scale sliding door systems for retail spaces, warehouses, and showrooms. Maximize natural light and create impressive entrances.',
      icon: '↔️',
    },
    {
      title: 'Bi-Fold Door Systems',
      description: 'Commercial bi-fold doors for restaurants, offices, and retail spaces. Create flexible spaces that open to outdoor areas or expand interior layouts.',
      icon: '🪟',
    },
    {
      title: 'Commercial Window Replacement',
      description: 'Complete commercial window replacement projects with minimal business disruption. Upgrade entire buildings with modern, energy-efficient solutions.',
      icon: '♻️',
    },
    {
      title: 'Commercial Maintenance & Repair',
      description: 'Expert maintenance and emergency repair services for commercial properties. Keep your business running smoothly with reliable support.',
      icon: '🔧',
    },
  ]

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Specialized commercial double glazing solutions for offices, retail, warehouses, and industrial buildings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

