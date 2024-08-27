import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-4" />
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="mt-2 text-gray-700">${product.price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
