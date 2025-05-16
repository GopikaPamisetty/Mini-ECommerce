// src/App.jsx
import { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import EditProductPage from './components/EditProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/submit" element={<ProductForm />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/edit/:id" element={<EditProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;