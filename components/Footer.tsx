export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Price Glazing</h3>
            <p className="text-gray-400 mb-4">
              Price, not pricey! Commercial double glazing specialists for offices, retail, warehouses & industrial properties.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#home" className="hover:text-white transition">Home</a></li>
              <li><a href="#services" className="hover:text-white transition">Services</a></li>
              <li><a href="#why-us" className="hover:text-white transition">Why Us</a></li>
              <li><a href="#testimonials" className="hover:text-white transition">Testimonials</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Double Glazed Windows</li>
              <li>Commercial Doors</li>
              <li>Sliding Doors</li>
              <li>Bi-Fold Doors</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📞 0800 123 4567</li>
              <li>✉️ info@pricewindows.co.uk</li>
              <li>🕒 Mon-Fri: 8am-6pm</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Price Glazing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

