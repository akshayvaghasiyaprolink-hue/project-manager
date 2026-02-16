const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

module.exports = router;