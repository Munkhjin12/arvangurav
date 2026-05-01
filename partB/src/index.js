/**
 * Personal Task Tracker — Entry Point
 * F.CSM311 Бие даалт 13
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const taskRoutes = require('./routes/tasks');
const tagRoutes = require('./routes/tags');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { migrate } = require('./db/migrate');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/tags', tagRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Task Tracker API ажиллаж байна 🚀', version: '1.0.0' });
});

// 404 + Error handlers
app.use(notFound);
app.use(errorHandler);

// Server эхлүүлэх
if (require.main === module) {
  migrate(); // DB байхгүй бол үүсгэх
  app.listen(PORT, () => {
    console.log(`✅ Server: http://localhost:${PORT}`);
    console.log(`📋 API docs: http://localhost:${PORT}/api-docs`);
  });
}

module.exports = app;
