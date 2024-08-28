import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <div>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg"/>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-xl my-4">${product.price}</p>
            <p className="text-md">{product.description}</p>
            <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">Add to Cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
