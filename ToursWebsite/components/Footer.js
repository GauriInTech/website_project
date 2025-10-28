function Footer() {
  try {
    return (
      <footer className="bg-[var(--secondary-color)] text-white py-8" data-name="footer" data-file="components/Footer.js">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Shreya Tours & Travels</h3>
              <p className="text-gray-300">
                Your trusted partner for Buddhist pilgrimage tours across India. Creating meaningful spiritual journeys since years.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="index.html" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                <li><a href="services.html" className="text-gray-300 hover:text-white transition-colors">Services</a></li>
                <li><a href="about.html" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="contact.html" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <div className="icon-phone text-lg"></div>
                  <span>+91 9975494379</span>
                  <span>+91 9975547432</span>
                  <span>+91 8421403094</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="icon-mail text-lg"></div>
                  <span>rahuljagtap519@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-600 pt-6 text-center text-gray-300">
            <p>&copy; 2025 Shreya Tours & Travels. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}
