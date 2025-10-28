function Hero() {
  try {
    return (
      <section 
        className="relative bg-cover bg-center h-[500px] md:h-[600px] flex items-center" 
        style={{backgroundImage: 'url("https://www.peakadventuretour.com/assets/images/buddhist-circuit-banner.webp")'}}
        data-name="hero" 
        data-file="components/Hero.js"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Travel with Faith, Return with Peace
            </h1>
            <p className="text-lg md:text-xl mb-8">
              We take you beyond destinations —— into divine experiences.
            </p>
            <a href="contact.html" className="btn-primary inline-block">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Hero component error:', error);
    return null;
  }
}