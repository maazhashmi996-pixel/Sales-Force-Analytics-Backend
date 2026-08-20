const auditLog = (action, userId, tenantId, details) => {
  const timestamp = new Date().toISOString();
  console.log(`[AUDIT] [${timestamp}] Tenant: ${tenantId} | User: ${userId} | Action: ${action} | Details:`, details);
};

module.exports = { auditLog };