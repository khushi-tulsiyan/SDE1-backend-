const express = require('express');
const multer = require('multer');
const csvValidator = require('./image processing system/src/utils/CsvValidator');
const Job = require('./image processing system/src/models/job');
const queueManager = require('./image processing system/srcutils/queueManager');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('csv'), async (req, res) => {
  try {
    const file = req.file;
    
    // Validate CSV
    const isValid = await CsvValidator.validate(file.path);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid CSV format' });
    }

    // Create job
    const job = new Job({
      status: 'pending',
      filePath: file.path
    });
    await job.save();

    // Enqueue job
    await queueManager.enqueue(job._id);

    res.json({ requestId: job._id });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;