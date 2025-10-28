DestinationsManager
function DestinationsManager() {
  try {
    const [destinations, setDestinations] = React.useState([]);
    const [showForm, setShowForm] = React.useState(false);
    const [editingId, setEditingId] = React.useState(null);
    const [formData, setFormData] = React.useState({ name: '', description: '', image: '' });
    const STORAGE_KEY = 'destinations_v1';
    const fileInputRef = React.useRef(null);

    React.useEffect(() => {
      loadDestinations();
    }, []);

    const exportDestinations = () => {
       try {
         const data = JSON.stringify(destinations || [], null, 2);
         const blob = new Blob([data], { type: 'application/json' });
         const url = URL.createObjectURL(blob);
         const a = document.createElement('a');
         a.href = url;
         a.download = 'destinations.json';
         document.body.appendChild(a);
         a.click();
         a.remove();
         URL.revokeObjectURL(url);
       } catch (err) {
         console.error('Export failed', err);
         alert('Export failed');
       }
    };

    const handleImportFile = (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const parsed = JSON.parse(ev.target.result);
          if (!Array.isArray(parsed)) throw new Error('Invalid JSON structure (expected array)');
          setDestinations(parsed);
          saveToStorage(parsed);
          alert('Import successful');
        } catch (err) {
          console.error('Import failed', err);
          alert('Invalid JSON file');
        } finally {
          e.target.value = ''; // reset input
        }
      };
      reader.readAsText(file);
    };

    const saveToStorage = (list) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }
    };

    const loadDestinations = async () => {
      try {
        // prefer localStorage (persisted edits), fallback to data file
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
          setDestinations(JSON.parse(cached));
          return;
        }

        const res = await fetch('/data/destinations.json', { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to load data file: ${res.status}`);
        const json = await res.json();
        setDestinations(json || []);
        saveToStorage(json || []);
      } catch (error) {
        console.error('Error loading destinations:', error);
        setDestinations([]); // recover
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        let list = Array.isArray(destinations) ? [...destinations] : [];
        if (editingId) {
          list = list.map((d) => (d.objectId === editingId ? { ...d, objectData: { ...formData } } : d));
        } else {
          const newObj = {
            objectId: `local_${Date.now()}`,
            objectData: { ...formData },
          };
          list.unshift(newObj);
        }
        setDestinations(list);
        saveToStorage(list);
        setFormData({ name: '', description: '', image: '' });
        setShowForm(false);
        setEditingId(null);
      } catch (error) {
        console.error('Error saving destination:', error);
        alert('Error saving destination');
      }
    };

    const editDestination = (dest) => {
      setFormData(dest.objectData || { name: '', description: '', image: '' });
      setEditingId(dest.objectId);
      setShowForm(true);
    };

    const deleteDestination = async (id) => {
      if (confirm('Delete this destination?')) {
        try {
          const list = destinations.filter((d) => d.objectId !== id);
          setDestinations(list);
          saveToStorage(list);
        } catch (error) {
          console.error('Error deleting destination:', error);
          alert('Error deleting destination');
        }
      }
    };

    return (
      <div className="bg-white rounded-lg shadow-md p-6" data-name="destinations-manager" data-file="components/admin/DestinationsManager.js">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Destinations Manager</h2>
          <div className="flex items-center space-x-3">
            <button onClick={() => exportDestinations()} className="btn-secondary">Export JSON</button>
            <button onClick={() => fileInputRef.current && fileInputRef.current.click()} className="btn-secondary">Import JSON</button>
            <button onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ name: '', description: '', image: '' }); }} className="btn-primary">
              {showForm ? 'Cancel' : 'Add New'}
            </button>
            <input ref={fileInputRef} type="file" accept="application/json" onChange={handleImportFile} className="hidden" />
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <input type="text" placeholder="Destination Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="form-input mb-3" />
            <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required className="form-input mb-3" rows="3" />
            <input type="url" placeholder="Image URL" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} required className="form-input mb-3" />
            <button type="submit" className="btn-primary">
              {editingId ? 'Update' : 'Add'} Destination
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <div key={dest.objectId} className="bg-white border rounded-lg overflow-hidden">
              <img src={dest.objectData.image} alt={dest.objectData.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{dest.objectData.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{dest.objectData.description}</p>
                <div className="flex space-x-2">
                  <button onClick={() => editDestination(dest)} className="btn-secondary flex-1">Edit</button>
                  <button onClick={() => deleteDestination(dest.objectId)} className="btn-danger flex-1">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('DestinationsManager component error:', error);
    return null;
  }
}
