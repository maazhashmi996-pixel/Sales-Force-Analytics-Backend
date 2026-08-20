const User = require('../models/User');
const Tenant = require('../models/Tenant');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { companyName, subdomain, name, email, password } = req.body;
    
    let tenant = await Tenant.findOne({ subdomain });
    if (tenant) return res.status(400).json({ error: 'Subdomain already exists' });

    tenant = await Tenant.create({ name: companyName, subdomain });

    const adminRole = await Role.create({
      tenantId: tenant._id,
      name: 'Admin',
      permissions: {
        Leads: { create: true, read: true, edit: true, delete: true, transfer: true },
        Deals: { create: true, read: true, edit: true, delete: true, transfer: true },
        Accounts: { create: true, read: true, edit: true, delete: true, transfer: true }
      }
    });

    const user = await User.create({
      tenantId: tenant._id,
      name,
      email,
      password,
      roleId: adminRole._id
    });

    res.status(201).json({ message: 'Tenant and Admin created successfully', userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, tenantId: user.tenantId, roleId: user.roleId },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };