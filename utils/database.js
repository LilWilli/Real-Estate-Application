// utils/database.js
const mysql = require('mysql2/promise');
require('dotenv').config();

let db;

async function connectToDatabase() {
    if (!db) {
        db = await mysql.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD, // Added password for secure connection
            database: process.env.MYSQL_DATABASE,
            waitForConnections: true,
            connectionLimit: 10, // Added a connection limit
            queueLimit: 0
        });
        console.log('Connected to MySQL database.');
    }
    return db;
}

module.exports = { connectToDatabase };
