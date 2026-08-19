const mongoose = require('mongoose');

const dynamicRecordSchema = new mongoose.Schema({
    tenantId: { type: String, required: true, index: true },
    objectName: { type: String, required: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('DynamicRecord', dynamicRecordSchema);