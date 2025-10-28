function ContactForm() {
  try {
    const [formData, setFormData] = React.useState({
      name: '',
      phone: '',
      email: '',
      address: '',
      reason: ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [message, setMessage] = React.useState({ type: '', text: '' });

    const STORAGE_KEY = 'shreya_contact_list';

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const saveToLocal = (data) => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY) || '[]';
        const list = JSON.parse(raw);
        const entry = {
          objectId: String(Date.now()),
          objectData: data,
          createdAt: new Date().toISOString()
        };
        list.unshift(entry);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        return entry;
      } catch (err) {
        console.error('localStorage save error', err);
        throw err;
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (isSubmitting) return;
      setIsSubmitting(true);
      setMessage({ type: '', text: '' });

      try {
        if (typeof trickleCreateObject === 'function') {
          // try Trickle API
          await trickleCreateObject('contact', formData);
        } else {
          // fallback - save local so admin list can read it
          saveToLocal(formData);
        }

        setMessage({ type: 'success', text: 'Thank you! We will contact you soon.' });
        setFormData({ name: '', phone: '', email: '', address: '', reason: '' });
      } catch (error) {
        console.error('Submit error', error);
        setMessage({ type: 'error', text: 'Failed to send message. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="py-16" data-name="contact-form" data-file="components/ContactForm.js">
        <div className="container mx-auto px-4">
          <h1 className="section-title">Contact Us</h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Ready to embark on your spiritual journey? Fill out the form below.
          </p>

          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            {message.text && (
              <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" placeholder="Enter your full name" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="form-input" placeholder="+91 XXXXXXXXXX" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" placeholder="your.email@example.com" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Address</label>
                <textarea name="address" value={formData.address} onChange={handleChange} rows="3" className="form-input" placeholder="Your address" />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Reason for Contact *</label>
                <textarea name="reason" value={formData.reason} onChange={handleChange} required rows="5" className="form-input" placeholder="Tell us about your travel plans" />
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-50">
                {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ContactForm component error:', error);
    return null;
  }
}