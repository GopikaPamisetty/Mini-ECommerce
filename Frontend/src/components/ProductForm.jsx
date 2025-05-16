// // src/components/ProductForm.jsx
// import { useState } from 'react';
// import axios from 'axios';

// export default function ProductForm({ onProductAdded }) {
//   const [formData, setFormData] = useState({
//     name: '',
//     price: '',
//     description: '',
//     image_url: '',
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/products', formData);
//       onProductAdded(); // refresh list
//       setFormData({ name: '', price: '', description: '', image_url: '' });
//     } catch (error) {
//       alert('Failed to add product');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-4">
//       <input name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="w-full p-2 border rounded" required />
//       <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" type="number" className="w-full p-2 border rounded" required />
//       <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />
//       <input name="image_url" value={formData.image_url} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" />
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit Product</button>
//     </form>
//   );
// }



import { useState } from 'react';
import axios from 'axios';

export default function ProductForm({ onProductAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image_url: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', formData);
      onProductAdded(); // refresh list
      setFormData({ name: '', price: '', description: '', image_url: '' });
    } catch (error) {
      alert('Failed to add product');
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/h1.jpeg"
          alt="Background"
          className="w-full h-full object-cover filter blur-md"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-md w-full"
      >
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
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
}