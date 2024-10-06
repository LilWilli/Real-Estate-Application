// utilis/database.js
import mysql from 'mysql2/promise'; // Importing mysql2 for interacting with MySQL database

// MySQL configuration object
const MYSQL_CONFIG = {
    host: process.env.MYSQL_HOST || 'localhost', // Default to 'localhost' if not in environment
    user: process.env.MYSQL_USER || 'root', // Default to 'root' if not in environment
    password: process.env.MYSQL_PASSWORD || '', // Default to empty if not in environment
    database: process.env.MYSQL_DATABASE || 'authenticated_users', // Default database name
    port: 3306, // Default MySQL port
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
