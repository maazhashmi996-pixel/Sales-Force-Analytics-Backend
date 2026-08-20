const { Queue } = require('bullmq');
const redis = require('../config/redis');

const workflowQueue = new Queue('workflow-queue', { connection: redis });

const triggerWorkflow = async (req, res) => {
  try {
    const { workflowName, payload } = req.body;
    
    // Push task to BullMQ background queue for asynchronous processing
    await workflowQueue.add(workflowName, {
      tenantId: req.user.tenantId,
      payload
    }, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 5000 }
    });

    res.status(200).json({ message: 'Workflow queued successfully for background execution' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { triggerWorkflow };