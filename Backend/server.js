

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
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection failed");
  }
});
// Database connection
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ PostgreSQL connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));