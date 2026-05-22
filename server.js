
require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Register routes
const customerRoutes = require('./src/routes/customerRoutes');
const customerTypeRoutes = require('./src/routes/customerTypeRoutes');

app.use('/api/customers', customerRoutes);
app.use('/api/customer-type', customerTypeRoutes);

// Handle root route - serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ success: false, message: err.message });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Website running on http://0.0.0.0:${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

module.exports = app;