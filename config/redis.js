const Redis = require('ioredis');

const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

redisClient.on('connect', () => {
    console.log('Redis Connected Successfully');
});

redisClient.on('error', (err) => {
    console.error('Redis Connection Error:', err);
});

module.exports = redisClient;