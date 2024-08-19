const express = require('express');
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public route - Register a new user
router.route('/').post(registerUser);

// Public route - Authenticate user and get token
router.post('/login', authUser);

// Protected route - Get user profile
router.route('/profile').get(protect, getUserProfile);

// Protected route - Update user profile
router.route('/profile').put(protect, updateUserProfile);

// Admin route - Get all users
router.route('/').get(protect, admin, getUsers);

// Admin route - Delete user by ID
router.route('/:id').delete(protect, admin, deleteUser);

// Admin route - Get user by ID
router.route('/:id').get(protect, admin, getUserById);

// Admin route - Update user by ID
router.route('/:id').put(protect, admin, updateUser);

module.exports = router;
