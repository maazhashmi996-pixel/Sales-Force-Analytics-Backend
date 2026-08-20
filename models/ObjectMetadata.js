const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
  fieldName: { type: String, required: true },
  fieldType: { type: String, enum: ['Text', 'Number', 'Dropdown', 'Formula', 'Lookup'], required: true },
  required: { type: Boolean, default: false },
  options: [String] // For dropdowns
});

const objectMetadataSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  objectName: { type: String, required: true }, // e.g., 'Lead', 'Deal'
  fields: [fieldSchema]
}, { timestamps: true });

module.exports = mongoose.model('ObjectMetadata', objectMetadataSchema);