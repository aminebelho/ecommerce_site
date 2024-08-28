import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

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
          {userInfo ? (
            <>
              <Link to="/profile" className="px-4">
                {userInfo.name}
              </Link>
              <button onClick={logoutHandler} className="px-4">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="px-4">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
