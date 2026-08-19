const tenantMiddleware = (req, res, next) => {
    const tenantId = req.headers['x-tenant-id'] || (req.user && req.user.tenantId);
    
    if (!tenantId) {
        return res.status(400).json({ error: 'Tenant ID is missing or unauthorized' });
    }
    
    req.tenantId = tenantId;
    next();
};

module.exports = tenantMiddleware;