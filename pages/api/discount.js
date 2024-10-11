import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const MYSQL_CONFIG = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
};

export const config = {
    runtime: 'nodejs',
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { code } = req.body;

        try {
            const pool = mysql.createPool(MYSQL_CONFIG);
            const [rows] = await pool.query('SELECT * FROM discount_codes WHERE code = ?', [code]);

            if (rows.length > 0) {
                const discount = rows[0];

                if (discount.used) {
                    res.status(400).json({ error: 'Discount code already used' });
                } else {
                    await pool.query('UPDATE discount_codes SET used = true WHERE code = ?', [code]);
                    res.status(200).json({ discount: discount.discount_percentage });
                }
            } else {
                res.status(404).json({ error: 'Invalid discount code' });
            }
        } catch (error) {
            console.error('Error processing discount code:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
