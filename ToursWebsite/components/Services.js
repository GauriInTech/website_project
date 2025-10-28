function Icon({ name, className = '' }) {
  const common = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'bus':
      return (
        <svg {...common} className={className}><rect x="1" y="3" width="22" height="13" rx="2"/><path d="M6 21v-3"/><path d="M18 21v-3"/><path d="M1 10h22"/></svg>
      );
    case 'hotel':
      return (
        <svg {...common} className={className}><path d="M3 21h18"/><path d="M7 10v11"/><path d="M17 10v11"/><rect x="3" y="4" width="18" height="6" rx="1"/></svg>
      );
    case 'user-check':
      return (
        <svg {...common} className={className}><path d="M20 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/><path d="M16 11l2 2 4-4"/></svg>
      );
    case 'calendar-check':
      return (
        <svg {...common} className={className}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><path d="M9 16l2 2 4-4"/></svg>
      );
    default:
      return <svg {...common} className={className}><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg>;
  }
}

function Services() {
  try {
    const services = [
      { icon: 'bus', title: 'Comfortable Transport', description: 'Air-conditioned vehicles with experienced drivers for safe and comfortable journeys' },
      { icon: 'hotel', title: 'Quality Accommodation', description: 'Handpicked hotels and guesthouses near pilgrimage sites' },
      { icon: 'user-check', title: 'Expert Guides', description: 'Knowledgeable guides who understand Buddhist history and culture' },
      { icon: 'calendar-check', title: 'Flexible Packages', description: 'Customizable tour packages to suit your schedule and preferences' }
    ];

    return (
      <section className="py-16 bg-white" data-name="services" data-file="components/Services.js">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Our Services</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We provide comprehensive travel services for your Buddhist pilgrimage journey
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--secondary-color)] flex items-center justify-center">
                  <Icon name={service.icon} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[var(--secondary-color)]">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Services component error:', error);
    return null;
  }
}