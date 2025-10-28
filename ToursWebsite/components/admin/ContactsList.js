function ContactsList() {
  try {
    const [contacts, setContacts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const STORAGE_KEY = 'shreya_contact_list';

    React.useEffect(() => {
      loadContacts();
    }, []);

    const loadContacts = async () => {
      setLoading(true);
      try {
        if (typeof trickleListObjects === 'function') {
          const response = await trickleListObjects('contact', 100, true);
          setContacts(response.items || []);
        } else {
          const raw = localStorage.getItem(STORAGE_KEY) || '[]';
          const list = JSON.parse(raw);
          setContacts(list);
        }
      } catch (error) {
        console.error('Error loading contacts:', error);
        // fallback to localStorage if trickle call failed
        try {
          const raw = localStorage.getItem(STORAGE_KEY) || '[]';
          const list = JSON.parse(raw);
          setContacts(list);
        } catch (e) {
          setContacts([]);
        }
      } finally {
        setLoading(false);
      }
    };

    const deleteContact = async (id) => {
      if (!confirm('Are you sure you want to delete this contact?')) return;
      try {
        if (typeof trickleDeleteObject === 'function') {
          await trickleDeleteObject('contact', id);
          loadContacts();
        } else {
          // remove from localStorage
          const raw = localStorage.getItem(STORAGE_KEY) || '[]';
          const list = JSON.parse(raw);
          const filtered = list.filter((c) => String(c.objectId) !== String(id));
          localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
          setContacts(filtered);
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
        alert('Error deleting contact');
      }
    };

    if (loading) return <div className="text-center py-8">Loading...</div>;

    return (
      <div className="bg-white rounded-lg shadow-md p-6" data-name="contacts-list" data-file="components/admin/ContactsList.js">
        <h2 className="text-2xl font-bold mb-6">Contact Inquiries ({contacts.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Message</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.objectId} className="border-b">
                  <td className="px-4 py-3">{contact.objectData?.name}</td>
                  <td className="px-4 py-3">{contact.objectData?.phone}</td>
                  <td className="px-4 py-3">{contact.objectData?.email}</td>
                  <td className="px-4 py-3 max-w-xs truncate">{contact.objectData?.reason}</td>
                  <td className="px-4 py-3">{new Date(contact.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => deleteContact(contact.objectId)} className="text-red-600 hover:text-red-800">
                      <div className="icon-trash-2 text-lg"></div>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ContactsList component error:', error);
    return null;
  }
}