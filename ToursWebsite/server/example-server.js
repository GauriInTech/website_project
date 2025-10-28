// Example Node/Express API server for shreyatravels
// - Provides simple JSON file-backed storage for quick testing.
// - Endpoints are under /api (GET/POST/PUT/DELETE).
// - Intended for testing or small deployments. For production, use a proper DB + auth.

const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DB_DIR = path.join(__dirname, 'data_store');
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR);

// Utility functions
function readList(name) {
  const f = path.join(DB_DIR, name + '.json');
  if (!fs.existsSync(f)) return [];
  try { return JSON.parse(fs.readFileSync(f, 'utf8')) || []; } catch (e) { return []; }
}
function writeList(name, data) {
  fs.writeFileSync(path.join(DB_DIR, name + '.json'), JSON.stringify(data, null, 2));
}

// Simple health check
app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

/**
 * CONTACTS
 * - GET /api/contacts
 * - POST /api/contacts  (body = contact object or objectData shape)
 * - DELETE /api/contacts/:id
 */
app.get('/api/contacts', (req, res) => {
  res.json(readList('contacts'));
});

app.post('/api/contacts', (req, res) => {
  const list = readList('contacts');
  const id = Date.now().toString();
  // Support both callers that send objectData or raw body
  const payload = req.body || {};
  const contact = {
    objectId: id,
    objectData: payload.objectData || payload,
    createdAt: payload.createdAt || new Date().toISOString()
  };
  list.unshift(contact);
  writeList('contacts', list);
  res.json(contact);
});

app.delete('/api/contacts/:id', (req, res) => {
  let list = readList('contacts');
  list = list.filter((c) => String(c.objectId) !== String(req.params.id));
  writeList('contacts', list);
  res.json({ ok: true });
});

/**
 * DESTINATIONS
 * - GET /api/destinations
 * - POST /api/destinations  (body = { objectData: {...} } or plain objectData)
 * - PUT /api/destinations/:id
 * - DELETE /api/destinations/:id
 */
app.get('/api/destinations', (req, res) => {
  res.json(readList('destinations'));
});

app.post('/api/destinations', (req, res) => {
  const list = readList('destinations');
  const body = req.body || {};
  const entry = {
    objectId: body.objectId || Date.now().toString(),
    objectData: body.objectData || body
  };
  list.unshift(entry);
  writeList('destinations', list);
  res.json(entry);
});

app.put('/api/destinations/:id', (req, res) => {
  let list = readList('destinations');
  const body = req.body || {};
  list = list.map((d) => (String(d.objectId) === String(req.params.id) ? { ...d, objectData: body } : d));
  writeList('destinations', list);
  res.json({ ok: true });
});

app.delete('/api/destinations/:id', (req, res) => {
  let list = readList('destinations');
  list = list.filter((d) => String(d.objectId) !== String(req.params.id));
  writeList('destinations', list);
  res.json({ ok: true });
});

/**
 * Optional: simple static file serving for quick tests
 * (Not required; you typically deploy the server separately.)
 */
app.use('/server-static', express.static(path.join(__dirname, 'public')));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Shreya API server running on port', PORT);
});
