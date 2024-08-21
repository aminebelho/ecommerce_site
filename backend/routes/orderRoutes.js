const express = require('express');
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected routes
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders); // Add order, get all orders (admin)
router.route('/myorders').get(protect, getMyOrders); // Get logged-in user's orders
router.route('/:id').get(protect, getOrderById); // Get order by ID
router.route('/:id/pay').put(protect, updateOrderToPaid); // Update order to paid
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered); // Update order to delivered (admin)

module.exports = router;
