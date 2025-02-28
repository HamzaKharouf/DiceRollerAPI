const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: "*" || "https://localhost:3000",
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    })
);

app.use(express.json());

app.use(express.static('public'));

app.get('/roll', (req, res) => {
  const sides = parseInt(req.query.sides) || 6;
  const result = Math.floor(Math.random() * sides) + 1;
  res.json({ roll: result });
});

app.get('/roll-fail', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://unauthorized-site.com');
  const sides = parseInt(req.query.sides) || 6;
  const result = Math.floor(Math.random() * sides) + 1;
  res.json({ roll: result });
});

app.get('/', (req, res) => {
  res.send('Dice Roller API is running. Use /roll or /roll-fail endpoints.');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
