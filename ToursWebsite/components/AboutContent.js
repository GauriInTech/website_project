function AboutContent() {
  try {
    return (
      <div className="py-16" data-name="about-content" data-file="components/AboutContent.js">
        <div className="container mx-auto px-4">
          <h1 className="section-title">About Us</h1>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
               Established in 2018, Shreya Tours & Travels is your trusted travel partner based in Shop No. 4, Sanidhya Apartment, Subhash Tekdi, Ulhasnagar-4.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our team ensures every aspect of your tour is carefully planned. From comfortable transportation to quality accommodations near pilgrimage sites, we take care of all the details so you can focus on your spiritual journey.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We specialize in organizing comfortable and memorable trips to historical, cultural, and spiritual destinations
               </p>
            </div>

            <div className="bg-[var(--accent-color)] bg-opacity-10 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 text-[var(--secondary-color)]">Our Commitment</h2>
              <p className="text-gray-700 leading-relaxed">
                We aim to provide safe, reliable, and affordable travel experiences for individuals, families, and groups. Whether it’s a pilgrimage, educational tour, or leisure trip — we ensure smooth journeys and lasting memories.
             </p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AboutContent component error:', error);
    return null;
  }
}
