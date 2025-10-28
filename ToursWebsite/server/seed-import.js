// Utility script to import exported JSON into the local server storage (data_store).
// Usage: node seed-import.js path/to/destinations.json
// It writes to server/data_store/destinations.json (overwrites).

const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
  console.error('Usage: node seed-import.js path/to/destinations.json');
  process.exit(1);
}

const src = process.argv[2];
const DB_DIR = path.join(__dirname, 'data_store');
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR);

try {
  const raw = fs.readFileSync(src, 'utf8');
  const parsed = JSON.parse(raw);
  // Ensure array of objects is acceptable shape
  const normalized = Array.isArray(parsed) ? parsed : (parsed.items || []);
  fs.writeFileSync(path.join(DB_DIR, 'destinations.json'), JSON.stringify(normalized, null, 2));
  console.log('Imported', normalized.length, 'destinations to', path.join(DB_DIR, 'destinations.json'));
} catch (err) {
  console.error('Import failed:', err);
  process.exit(1);
}