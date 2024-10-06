import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// MySQL configuration
const MYSQL_CONFIG = {
    host: 'localhost', // Hardcoded host
    user: 'root', // Hardcoded user
    database: 'authenticated_users', // Hardcoded database name
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        // Initialize MySQL connection
        const connection = await mysql.createPool(MYSQL_CONFIG);

        // Check if the user exists
        const [existingUsers] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const user = existingUsers[0];

        // Check the password
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token in the cookie
        res.setHeader('Set-Cookie', `user-token=${token}; HttpOnly; Path=/; Max-Age=3600`);

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
