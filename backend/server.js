const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config(); // Load environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI , {
}).then(() => console.log('MongoDB Connected'))
  .catch((error) => console.error('MongoDB connection failed:', error.message));

const app = express();
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);


// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
