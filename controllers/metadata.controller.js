const ObjectMetadata = require('../models/ObjectMetadata');

const upsertMetadata = async (req, res) => {
  try {
    const { objectName, fields } = req.body;
    let metadata = await ObjectMetadata.findOne({ tenantId: req.user.tenantId, objectName });

    if (metadata) {
      metadata.fields = fields;
      await metadata.save();
    } else {
      metadata = await ObjectMetadata.create({
        tenantId: req.user.tenantId,
        objectName,
        fields
      });
    }

    res.status(200).json({ message: 'Metadata schema saved', metadata });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMetadata = async (req, res) => {
  try {
    const { objectName } = req.params;
    const metadata = await ObjectMetadata.findOne({ tenantId: req.user.tenantId, objectName });
    if (!metadata) return res.status(404).json({ error: 'Metadata not found' });
    res.status(200).json(metadata);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { upsertMetadata, getMetadata };