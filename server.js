// Importing necessary modules
const express = require('express'); // Importing Express for handling HTTP requests
const cookieParser = require('cookie-parser'); // Importing cookie-parser for handling cookies
const next = require('next'); // Importing Next.js

const dev = process.env.NODE_ENV !== 'production'; // Check if in development mode
const app = next({ dev }); // Create a Next.js instance
const handle = app.getRequestHandler(); // Get Next.js's request handler

// Import your login router
const loginRouter = require('./utils/loginRouter'); // Adjust the path to your login router

// Prepare the Next.js app
app.prepare().then(() => {
  // Create an instance of the Express application
  const server = express();

  // Middleware
  server.use(express.json()); // Parse JSON bodies
  server.use(cookieParser()); // Parse cookies

  // Use the login router for API routes
  server.use(loginRouter);

  // Catch all other requests and pass them to Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Determine the port to listen on, using the one provided by Render
  const PORT = process.env.PORT || 3002; // Fallback to 3000 if PORT is not set

  // Start the server
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running on port ${PORT}`);
  });
});
