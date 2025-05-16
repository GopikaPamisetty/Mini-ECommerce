import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx"; // Adjust path based on your folder structure

const HomePage = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />

      {/* Background Image */}
      <div className="absolute inset-0 hidden md:block">
        <img
          src="/n2.jpeg"  alt="E-commerce Background"
          className="w-full h-full object-cover filter blur-sm"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4 pt-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Mini Commerce</h1>
        <p className="text-lg md:text-2xl mb-8 text-center max-w-2xl">
          Discover and submit products with ease. Start your e-commerce journey today.
        </p>
        <div className="space-x-4">
          <Link
            to="/submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg"
          >
            Submit a Product
          </Link>
          <Link
            to="/products"
            className="bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded-md text-lg"
          >
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;