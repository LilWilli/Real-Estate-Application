
// signup.js
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    database: 'authenticated_users',
};

export const config = {
    runtime: 'nodejs',
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const pool = await mysql.createPool(MYSQL_CONFIG);
        const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUsers.length > 0) {
            return res.status(409).json({ error: 'User already registered. Please use a different email.' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        const [result] = await pool.query(query, [email, hashedPassword]);

        const token = jwt.sign({ id: result.insertId, email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.setHeader('Set-Cookie', `user-token=${token}; HttpOnly; Path=/; Max-Age=3600`);
        res.status(201).json({ message: 'User registered successfully', token });

        pool.end(); // Close the connection
    } catch (error) {
        console.error('Error during signup:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}