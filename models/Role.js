const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  name: { type: String, required: true }, // e.g., 'Admin', 'Sales Rep'
  permissions: {
    Leads: { create: Boolean, read: Boolean, edit: Boolean, delete: Boolean, transfer: Boolean },
    Deals: { create: Boolean, read: Boolean, edit: Boolean, delete: Boolean, transfer: Boolean },
    Accounts: { create: Boolean, read: Boolean, edit: Boolean, delete: Boolean, transfer: Boolean }
  }
}, { timestamps: true });

module.exports = mongoose.model('Role', roleSchema);