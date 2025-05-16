import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white bg-opacity-90 backdrop-blur-md shadow-md fixed top-0 left-0 right-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600">
              Mini Commerce
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/submit" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Product Submission
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600 font-medium transition">
              My Products
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;