const express = require('express');
const ObjectSchema = require('../models/ObjectSchema');
const DynamicRecord = require('../models/DynamicRecord');
const verifyToken = require('../middleware/auth');
const tenantMiddleware = require('../middleware/tenant');

const router = express.Router();

// Apply auth and tenant middleware to all schema routes
router.use(verifyToken, tenantMiddleware);

// Create Custom Field Schema (Admin)
router.post('/schema', async (req, res) => {
    try {
        const { objectName, fields } = req.body;
        let schema = await ObjectSchema.findOne({ tenantId: req.tenantId, objectName });

        if (schema) {
            schema.fields = fields;
            await schema.save();
        } else {
            schema = new ObjectSchema({ tenantId: req.tenantId, objectName, fields });
            await schema.save();
        }

        res.json({ message: 'Schema saved successfully', schema });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create Dynamic Record (Lead/Deal entry based on custom schema)
router.post('/records/:objectName', async (req, res) => {
    try {
        const { objectName } = req.params;
        const { data } = req.body;

        const record = new DynamicRecord({
            tenantId: req.tenantId,
            objectName,
            data,
            createdBy: req.user.userId
        });

        await record.save();
        res.status(201).json({ message: 'Record created successfully', record });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Records for Tenant
router.get('/records/:objectName', async (req, res) => {
    try {
        const records = await DynamicRecord.find({ tenantId: req.tenantId, objectName: req.params.objectName });
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;