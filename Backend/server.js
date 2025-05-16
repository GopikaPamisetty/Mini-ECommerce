// // server.js or index.js
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const pool = require('./db'); // import the pool

// const { OpenAI } = require('openai');

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// // Add this before your routes
// // Debugging middleware - add this first
// app.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//   next();
// });
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // Then your existing middleware
// app.use(cors());
// app.use(express.json());

// // Then your routes
// app.use('/api/products', productRoutes);

// // Add a catch-all route for debugging
// app.use((req, res) => {
//   console.log('Request reached catch-all - no route matched');
//   res.status(404).json({ 
//     error: 'Route not found',
//     attemptedPath: req.path,
//     availableRoutes: ['/api/products', '/api/products/:id'] 
//   });
// });
// // ✅ Test PostgreSQL connection once
// pool.connect()
//   .then(() => console.log("Connected to PostgreSQL ✅"))
//   .catch((err) => console.error("Connection error ❌", err));

// app.use('/api/products', productRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

// Middleware - must come before routes
app.use(cors());
app.use(express.json());

// Debug middleware to log all incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Import routes
const productRoutes = require('./routes/productRoutes');

// Mount routes - THIS IS THE CRITICAL FIX
app.use('/api/products', productRoutes);

// Enhanced error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Database connection
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ PostgreSQL connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));