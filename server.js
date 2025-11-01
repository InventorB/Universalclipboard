const express = require('express');
const app = express();
// setup database
const Database = require('better-sqlite3');
const db = new Database('db.sqlite');

// id, device-name, url
db.prepare(`
  CREATE TABLE IF NOT EXISTS urls (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    DEVICE TEXT,
    URL TEXT
  )
`).run();

const insert = db.prepare('INSERT INTO urls (DEVICE, URL) VALUES (?, ?)');
insert.run('Welcome-URL', 'https://github.com/InventorB/Universalclipboard/');

const hostname = '100.64.0.3'; // Replace with your desired IP address
const port = 3000;

app.get('/', (req, res) => {
    res.status(404);
    res.send('404: No API here. Did you mean /api/* ?');
});

app.get('/api/latesturl', (req, res) => {
    const latest = db.prepare('SELECT * FROM urls ORDER BY id DESC LIMIT 1').get();
    res.redirect(301, latest.URL);
});


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
