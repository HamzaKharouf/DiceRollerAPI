const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS globally for all routes
app.use(cors());

// Parse JSON requests (important for handling POST requests properly)
app.use(express.json());

// Successful roll endpoint
app.get('/roll', (req, res) => {
  const sides = parseInt(req.query.sides) || 6;
  const result = Math.floor(Math.random() * sides) + 1;
  res.json({ roll: result });
});

// Roll endpoint with simulated CORS failure (if needed)
app.get('/roll-fail', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://unauthorized-site.com');
  const sides = parseInt(req.query.sides) || 6;
  const result = Math.floor(Math.random() * sides) + 1;
  res.json({ roll: result });
});

// Root route
app.get('/', (req, res) => {
  res.send('Dice Roller API is running. Use /roll or /roll-fail endpoints.');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
