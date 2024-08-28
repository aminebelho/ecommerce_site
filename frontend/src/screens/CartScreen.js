import React from 'react';
import { useSelector } from 'react-redux';

const CartScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <div>
      <h1 className="text-3xl font-bold my-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.product} className="grid grid-cols-3 gap-4 p-4 bg-white shadow-md rounded-lg mb-4">
              <img src={item.image} alt={item.name} className="h-24 w-24 object-cover"/>
              <div>
                <h3 className="text-xl">{item.name}</h3>
                <p>${item.price}</p>
              </div>
              <div>
                <p>Quantity: {item.qty}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartScreen;
