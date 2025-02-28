const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// Allowed origins (replace with your actual static site URL)
const allowedOrigins = ["https://your-static-site-url"];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS not allowed"));
        }
    }
}));

// Dice Roller API: Returns a random number (1-6)
app.get("/roll", (req, res) => {
    const roll = Math.floor(Math.random() * 6) + 1;
    res.json({ result: roll });
});

// Wake-up API to prevent Azure cold start issues
app.get("/wake", (req, res) => {
    res.send("Server is awake!");
});

// Error handling middleware
app.use((err, req, res, next) => {
    if (err.message === "CORS not allowed") {
        res.status(403).json({ error: "CORS Error: This site is not allowed to access the API" });
    } else {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
