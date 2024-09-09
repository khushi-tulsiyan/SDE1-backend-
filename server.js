// server.js

require('dotenv').config();
const express = require('express');
const { connectToDatabase } = require('./image processing system/src/config/database');
const uploadApi = require('./image processing system/src/api/uploadApi');
const statusApi = require('./statusApi'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectToDatabase()
  .then(() => {
    // Start the server only after successfully connecting to the database
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });

// Middleware
app.use(express.json());

// API routes
app.use('/api', uploadApi);
app.use('/api', statusApi);

// Serve processed images
app.use('/processed', express.static('public/processed'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});