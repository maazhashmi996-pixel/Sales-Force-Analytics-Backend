// Safe mock Redis configuration taake app bina Redis ke chale
const redisConnection = {
  status: 'ready',
  on: () => {},
  once: () => {},
  off: () => {},
  quit: async () => {},
  disconnect: () => {},
  get: async () => null,
  set: async () => null,
  del: async () => null,
};

console.log('⚠️ Running without Redis (Mock mode)');

module.exports = redisConnection;