const express = require('express');
const app = express();

const hostname = '100.64.0.3'; // Replace with your desired IP address
const port = 3000;

app.get('/', (req, res) => {
    res.status(404);
    res.send('404: NO API HERE. Wrong URL?');
});

app.get('/api/latesturl', (req, res) => {
    res.redirect(301, '/new-route');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
