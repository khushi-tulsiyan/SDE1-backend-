
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  filePath: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  completedAt: Date,
  error: String
});

// src/models/product.js
const productSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  serialNumber: String,
  name: String,
  inputImageUrls: [String],
  outputImageUrls: [String]
});

const Job = mongoose.model('Job', jobSchema);
const Product = mongoose.model('Product', productSchema);

module.exports = { Job, Product };