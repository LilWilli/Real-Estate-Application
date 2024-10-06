// utils/database.js
// This file contains the code for connecting to the MySQL database using the mysql2/promise library.
// It also uses the dotenv library to load environment variables from a .env file.

// Importing necessary modules.
const mysql = require('mysql2/promise'); // Importing the mysql2/promise module.
require('dotenv').config(); // Loading environment variables from .env file.

// Declaring a variable to hold the database connection.
let db;

// Defining an asynchronous function to connect to the database.
// This function is exported and can be used in other files of the application.
async function connectToDatabase() {
    // Checking if the database connection is already established.
    if (!db) {
        // If not, establishing the database connection.
        db = await mysql.createPool({
            // Specifying the host, user, password, and database details from the environment variables.
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });
        // Logging a message when the database connection is successfully established.
        console.log('Connected to MySQL database.');
    }
    // Returning the database connection object.
    return db;
}

// Exporting the connectToDatabase function.
module.exports = { connectToDatabase };

