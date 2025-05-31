const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// Routes
router.post('/', createProduct);               
router.get('/', getAllProducts);               
router.put('/:id', updateProduct);             
router.delete('/:id', deleteProduct);
router.get('/:id', getProductById);  
module.exports = router;
