const Role = require('../models/Role');

const checkPermission = (moduleName, action) => {
  return async (req, res, next) => {
    try {
      const role = await Role.findById(req.user.roleId);
      if (!role || !role.permissions[moduleName] || !role.permissions[moduleName][action]) {
        return res.status(403).json({ error: `Access Denied: You do not have '${action}' rights on '${moduleName}'` });
      }
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

module.exports = { checkPermission };