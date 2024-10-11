// Importing necessary modules
import express from 'express'; // Importing Express for handling HTTP requests
import bcrypt from 'bcryptjs'; // Importing bcryptjs for hashing passwords
import jwt from 'jsonwebtoken'; // Importing jsonwebtoken for generating JSON Web Tokens
import { connectToDatabase } from './utils/database'; // Adjusted to './' if 'utils' is a local directory
import dotenv from 'dotenv'; // Import dotenv to load environment variables

dotenv.config(); // Load environment variables from .env file

const db = connectToDatabase(); // Creating a database connection
const app = express(); // Initialize Express app

// Middleware to parse JSON requests
app.use(express.json()); // Parse JSON request bodies

// User Login Route
app.post('/api/login', async (req, res) => {
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

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Set the server to listen on the specified PORT
const PORT = process.env.PORT || 3002; // Default to 3000 if PORT is not defined
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
