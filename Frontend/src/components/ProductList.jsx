import Navbar from "./Navbar";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_BASE_URL;

export default function ProductList({ refresh }) {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/api/products`);
        console.log("API response:", res.data);
        console.log("API Base URL:", API);

        setProducts(res.data);
        setAllProducts(res.data);
      } catch {
        alert('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [refresh]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setProducts(allProducts);
    } else {
      const filtered = allProducts.filter((p) =>
        (p.name + ' ' + p.description).toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(filtered);
    }
  }, [searchTerm, allProducts]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${API}/api/products/${id}`);
        const updated = allProducts.filter(p => p.id !== id);
        setAllProducts(updated);
        setProducts(updated);
      } catch {
        alert('Failed to delete product');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-20 px-4 max-w-6xl mx-auto">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 p-2 pl-10 rounded w-full focus:outline-none focus:ring focus:border-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-lg animate-pulse">⏳ Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-lg">😕 No products found</p>
            <p className="text-sm mt-1">Try a different keyword or add a new product.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {products.map((p) => (
              <div key={p.id} className="border rounded shadow bg-white flex flex-col h-full">
                {/* Image */}
                <div className="h-48 w-full flex items-center justify-center bg-gray-100 overflow-hidden">
                  {p.image_url ? (
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="text-gray-500">No Image</div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex-grow">
                  <h2 className="font-bold text-lg line-clamp-1">{p.name}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">{p.description}</p>
                  <p className="text-blue-600 font-semibold mt-2">₹{p.price}</p>
                </div>

                {/* Actions */}
                <div className="px-4 pb-4">
                  <div className="flex justify-between">
                    <button
                      onClick={() => navigate(`/edit/${p.id}`)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}