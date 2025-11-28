export default function Hero() {
  return (
    <section id="home" className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white pt-16">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Price Windows and Doors
          </h1>
          <p className="text-2xl md:text-4xl font-semibold mb-8 text-primary-100">
            Price, not pricey!
          </p>
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-primary-100">
            Commercial double glazing specialists for offices, retail spaces, warehouses, and industrial properties. 
            Transform your commercial building with energy-efficient windows and doors that reduce costs and enhance your business environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition transform hover:scale-105 shadow-lg"
            >
              Get Free Quote
            </a>
            <a
              href="#services"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-700 transition transform hover:scale-105"
            >
              Our Services
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}

