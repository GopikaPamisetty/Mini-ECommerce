import Navbar from "./Navbar"
import { useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;
export default function ProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image_url: '',
    
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // show loading
  
    try {
      const response = await axios.post(`${API}/api/products`, formData);
      setSuccessMessage('Product added successfully! 🎉');
      setFormData({ name: '', price: '', description: '', image_url: '' });
  
      setTimeout(() => setSuccessMessage(''), 10000);
    } catch (error) {
      console.log('Failed:', error.response || error.message);
      alert('Failed to add product');
    } finally {
      setIsSubmitting(false); // hide loading
    }
  };
  
  return (
    <>
    <Navbar />
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center px-4 pt-20">
      <div className="absolute inset-0">
        <img
          src="/h1.jpeg"
          alt="Background"
          className="w-full h-full object-cover filter blur-md"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-md w-full"
      >
        {successMessage && (
          <div className="mb-4 text-green-600 font-semibold">{successMessage}</div>
        )}
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 border border-gray-300 rounded mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        <input
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <button
          type="submit"
          className={`w-full py-3 rounded transition ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting Product...' : 'Submit Product'}
        </button>

      </form>
    </div>
    </>
  );
}