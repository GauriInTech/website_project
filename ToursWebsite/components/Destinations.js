function Destinations() {
  const [destinations, setDestinations] = React.useState([]);
  const STORAGE_KEY = 'destinations_v1';

  React.useEffect(() => {
    let mounted = true;
    (async function load() {
      try {
        // prefer localStorage (admin edits), fallback to static JSON
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
          if (!mounted) return;
          setDestinations(JSON.parse(cached));
          return;
        }

        const res = await fetch('/data/destinations.json', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load destinations file: ' + res.status);
        const json = await res.json();
        if (!mounted) return;
        setDestinations(json || []);
      } catch (err) {
        console.error('Error loading popular destinations:', err);
        setDestinations([]);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (!Array.isArray(destinations) || destinations.length === 0) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Popular Destinations</h2>
          <p className="text-center text-gray-600">No destinations available right now.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white" aria-label="Popular Destinations">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Popular Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d) => {
            const obj = d && (d.objectData || d); // support both shapes
            const id = d && (d.objectId || d.id || obj.name);
            const name = obj && obj.name ? obj.name : 'Untitled';
            const desc = obj && obj.description ? obj.description : '';
            const img = obj && obj.image ? obj.image : 'https://via.placeholder.com/600x400?text=No+Image';
            return (
              <article key={id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
                <img src={img} alt={name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{desc}</p>
                  <div className="flex justify-between items-center">
                    
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
