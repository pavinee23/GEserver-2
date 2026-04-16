require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Homepage: advertise + list clients
app.get('/', (req, res) => {
  db.all((err, rows) => {
    if (err) return res.status(500).send('DB error');
    res.render('index', { clients: rows });
  });
});

// Client landing page
app.get('/client/:id', (req, res) => {
  const id = req.params.id;
  db.get(id, (err, row) => {
    if (err) return res.status(500).send('DB error');
    if (!row) return res.status(404).send('Client not found');
    res.render('client', { client: row });
  });
});

// Simple admin form to add a client (no auth in this scaffold)
app.get('/admin', (req, res) => {
  res.render('admin');
});

app.post('/admin/add-client', (req, res) => {
  const { name, description, url, logo } = req.body;
  if (!name || !url) return res.status(400).send('name and url are required');
  db.add({ name, description, url, logo }, (err) => {
    if (err) return res.status(500).send('DB error');
    res.redirect('/');
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
