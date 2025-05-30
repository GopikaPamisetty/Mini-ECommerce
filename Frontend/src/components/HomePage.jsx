import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";

const HomePage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navbar />

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/n2.jpeg"
          alt="E-commerce Background"
          className="w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center text-white">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Welcome to Mini Commerce
        </h1>
        <p className="text-base sm:text-lg md:text-2xl mb-6 max-w-xl">
          Discover and submit products with ease. Start your e-commerce journey today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg transition"
          >
            Submit a Product
          </Link>
          <Link
            to="/products"
            className="bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded-md text-lg transition"
          >
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;