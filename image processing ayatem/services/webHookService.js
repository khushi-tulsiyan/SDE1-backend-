const axios = require('axios');

class WebhookService {
  async notify(job) {
    // In a real-world scenario, you'd store the webhook URL for each job
    // For this example, we'll use a placeholder URL
    const webhookUrl = process.env.WEBHOOK_URL || 'http://example.com/webhook';

    try {
      await axios.post(webhookUrl, {
        jobId: job._id,
        status: job.status,
        result: job.result
      });
      console.log(`Webhook sent for job ${job._id}`);
    } catch (error) {
      console.error(`Failed to send webhook for job ${job._id}:`, error);
    }
  }
}

module.exports = new WebhookService();