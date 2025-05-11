const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/ubicacion', (req, res) => {
  const { id, lat, lon } = req.body;
  if (!id || !lat || !lon) return res.status(400).send('Faltan datos');

  let ubicaciones = {};
  try {
    ubicaciones = JSON.parse(fs.readFileSync('data.json'));
  } catch (err) {}

  ubicaciones[id] = { lat, lon, timestamp: Date.now() };
  fs.writeFileSync('data.json', JSON.stringify(ubicaciones, null, 2));
  res.send('OK');
});

app.get('/api/ubicaciones', (req, res) => {
  let ubicaciones = {};
  try {
    ubicaciones = JSON.parse(fs.readFileSync('data.json'));
  } catch (err) {}
  res.json(ubicaciones);
});

app.listen(port, () => {
  console.log(`Servidor en marcha en puerto ${port}`);
});