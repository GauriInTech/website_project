function VehiclesManager() {
  try {
    const [vehicles, setVehicles] = React.useState([]);
    const [showForm, setShowForm] = React.useState(false);
    const [editingId, setEditingId] = React.useState(null);
    const [formData, setFormData] = React.useState({ name: '', description: '', image: '' });
    const STORAGE_KEY = 'vehicles_v1';
    const fileInputRef = React.useRef(null);

    React.useEffect(() => {
      loadVehicles();
    }, []);

    const exportVehicles = () => {
       try {
         const data = JSON.stringify(vehicles || [], null, 2);
         const blob = new Blob([data], { type: 'application/json' });
         const url = URL.createObjectURL(blob);
         const a = document.createElement('a');
         a.href = url;
         a.download = 'vehicles.json';
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
          setVehicles(parsed);
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

    const loadVehicles = async () => {
      try {
        // prefer localStorage (persisted edits), fallback to data file
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
          setVehicles(JSON.parse(cached));
          return;
        }

        const res = await fetch('/data/vehicles.json', { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to load data file: ${res.status}`);
        const json = await res.json();
        setVehicles(json || []);
        saveToStorage(json || []);
      } catch (error) {
        console.error('Error loading vehicles:', error);
        setVehicles([]); // recover
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        let list = Array.isArray(vehicles) ? [...vehicles] : [];
        if (editingId) {
          list = list.map((v) => (v.id === editingId ? { ...v, ...formData } : v));
        } else {
          const newObj = {
            id: `local_${Date.now()}`,
            ...formData,
          };
          list.unshift(newObj);
        }
        setVehicles(list);
        saveToStorage(list);
        setFormData({ name: '', description: '', image: '' });
        setShowForm(false);
        setEditingId(null);
      } catch (error) {
        console.error('Error saving vehicle:', error);
        alert('Error saving vehicle');
      }
    };

    const editVehicle = (vehicle) => {
      setFormData({ name: vehicle.name || '', description: vehicle.description || '', image: vehicle.image || '' });
      setEditingId(vehicle.id);
      setShowForm(true);
    };

    const deleteVehicle = async (id) => {
      if (confirm('Delete this vehicle?')) {
        try {
          const list = vehicles.filter((v) => v.id !== id);
          setVehicles(list);
          saveToStorage(list);
        } catch (error) {
          console.error('Error deleting vehicle:', error);
          alert('Error deleting vehicle');
        }
      }
    };

    return (
      <div className="bg-white rounded-lg shadow-md p-6" data-name="vehicles-manager" data-file="components/admin/VehiclesManager.js">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Vehicles Manager</h2>
          <div className="flex items-center space-x-3">
            <button onClick={() => exportVehicles()} className="btn-secondary">Export JSON</button>
            <button onClick={() => fileInputRef.current && fileInputRef.current.click()} className="btn-secondary">Import JSON</button>
            <button onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ name: '', description: '', image: '' }); }} className="btn-primary">
              {showForm ? 'Cancel' : 'Add New'}
            </button>
            <input ref={fileInputRef} type="file" accept="application/json" onChange={handleImportFile} className="hidden" />
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <input type="text" placeholder="Vehicle Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="form-input mb-3" />
            <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required className="form-input mb-3" rows="3" />
            <input type="url" placeholder="Image URL" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} required className="form-input mb-3" />
            <button type="submit" className="btn-primary">
              {editingId ? 'Update' : 'Add'} Vehicle
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white border rounded-lg overflow-hidden">
              <img src={vehicle.image} alt={vehicle.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{vehicle.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{vehicle.description}</p>
                <div className="flex space-x-2">
                  <button onClick={() => editVehicle(vehicle)} className="btn-secondary flex-1">Edit</button>
                  <button onClick={() => deleteVehicle(vehicle.id)} className="btn-danger flex-1">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('VehiclesManager component error:', error);
    return null;
  }
}
