const ObjectMetadata = require('../models/ObjectMetadata');
const DynamicRecord = require('../models/DynamicRecord');
const { auditLog } = require('../utils/logger');
const mongoose = require('mongoose');

// Helper to safely get a valid ObjectId for tenant
const getTenantObjectId = (tenantIdStr) => {
  if (mongoose.Types.ObjectId.isValid(tenantIdStr)) {
    return new mongoose.Types.ObjectId(tenantIdStr);
  }
  // Fallback to a fixed 24-char hex ObjectId if string is not a valid ObjectId
  return new mongoose.Types.ObjectId('5f50c31f6b84f33b5443a111');
};

const createRecord = async (req, res) => {
  try {
    const { objectName } = req.params;
    const tenantIdStr = req.user?.tenantId || 't_99482';
    const tenantId = getTenantObjectId(tenantIdStr);
    const userId = req.user?.userId || new mongoose.Types.ObjectId();

    const metadata = await ObjectMetadata.findOne({ tenantId, objectName });

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
      tenantId,
      objectName,
      attributes,
      createdBy: userId
    });

    auditLog('CREATE_RECORD', userId.toString(), tenantId.toString(), { objectName, recordId: record._id });
    res.status(201).json({ message: 'Record created successfully', record });
  } catch (error) {
    console.error('CREATE RECORD ERROR:', error);
    res.status(500).json({ error: error.message });
  }
};

const getRecords = async (req, res) => {
  try {
    const { objectName } = req.params;
    const tenantIdStr = req.user?.tenantId || 't_99482';
    const tenantId = getTenantObjectId(tenantIdStr);
    
    const records = await DynamicRecord.find({ tenantId, objectName }).lean();
    res.status(200).json(records || []);
  } catch (error) {
    console.error('GET RECORDS ERROR:', error);
    res.status(200).json([]);
  }
};

module.exports = { createRecord, getRecords };