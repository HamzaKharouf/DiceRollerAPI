const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 1) Successful roll endpoint (CORS allowed)
app.get('/roll', cors({ origin: '*' }), (req, res) => {
  const sides = parseInt(req.query.sides) || 6;
  const result = Math.floor(Math.random() * sides) + 1;
  res.json({ roll: result });
});

// 2) Roll endpoint that simulates a CORS failure
app.get('/roll-fail', (req, res) => {
  // Only allows https://unauthorized-site.com, so any other origin will fail
  res.setHeader('Access-Control-Allow-Origin', 'https://unauthorized-site.com');

  const sides = parseInt(req.query.sides) || 6;
  const result = Math.floor(Math.random() * sides) + 1;
  res.json({ roll: result });
});

// (Optional) Root route just to show a message at "/"
app.get('/', (req, res) => {
  res.send('Dice Roller API is running. Use /roll or /roll-fail endpoints.');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
