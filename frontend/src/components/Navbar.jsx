import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = "isn";

  return (
    <nav className="bg-blue-600 py-4 px-6 flex items-center justify-between">
      <Link to="/" className="flex items-center">
        <span className="text-2xl font-bold text-white ">SALESBLINK</span>
      </Link>
              
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-white font-bold bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-white font-bold bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;