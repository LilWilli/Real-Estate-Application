// server.js

// Importing necessary modules
const express = require('express'); // Importing Express for handling HTTP requests
const cookieParser = require('cookie-parser'); // Importing cookie-parser for handling cookies
const loginRouter = require('./utils/loginRouter'); // Adjust the path to your login router

// Create an instance of the Express application
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

// Use the login router for API routes
app.use(loginRouter);

// Determine the port to listen on, using the one provided by Render
const PORT = process.env.PORT || 3000; // Fallback to 3000 if PORT is not set

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
