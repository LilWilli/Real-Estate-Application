import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// MySQL configuration
const MYSQL_CONFIG = {
    host: '192.168.0.10',
    user: 'William',
    password: 'demilade1234#', // add your MySQL password
    database: 'authenticated_users',
};

// This ensures that Node.js is used, not the Edge runtime
export const config = {
    runtime: 'nodejs',
};

// API route handler
export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        // Connect to MySQL database
        const pool = await mysql.createPool(MYSQL_CONFIG);
        
        // Fetch user by email
        const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        // Check if user exists
        if (existingUsers.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const user = existingUsers[0];
        
        // Compare passwords
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        // Invalid password check
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set cookie with the token
        res.setHeader('Set-Cookie', `user-token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`);

        // Send successful response
        res.status(200).json({ message: 'Login successful', token });

        // Close the MySQL connection
        pool.end();
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}
