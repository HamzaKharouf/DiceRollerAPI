const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// Allow CORS (except in the failure condition later)
app.use(cors());

// Dice Roller API: Roll a dice (1-6)
app.get("/roll", (req, res) => {
  const roll = Math.floor(Math.random() * 6) + 1;
  res.json({ result: roll });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
