const attachTenantScope = (req, res, next) => {
  if (req.user && req.user.tenantId) {
    req.tenantFilter = { tenantId: req.user.tenantId };
  } else {
    return res.status(403).json({ error: 'Tenant context missing' });
  }
  next();
};

module.exports = { attachTenantScope };