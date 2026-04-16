const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const DB_FILE = process.env.DATABASE_FILE || path.join(__dirname, 'data', 'clients.db');

// ensure data dir exists
const dir = path.dirname(DB_FILE);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const db = new sqlite3.Database(DB_FILE);

// initialize table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    logo TEXT
  )`);

  // insert sample if empty
  db.get('SELECT COUNT(*) AS c FROM clients', (err, row) => {
    if (!err && row.c === 0) {
      const stmt = db.prepare('INSERT INTO clients (name, description, url, logo) VALUES (?,?,?,?)');
      stmt.run('Acme Co', 'ระบบจัดการของ Acme', 'https://example-client-1.local', '');
      stmt.run('Beta Ltd', 'ระบบสำหรับ Beta', 'https://example-client-2.local', '');
      stmt.finalize();
    }
  });
});

module.exports = {
  all: (cb) => db.all('SELECT * FROM clients ORDER BY id DESC', cb),
  get: (id, cb) => db.get('SELECT * FROM clients WHERE id = ?', [id], cb),
  add: (client, cb) => db.run('INSERT INTO clients (name, description, url, logo) VALUES (?,?,?,?)', [client.name, client.description, client.url, client.logo || ''], cb)
};
