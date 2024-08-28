import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-3xl font-bold my-4">Latest Products</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded-lg shadow">
              <img src={product.image} alt={product.name} className="h-40 w-full object-cover"/>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-lg font-bold">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
