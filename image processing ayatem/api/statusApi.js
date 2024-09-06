const express = require('express');
const Job = require('../models/job');

const router = express.Router();

router.get('/status/:requestId', async (req, res) => {
  try {
    const job = await Job.findById(req.params.requestId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ status: job.status });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;