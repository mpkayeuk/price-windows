export default function WhyChooseUs() {
  const features = [
    {
      title: 'Commercial-Focused Pricing',
      description: 'Competitive bulk pricing for commercial projects. We understand business budgets and deliver value without compromising quality.',
      icon: '💰',
    },
    {
      title: 'Minimal Business Disruption',
      description: 'Expert commercial installation teams work around your business operations. Fast, efficient installations that keep you trading.',
      icon: '👷',
    },
    {
      title: 'Energy Cost Savings',
      description: 'Significantly reduce your commercial energy bills with our high-performance double glazing. Lower operating costs, better ROI.',
      icon: '⚡',
    },
    {
      title: 'Commercial-Grade Materials',
      description: 'Heavy-duty materials built for commercial environments. Designed to withstand high traffic and meet commercial building standards.',
      icon: '✨',
    },
    {
      title: 'Project Management',
      description: 'Dedicated project managers for commercial installations. From planning to completion, we handle everything professionally.',
      icon: '📋',
    },
    {
      title: 'Commercial Warranties',
      description: 'Comprehensive commercial warranties and ongoing support. Protect your investment with our commitment to quality.',
      icon: '🛡️',
    },
  ]

  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Price Windows and Doors?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Commercial specialists combining affordability with exceptional quality and minimal business disruption
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-primary-50 transition"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

