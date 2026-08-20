const { Worker } = require('bullmq');
const redis = require('../config/redis');

let worker = null;

// Sirf tab worker banayein jab real Redis connection available ho
try {
  // Check karte hain ke redis object ke paas connection options hain ya nahi
  if (redis && typeof redis.status === 'undefined') {
    worker = new Worker('workflow-queue', async (job) => {
      console.log(`[Worker] Processing workflow job: ${job.name} for tenant: ${job.data.tenantId}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`[Worker] Job ${job.id} completed successfully.`);
    }, { connection: redis });

    worker.on('failed', (job, err) => {
      console.error(`[Worker] Job ${job.id} failed with error: ${err.message}`);
    });
    
    console.log('[Worker] Workflow queue worker initialized successfully.');
  } else {
    console.log('⚠️ [Worker] Skipped workflow worker initialization (Redis mock mode active).');
  }
} catch (error) {
  console.log('⚠️ [Worker] Could not start worker due to missing Redis server.');
}

module.exports = worker;