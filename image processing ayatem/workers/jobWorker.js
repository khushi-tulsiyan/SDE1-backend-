const queueManager = require('../utils/queueManager');
const csvProcessor = require('../services/csvProcessor');
const imageProcessor = require('../services/imageProcessor');
const webhookService = require('../services/webHookService');
const Job = require('../models/job');

async function processJob(jobId) {
  const job = await Job.findById(jobId);
  job.status = 'processing';
  await job.save();

  try {
    const csvData = await csvProcessor.process(job.filePath);
    const processedData = await Promise.all(csvData.map(async (row) => {
      const processedUrls = await Promise.all(row.inputUrls.map(imageProcessor.processImage));
      return { ...row, outputUrls: processedUrls };
    }));

    job.result = processedData;
    job.status = 'completed';
    await job.save();

    await webhookService.notify(job);
  } catch (error) {
    job.status = 'failed';
    job.error = error.message;
    await job.save();
  }
}

async function startWorker() {
  while (true) {
    const jobId = await queueManager.dequeue();
    if (jobId) {
      await processJob(jobId);
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
    }
  }
}

module.exports = { startWorker };