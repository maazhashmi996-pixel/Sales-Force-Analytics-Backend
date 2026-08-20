const jwt = require('jsonwebtoken');
const redis = require('../config/redis');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'Not authorized, token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const isBlacklisted = await redis.get(`bl_${token}`);
    if (isBlacklisted) return res.status(401).json({ error: 'Token expired or logged out' });

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Not authorized, token failed' });
  }
};

module.exports = { protect };