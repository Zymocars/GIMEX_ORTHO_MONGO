import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [isReadMore, setIsReadMore] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { productId } = useParams();
  
  // API URL - same as your admin component
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL?.replace(/\/$/, '');

  // Default fallback product data (your current hardcoded data)
  const defaultProduct = {
    _id: 'default',
    name: 'GIMEX Ortho Plus',
    price: 44,
    originalPrice: 49,
    discount: 10,
    reviews: 42,
    description: 'Health Booster for bone strength and joint mobility',
    image: '/images/Gimex_1.png',
    stock: 100,
    category: 'Health'
  };

  // Fetch single product data
  const fetchProduct = async () => {
    try {
      setLoading(true);
      
      if (!productId) {
        setError("No product ID provided");
        return;
      }

      // Log the request details
      console.log('Fetching product:', productId);
      
      // Construct the URL properly
      const url = `${API_URL}/api/products/${productId}`;
      console.log('Full API URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        console.error('API Error:', response.status);
        // Try to get error details from response
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Product not found (${response.status})`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      if (data.success && data.data) {
        setProduct(data.data);
      } else {
        // If no product found, use default product
        setProduct(defaultProduct);
        console.log('Using default product data');
      }
    } catch (err) {
      console.error('Error:', err);
      // Use default product as fallback
      setProduct(defaultProduct);
      setError(`${err.message} - Using default product data`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch product on component mount
  useEffect(() => {
    fetchProduct();
  }, [productId, API_URL]); // Add API_URL as dependency

  const handleCart = () => {
    navigate("/Cart_Page");
  };

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Calculate discount percentage and original price if not provided
  const calculatePricing = (currentPrice) => {
    const originalPrice = Math.round(currentPrice * 1.11); // Assuming ~10% discount
    const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    return { originalPrice, discount };
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm md:text-base">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white p-4">
        <div className="text-center w-full">
          <p className="text-red-600 mb-4 text-sm md:text-base">
            {error || "Product not found"}
          </p>
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm md:text-base"
            >
              Try Again
            </button>
            <button 
              onClick={() => navigate('/')}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm md:text-base"
            >
              Go Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { originalPrice, discount } = product.originalPrice 
    ? { originalPrice: product.originalPrice, discount: product.discount || 0 }
    : calculatePricing(product.price);

  return (
    <div className="w-full min-h-screen py-6 bg-white">
      <div className="max-w-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Left side - Product Image */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0 flex">
            <img
              src={product.image || "/images/Gimex_1.png"}
              alt={product.name}
              className="w-full h-auto object-contain max-h-[500px]"
              onError={(e) => {
                e.target.src = "/images/Gimex_1.png"; // Fallback image
              }}
            />
          </div>

          {/* Right side - Product Details */}
          <div className="w-full md:w-1/2">
            {/* Product Title */}
            <h1 className="text-2xl md:text-3xl font-bold mb-3">
              {product.name}
            </h1>

            {/* Pricing - Now Dynamic */}
            <div className="flex items-center mb-3">
              <span className="text-xl font-bold">₹{Number(product.price).toFixed(0)}</span>
              {originalPrice > product.price && (
                <>
                  <span className="text-gray-500 line-through mx-2">₹{originalPrice}</span>
                  <span className="text-red-600 font-medium">{discount}% Off</span>
                </>
              )}
            </div>

            {/* Reviews */}
            <div className="mb-6">
              <span className="text-gray-600">({product.reviews || 0} reviews)</span>
            </div>

            {/* Stock Status - Only show if stock info is available */}
            {product.stock !== undefined && (
              <div className="mb-4">
                {product.stock > 0 ? (
                  <span className="text-green-600">In Stock</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>
            )}

            {/* Side by side equal width buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Go to Cart */}
              <div className="w-full sm:w-1/2">
                <button
                  onClick={handleCart}
                  disabled={product.stock === 0}
                  className={`w-full border py-3 px-4 text-center rounded transition-colors ${
                    product.stock === 0 
                      ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Go to Cart'}
                </button>
              </div>

              {/* Quantity selector */}
              <div className="w-full sm:w-1/2">
                <div className="flex items-center justify-between border border-gray-300 rounded-full h-14">
                  <button
                    onClick={decreaseQuantity}
                    disabled={product.stock === 0}
                    className={`w-12 h-full flex items-center justify-center font-bold ${
                      product.stock === 0 ? 'text-gray-400' : 'text-black'
                    }`}
                  >
                    −
                  </button>
                  <div className="flex-1 text-center">{quantity}</div>
                  <button
                    onClick={increaseQuantity}
                    disabled={product.stock === 0 || (product.stock && quantity >= product.stock)}
                    className={`w-12 h-full flex items-center justify-center font-bold ${
                      product.stock === 0 || (product.stock && quantity >= product.stock) ? 'text-gray-400' : 'text-black'
                    }`}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div>
              <h2 className="text-xl font-bold mb-2">Product Description</h2>
              {product.description && (
                <p className="mb-3 text-gray-700">{product.description}</p>
              )}
              <h3 className="font-medium mb-3">Uses</h3>

              <ul className="space-y-2">
                <li>It helps to make bone strong.</li>
                <li>It helps to reduce rigidity of bones.</li>
                <li>It helps to reduce pain in arthritics.</li>
                <li>To reduce pain in backbone</li>
                <li>To reduce pain in neck</li>
                {isReadMore && (
                  <>
                    <li>Helps in joint mobility</li>
                    <li>Supports healthy cartilage</li>
                    <li>Reduces inflammation in joints</li>
                  </>
                )}
                <li>
                  <a
                    href="#!"
                    onClick={toggleReadMore}
                    className="text-green-500 hover:underline"
                  >
                    {isReadMore ? "Read Less" : "Read More"}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}