import { connectToDatabase } from '../../utils/database'; // Function to connect to the database
import bcrypt from 'bcryptjs'; // Function to hash passwords
import jwt from 'jsonwebtoken'; // Function to generate JSON Web Tokens

export const config = {
    runtime: 'nodejs',
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, phone, password } = req.body;

        try {
            const db = await connectToDatabase();

            const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
            if (existingUser.length > 0) {
                return res.status(409).json({ error: 'User already registered. Please use a different email.' });
            }

            const hashedPassword = bcrypt.hashSync(password, 10);
            const query = 'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)';
            const [result] = await db.query(query, [name, email, phone, hashedPassword]);

            const token = jwt.sign({ id: result.insertId, email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(201).json({ message: 'User registered successfully', token });
        } catch (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
