const ObjectMetadata = require('../models/ObjectMetadata');
const DynamicRecord = require('../models/DynamicRecord');
const { auditLog } = require('../utils/logger');

const createRecord = async (req, res) => {
  try {
    const { objectName } = req.params;
    const metadata = await ObjectMetadata.findOne({ tenantId: req.user.tenantId, objectName });

    if (!metadata) {
      return res.status(404).json({ error: 'Object schema definition not found' });
    }

    const attributes = req.body;
    for (let field of metadata.fields) {
      if (field.required && !attributes[field.fieldName]) {
        return res.status(400).json({ error: `Field '${field.fieldName}' is required.` });
      }
    }

    const record = await DynamicRecord.create({
      tenantId: req.user.tenantId,
      objectName,
      attributes,
      createdBy: req.user.userId
    });

    auditLog('CREATE_RECORD', req.user.userId, req.user.tenantId, { objectName, recordId: record._id });
    res.status(201).json({ message: 'Record created successfully', record });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecords = async (req, res) => {
  try {
    const { objectName } = req.params;
    const records = await DynamicRecord.find({ tenantId: req.user.tenantId, objectName });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createRecord, getRecords };