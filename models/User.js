const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tenantId: { type: String, required: true, index: true },
    role: { 
        type: String, 
        enum: ['Admin', 'Sales Manager', 'Sales Rep'], 
        default: 'Sales Rep' 
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);