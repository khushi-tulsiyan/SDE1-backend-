const Redis = require('ioredis');

class QueueManager {
  constructor() {
    this.redis = new Redis(process.env.REDIS_URL);
    this.queueName = 'image-processing-queue';
  }

  async enqueue(jobId) {
    await this.redis.rpush(this.queueName, jobId);
  }

  async dequeue() {
    const jobId = await this.redis.lpop(this.queueName);
    return jobId;
  }
}

module.exports = new QueueManager();