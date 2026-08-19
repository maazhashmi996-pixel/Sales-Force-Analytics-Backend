const mongoose = require('mongoose');

const objectSchemaSchema = new mongoose.Schema({
    tenantId: { type: String, required: true, index: true },
    objectName: { type: String, required: true }, // e.g., 'Lead', 'Deal'
    fields: [{
        fieldName: { type: String, required: true },
        fieldType: { type: String, enum: ['Text', 'Number', 'Dropdown', 'Lookup'], required: true },
        required: { type: Boolean, default: false },
        options: [String] // For dropdown fields
    }]
}, { timestamps: true });

module.exports = mongoose.model('ObjectSchema', objectSchemaSchema);