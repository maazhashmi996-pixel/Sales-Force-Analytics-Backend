const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subdomain: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
  plan: { type: String, enum: ['Free', 'Pro', 'Enterprise'], default: 'Enterprise' }
}, { timestamps: true });

module.exports = mongoose.model('Tenant', tenantSchema);