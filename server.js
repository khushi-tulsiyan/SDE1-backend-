require('dotenv').config();
const express = require('express');
const { connectToDatabase } = require('./src/config/database');
const uploadApi = require('./src/api/uploadApi');
const statusApi = require('./src/api/statusApi');
const { startWorker } = require('./src/workers/jobWorker');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectToDatabase();

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

// Start the worker
startWorker().catch(console.error);