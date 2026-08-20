const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { attachTenantScope } = require('../middleware/tenant.middleware');
const { checkPermission } = require('../middleware/rbac.middleware');
const { createRecord, getRecords } = require('../controllers/record.controller');

router.post('/:objectName', protect, attachTenantScope, checkPermission('Leads', 'create'), createRecord);
router.get('/:objectName', protect, attachTenantScope, checkPermission('Leads', 'read'), getRecords);

module.exports = router;