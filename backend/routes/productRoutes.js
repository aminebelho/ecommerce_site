const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.route('/').get(getProducts); // Get all products
router.get('/top', getTopProducts); // Get top rated products

router.route('/:id').get(getProductById); // Get a single product by ID

// Protected routes
router.route('/:id/reviews').post(protect, createProductReview); // Create a product review

// Admin routes
router.route('/').post(protect, admin, createProduct); // Create a new product
router.route('/:id')
  .put(protect, admin, updateProduct) // Update a product by ID
  .delete(protect, admin, deleteProduct); // Delete a product by ID

module.exports = router;
