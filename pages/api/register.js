
// Importing necessary modules and functions
import { connectToDatabase } from '../../utilis/database'; // Function to connect to the database
import bcrypt from 'bcryptjs'; // Function to hash passwords
import jwt from 'jsonwebtoken'; // Function to generate JSON Web Tokens

// Main function that handles the HTTP request
export default async function handler(req, res) {

    // Check if the request method is POST
    if (req.method === 'POST') {

        // Extract the request body data
        const { name, email, phone, password } = req.body;

        try {

            // Establish a connection to the database
            const db = await connectToDatabase();

            // Check if the user already exists
            const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

            // If the user already exists, return an error
            if (existingUser.length > 0) {
                return res.status(409).json({ error: 'User already registered. Please use a different email.' });
            }

            // Hash the password
            const hashedPassword = bcrypt.hashSync(password, 10);

            // Insert the user into the database
            const query = 'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)';
            const [result] = await db.query(query, [name, email, phone, hashedPassword]);

            // Generate a JWT token
            const token = jwt.sign({ id: result.insertId, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Return a success message along with the token
            res.status(201).json({ message: 'User registered successfully', token });

        } catch (err) {

            // If there is an error, return an internal server error
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'Internal server error' });
        }

    } else {

        // If the request method is not POST, return an error
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

