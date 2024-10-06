// utilis/database.js
import mysql from 'mysql2/promise'; // Importing mysql2 for interacting with MySQL database

// MySQL configuration object
const MYSQL_CONFIG = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD, // Ensure this is included
    database: process.env.MYSQL_DATABASE, // Updated to use the environment variable
};

// Create a connection pool once
let connectionPool;
export const connectToDatabase = async () => {
    if (!connectionPool) {
        connectionPool = await mysql.createPool(MYSQL_CONFIG);
        console.log('Connected to MySQL database');
    }
    return connectionPool; // Return the connection pool
};
