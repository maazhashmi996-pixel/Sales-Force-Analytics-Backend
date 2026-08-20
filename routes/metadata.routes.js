const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { attachTenantScope } = require('../middleware/tenant.middleware');
const { upsertMetadata, getMetadata } = require('../controllers/metadata.controller');

router.post('/objects', protect, attachTenantScope, upsertMetadata);
router.get('/objects/:objectName', protect, attachTenantScope, getMetadata);

module.exports = router;