const asyncHandler = require('express-async-handler');
const Product = require('../models/product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    user: req.user._id,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    numReviews: 0, 
    description: req.body.description,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
  
    if (product) {
      // Update only the attributes that are provided in the request body
      if (req.body.name) product.name = req.body.name;
      if (req.body.price) product.price = req.body.price;
      if (req.body.description) product.description = req.body.description;
      if (req.body.image) product.image = req.body.image;
      if (req.body.brand) product.brand = req.body.brand;
      if (req.body.category) product.category = req.body.category;
      if (req.body.countInStock) product.countInStock = req.body.countInStock;
  
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  });
// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (product) {
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
  
    const product = await Product.findById(req.params.id);
  
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
  
      if (alreadyReviewed) {
        // Update existing review
        if (rating) alreadyReviewed.rating = Number(rating);
        if (comment) alreadyReviewed.comment = comment;
  
        // Recalculate rating
        product.rating =
          product.reviews.reduce((acc, item) => acc + item.rating, 0) /
          product.reviews.length;
  
        await product.save();
        res.status(200).json({ message: 'Review updated' });
      } else {
        // Create new review
        const review = {
          name: req.user.name,
          rating: rating ? Number(rating) : 0,
          comment: comment ? comment : undefined,
          user: req.user._id,
        };
  
        if (review.rating || review.comment) {
          product.reviews.push(review);
          product.numReviews = product.reviews.length;
          product.rating =
            product.reviews.reduce((acc, item) => acc + item.rating, 0) /
            product.reviews.length;
  
          await product.save();
          res.status(201).json({ message: 'Review added' });
        } else {
          res.status(400);
          throw new Error('Please provide at least rating or comment');
        }
      }
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  });

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
};
