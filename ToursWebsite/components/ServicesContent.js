function Icon({ name, className = '' }) {
  const common = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'bus':
      return <svg {...common} className={className}><rect x="1" y="3" width="22" height="13" rx="2"/><path d="M6 21v-3"/><path d="M18 21v-3"/><path d="M1 10h22"/></svg>;
    case 'hotel':
      return <svg {...common} className={className}><path d="M3 21h18"/><path d="M7 10v11"/><path d="M17 10v11"/><rect x="3" y="4" width="18" height="6" rx="1"/></svg>;
    case 'user-check':
      return <svg {...common} className={className}><path d="M20 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/><path d="M16 11l2 2 4-4"/></svg>;
    case 'calendar-check':
      return <svg {...common} className={className}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><path d="M9 16l2 2 4-4"/></svg>;
    case 'utensils':
      return <svg {...common} className={className}><path d="M7 2v11"/><path d="M11 2v11"/><path d="M4 21h14"/></svg>;
    case 'headphones':
      return <svg {...common} className={className}><path d="M5 18v-3a7 7 0 0 1 14 0v3"/><path d="M3 18a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2z"/><path d="M16 14v6h1a2 2 0 0 0 2-2v-4h-3z"/></svg>;
    case 'check':
      return <svg {...common} className={className}><path d="M20 6L9 17l-5-5"/></svg>;
    default:
      return <svg {...common} className={className}><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg>;
  }
}

function ServicesContent() {
  try {
    const services = [
      { icon: 'bus', title: 'Comfortable Transport', description: 'Air-conditioned vehicles with experienced drivers', features: ['AC buses and cars', 'Professional drivers', 'Well-maintained vehicles'] },
      { icon: 'hotel', title: 'Quality Accommodation', description: 'Handpicked hotels near pilgrimage sites', features: ['Clean rooms', 'Near sacred sites', 'Budget to luxury options'] },
      { icon: 'user-check', title: 'Expert Guides', description: 'Knowledgeable guides with cultural expertise', features: ['Multilingual guides', 'Cultural knowledge', 'Historical expertise'] },
      { icon: 'calendar-check', title: 'Flexible Packages', description: 'Customizable tour packages', features: ['Custom itineraries', 'Group or solo tours', 'Budget-friendly'] },
      { icon: 'utensils', title: 'Meal Arrangements', description: 'Vegetarian and traditional meals', features: ['Hygienic food', 'Vegetarian options', 'Local cuisine'] },
      { icon: 'headphones', title: '24/7 Support', description: 'Round-the-clock assistance', features: ['Emergency support', 'Travel assistance', 'Quick response'] }
    ];

    return (
      <div className="py-16" data-name="services-content" data-file="components/ServicesContent.js">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4 text-[var(--secondary-color)]">Our Services</h1>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
            We provide comprehensive travel services for your Buddhist pilgrimage journey
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 mb-4 rounded-lg bg-[var(--secondary-color)] flex items-center justify-center">
                  <Icon name={service.icon} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[var(--secondary-color)]">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-gray-700">
                      <div className="text-[var(--primary-color)] mt-1"><Icon name="check" className="text-[var(--primary-color)]" /></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ServicesContent component error:', error);
    return null;
  }
}