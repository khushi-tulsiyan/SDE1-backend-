const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  filePath: String,
  result: [{
    serialNumber: String,
    productName: String,
    inputUrls: [String],
    outputUrls: [String]
  }],
  error: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);