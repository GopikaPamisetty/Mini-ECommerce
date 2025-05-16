const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Routes
router.post('/', createProduct);               // Create product
router.get('/', getAllProducts);               // Get all products
router.put('/:id', updateProduct);             // Update product by ID
router.delete('/:id', deleteProduct);
router.get('/:id', getProductById);  // This should handle /api/products/3
module.exports = router;
