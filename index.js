// # main index file 
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require("./routes/auth")

const app = express();
dotenv.config();

// Middleware for parsing request bodies
app.use(express.json()); // Use Express's built-in JSON parser

// Use auth routes from auth.js
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000; // Use a default port if the environment variable is not set
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
