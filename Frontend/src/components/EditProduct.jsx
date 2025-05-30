import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;
export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image_url: '',

  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${API}/api/products/${id}`);
        setFormData({
          name: res.data.name || '',
          price: res.data.price || '',
          description: res.data.description || '',
          image_url: res.data.image_url || '',
          
        });
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.response?.data?.message || 'Failed to load product');
        if (err.response?.status === 404) {
          navigate('/products', { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: ['price'].includes(name) ? parseFloat(value) || '' : value

    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setError('Product name is required');
      return;
    }
    
    if (!formData.price || isNaN(formData.price)) {
      setError('Please enter a valid price');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await axios.put(`${API}/api/products/${id}`, formData);
      navigate('/products', { state: { message: 'Product updated successfully!' } });
    } catch (err) {
      console.error('Error updating product:', err);
      setError(err.response?.data?.message || 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.name) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading product details...</div>
      </div>
    );
  }

  return (
   
      <div className="relative min-h-screen">
  
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <img
      src="/h1.jpeg"
      alt="Background"
      className="w-full h-full object-cover filter blur-sm" // blur-sm = 4px blur
    />
    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
  

  
  <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
    
  </div>
</div>

      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-90 shadow-xl p-6 rounded-lg w-full max-w-md backdrop-blur-sm"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Edit Product</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Product Name *
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="price">
              Price *
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="image_url">
              Image URL
            </label>
            <input
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="url"
              disabled={loading}
            />
          </div>
          


          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}