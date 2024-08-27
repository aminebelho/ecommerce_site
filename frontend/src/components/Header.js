import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          MyShop
        </Link>
        <div>
          <Link to="/cart" className="px-4">
            Cart
          </Link>
          <Link to="/login" className="px-4">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
