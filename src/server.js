// src/server.js
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Debug the API key (Add this line right after dotenv.config())
console.log("API Key from .env:", process.env.OPENWEATHERMAP_API_KEY);

const app = express();
const PORT = 3001;

// Serve the front-end files
app.use(express.static('src'));

// Endpoint to send the API key securely to the client
app.get('/api/key', (req, res) => {
	res.json({ apiKey: process.env.OPENWEATHERMAP_API_KEY });
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
