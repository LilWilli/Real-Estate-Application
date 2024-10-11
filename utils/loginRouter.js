// utils/loginRouter.js

// Importing necessary modules
const express = require('express'); // Importing Express for handling HTTP requests
const bcrypt = require('bcryptjs'); // Importing bcryptjs for hashing passwords
const jwt = require('jsonwebtoken'); // Importing jsonwebtoken for generating JSON Web Tokens
const { connectToDatabase } = require('./database'); // Adjust the path accordingly

// Create an Express router
const router = express.Router();

// Creating a database connection
let db;
(async () => {
    db = await connectToDatabase(); // Await the asynchronous connection
})();

// User Login Route
router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Check if user exists
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = rows[0];

        // Check password validity
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token in a cookie for future requests
        res.cookie('user-token', token, { httpOnly: true, maxAge: 3600000 });

        // Respond with a success message
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Export the router
module.exports = router; // Use module.exports to export the router
