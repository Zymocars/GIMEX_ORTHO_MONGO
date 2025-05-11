import React, { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}api/admin/getallorders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        console.log('Orders fetched successfully:', data);
        setOrders(data.data || []);
      } else {
        throw new Error(data.message || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate total order amount
  const calculateTotal = (products) => {
    if (!products || products.length === 0) return 0;
    return products.reduce((total, item) => {
      return total + (item.discountedPrice || item.originalPrice) * item.quantity;
    }, 0);
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const OrderDetailsModal = ({ order, onClose }) => {
    if (!order) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Order Details</h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Order Information</h3>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p><span className="text-gray-400">Order ID:</span> {order._id}</p>
                  <p><span className="text-gray-400">Date:</span> {formatDate(order.orderDate)}</p>
                  <p><span className="text-gray-400">Total Amount:</span> ₹{order.totalAmount || calculateTotal(order.products)}</p>
                  <p><span className="text-gray-400">Delivery Fee:</span> ₹{order.deliveryFee || "N/A"}</p>
                  <p><span className="text-gray-400">Coupon:</span> {order.couponCode || "None"}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Customer Information</h3>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p><span className="text-gray-400">Name:</span> {order.deliveryAddress?.name || "N/A"}</p>
                  <p><span className="text-gray-400">Email:</span> {order.deliveryAddress?.email || "N/A"}</p>
                  <p><span className="text-gray-400">Phone:</span> {order.deliveryAddress?.mobile || "N/A"}</p>
                  <p><span className="text-gray-400">Address:</span> {order.deliveryAddress?.address || "N/A"}</p>
                  <p><span className="text-gray-400">City:</span> {order.deliveryAddress?.city || "N/A"}, {order.deliveryAddress?.state || ""} - {order.deliveryAddress?.pincode || ""}</p>
                </div>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Products</h3>
            <div className="bg-gray-700 p-4 rounded-lg overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-600">
                    <th className="pb-2">Product</th>
                    <th className="pb-2">Price</th>
                    <th className="pb-2">Quantity</th>
                    <th className="pb-2">Total</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {order.products && order.products.length > 0 ? (
                    order.products.map((item, index) => (
                      <tr key={index} className="border-b border-gray-600">
                        <td className="py-2">
                          <div className="flex items-center">
                            {item.image && (
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-12 h-12 object-cover mr-3"
                                onError={(e) => { e.target.src = '/images/placeholder.png'; }}
                              />
                            )}
                            <div>
                              <p>{item.name}</p>
                              <p className="text-sm text-gray-400">ID: {item.productId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-2">
                          {item.discountedPrice !== item.originalPrice ? (
                            <div>
                              <p className="line-through text-gray-400">₹{item.originalPrice}</p>
                              <p>₹{item.discountedPrice}</p>
                            </div>
                          ) : (
                            <p>₹{item.originalPrice}</p>
                          )}
                        </td>
                        <td className="py-2">{item.quantity}</td>
                        <td className="py-2">₹{(item.discountedPrice || item.originalPrice) * item.quantity}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-4 text-center">No products found in this order</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Order Details</h1>

      {loading ? (
        <div className="text-center py-4">
          <p className="text-white">Loading orders...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500 text-white p-4 rounded mb-6">
          <p>{error}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
            <thead>
              <tr className="text-left text-gray-300">
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Products</th>
                <th className="px-6 py-3">Amount (₹)</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-t border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="px-6 py-4">{order._id.substring(0, 8)}...</td>
                    <td className="px-6 py-4">{order.deliveryAddress?.name || "N/A"}</td>
                    <td className="px-6 py-4">{formatDate(order.orderDate)}</td>
                    <td className="px-6 py-4">
                      {order.products && order.products.length > 0 
                        ? `${order.products.length} items` 
                        : "No products"}
                    </td>
                    <td className="px-6 py-4">₹{order.totalAmount || calculateTotal(order.products)}</td>
                    <td className="px-6 py-4">
                      <button 
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                        onClick={() => viewOrderDetails(order)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showOrderDetails && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={() => setShowOrderDetails(false)} 
        />
      )}
    </div>
  );
};

export default Orders;