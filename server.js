const express = require('express');
const cors = require('cors');
const app = express();
// setup database
const Database = require('better-sqlite3');
const db = new Database('db.sqlite');

app.use(cors());
// id, device-name, url
db.prepare(`
  CREATE TABLE IF NOT EXISTS urls (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    DEVICE TEXT,
    URL TEXT
  )
`).run();

const count = db.prepare('SELECT COUNT(*) AS c FROM urls').get().c;
const insert = db.prepare('INSERT INTO urls (DEVICE, URL) VALUES (?, ?)');
if (count === 0) {
  insert.run(
    'Getting-Started',
    'https://github.com/InventorB/Universalclipboard/'
  );
}

const hostname = '100.64.0.3'; // Replace with your desired IP address
const port = 3000;

app.get('/', (req, res) => {
    res.status(404);
    res.send('404: No API here. Did you mean /api/* ?');
});
// add an url to the database
app.put('/api/submiturl', (req, res) => {
  device = "";
  if(!req.headers.device || req.headers.device == "") {
    device = req.ip;
  } else {
    device = req.headers.device;
  }
  insert.run(device, req.headers.url);
  console.log(`New URL from ${device}: ${req.headers.url}`);
  res.sendStatus(201);
});

app.get('/api/latesturl', (req, res) => {
    const latest = db.prepare('SELECT * FROM urls ORDER BY id DESC LIMIT 1').get();
    res.redirect(301, latest.URL);
});


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
