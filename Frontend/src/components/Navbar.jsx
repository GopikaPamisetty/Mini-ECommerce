import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white bg-opacity-90 backdrop-blur-md shadow-md fixed top-0 left-0 right-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-gray-800 hover:text-blue-600"
            >
              Mini Commerce
            </Link>
          </div>

          
          <div className="hidden md:flex space-x-6">
            <Link
              to="/submit"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Product Submission
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              My Products
            </Link>
          </div>

          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

     
      {isOpen && (
        <div className="md:hidden bg-white bg-opacity-95 shadow-md px-4 py-4 space-y-4 transition-all duration-300">
          <Link
            to="/submit"
            className="block text-gray-700 hover:text-blue-600 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Product Submission
          </Link>
          <Link
            to="/products"
            className="block text-gray-700 hover:text-blue-600 font-medium"
            onClick={() => setIsOpen(false)}
          >
            My Products
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;