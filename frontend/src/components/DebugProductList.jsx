import React, { useState, useEffect } from 'react';

export default function DebugProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = `${import.meta.env.VITE_REACT_APP_API_URL}api`;

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        console.log("Fetching all products from:", `${API_URL}/products`);
        
        const response = await fetch(`${API_URL}/products`);
        console.log("Response status:", response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("All products response:", data);
        
        if (data.success && data.data) {
          setProducts(data.data);
        } else if (Array.isArray(data)) {
          // Some APIs return array directly
          setProducts(data);
        } else {
          setError("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  if (loading) {
    return <div className="p-4">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700">
        <h3 className="font-bold">Error loading products:</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Debug: All Products in Database</h2>
      <p className="mb-4 text-gray-600">
        API URL: <code className="bg-gray-100 px-2 py-1 rounded">{API_URL}/products</code>
      </p>
      
      {products.length === 0 ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded">
          <p><strong>No products found in database!</strong></p>
          <p>Make sure you have added products through your admin panel.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-green-600 font-medium">
            Found {products.length} product(s) in database:
          </p>
          
          {products.map((product) => (
            <div key={product._id} className="border border-gray-300 rounded p-4 bg-gray-50">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm">
                <p><strong>ID:</strong> <code className="bg-white px-2 py-1 rounded">{product._id}</code></p>
                <p><strong>Price:</strong> ₹{product.price}</p>
                <p><strong>Stock:</strong> {product.stock || 'N/A'}</p>
                <p><strong>Category:</strong> {product.category || 'N/A'}</p>
              </div>
              <div className="mt-2">
                <strong>Description:</strong> {product.description || 'No description'}
              </div>
              <div className="mt-2">
                <strong>Product URL:</strong> 
                <code className="bg-white px-2 py-1 rounded ml-2">
                  /products/{product._id}
                </code>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-6 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
        <h4 className="font-bold">How to test a product:</h4>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>Copy one of the Product IDs above</li>
          <li>Navigate to: <code>/products/[PRODUCT_ID]</code></li>
          <li>Example: <code>/products/680f321607f524c7a228170c</code></li>
        </ol>
      </div>
    </div>
  );
}