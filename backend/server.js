const express = require('express');
const mysql = require("mysql2")
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
require('dotenv').config();

const port = process.env.BACKEND_PORT || 3000;

app.use(express.json());
app.use(bodyParser.json())
app.use(cors())

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT
});

connection.connect(error => {
  if (error) throw error;
  console.log('Database connected!');

  // Create admin table if it doesn't exist
  const createAdminTable = `
      CREATE TABLE IF NOT EXISTS admin (
        aid INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      );
    `;

  // Create flashcards table if it doesn't exist
  const createFlashcardsTable = `
      CREATE TABLE IF NOT EXISTS flashcard (
        fid INT AUTO_INCREMENT PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        admin_id INT,
        FOREIGN KEY (admin_id) REFERENCES admin(aid)
      );
    `;

  // Execute the queries
  connection.query(createAdminTable, (error, results) => {
    if (error) throw error;
    console.log('Admin table created or already exists.');
  });
  connection.query(createFlashcardsTable, (error, results) => {
    if (error) throw error;
    console.log('Flashcards table created or already exists.');

    // Close the connection
    connection.end();
  });
});

const adminRoutes = require('./routes/admin');
const flashcardRoutes = require('./routes/flashcards');

app.use('/admin', adminRoutes);
app.use('/flashcards', flashcardRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
