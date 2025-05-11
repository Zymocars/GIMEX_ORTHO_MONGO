import React, { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}api/admin/getallorders` , {
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
                        onClick={() => {/* View details functionality */}}
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
    </div>
  );
};

export default Orders;