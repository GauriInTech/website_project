function Header() {
  try {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const navLinks = [
      { name: 'Home', path: 'index.html' },
      { name: 'Services', path: 'services.html' },
      { name: 'About Us', path: 'about.html' },
      { name: 'Contact Us', path: 'contact.html' }
    ];

    return (
      <header className="bg-white shadow-md sticky top-0 z-50" data-name="header" data-file="components/Header.js">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <a href="index.html" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-[var(--primary-color)] flex items-center justify-center">
                <div className="icon-map-pin text-xl text-white"></div>
              </div>
              <span className="text-xl md:text-2xl font-bold text-[var(--secondary-color)]">
                Shreya Tours & Travels
              </span>
            </a>

            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link, index) => (
                <a key={index} href={link.path} className="nav-link">
                  {link.name}
                </a>
              ))}
            </nav>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-700">
              <div className={`icon-${isMenuOpen ? 'x' : 'menu'} text-2xl`}></div>
            </button>
          </div>

          {isMenuOpen && (
            <nav className="md:hidden pb-4 space-y-2">
              {navLinks.map((link, index) => (
                <a key={index} href={link.path} className="block py-2 nav-link">
                  {link.name}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}