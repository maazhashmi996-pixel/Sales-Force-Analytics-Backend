const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const connectDB = require('./config/db');
require('./queues/workflow.worker'); // Initialize BullMQ worker

const authRoutes = require('./routes/auth.routes');
const metadataRoutes = require('./routes/metadata.routes');
const recordRoutes = require('./routes/record.routes');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

// Connect Database
connectDB();

// Routes Mounting
app.use('/api/auth', authRoutes);
app.use('/api/metadata', metadataRoutes);
app.use('/api/records', recordRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Enterprise CRM Backend Engine running on port ${PORT}`);
});