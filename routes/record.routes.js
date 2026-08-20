const express = require('express');
const router = express.Router();
const { createRecord, getRecords } = require('../controllers/record.controller');

// Sare middlewares hata diye hain taake bina kisi restriction ke data fetch ho sakay
router.post('/:objectName', createRecord);
router.get('/:objectName', getRecords);

module.exports = router;