function AdminHeader() {
  try {
    return (
      <header className="bg-[var(--secondary-color)] text-white shadow-md" data-name="admin-header" data-file="components/admin/AdminHeader.js">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-[var(--primary-color)] flex items-center justify-center">
                <div className="icon-shield text-xl text-white"></div>
              </div>
              <span className="text-xl md:text-2xl font-bold">
                Admin Panel
              </span>
            </div>
            <a href="index.html" className="bg-white text-[var(--secondary-color)] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              View Website
            </a>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('AdminHeader component error:', error);
    return null;
  }
}