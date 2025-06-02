import React, { useState, useEffect } from "react";

const OngoingOrders = () => {
  const [ongoingOrders, setOngoingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOngoingOrders();
  }, []);

  const fetchOngoingOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}api/admin/getallorders?status=ongoing`, {
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
        console.log('Ongoing orders fetched successfully:', data);
        setOngoingOrders(data.data || []);
      } else {
        throw new Error(data.message || 'Failed to fetch ongoing orders');
      }
    } catch (error) {
      console.error('Error fetching ongoing orders:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    // Add 3 days to orderDate as a simple estimation for delivery
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Ongoing Orders</h1>

      {loading ? (
        <div className="text-center py-4">
          <p className="text-white">Loading ongoing orders...</p>
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
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Est. Delivery</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {ongoingOrders.length > 0 ? (
                ongoingOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-t border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="px-6 py-4">{order._id.substring(0, 8)}...</td>
                    <td className="px-6 py-4">{order.deliveryAddress?.name || order.userId?.name || "N/A"}</td>
                    <td className="px-6 py-4">
                      {order.products && order.products.length > 0
                        ? order.products.map(item => item.productId?.name || "Unknown Product").join(", ")
                        : "No products"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium ${
                          order.status === "Shipped"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{formatDate(order.orderDate)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    No ongoing orders found
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

export default OngoingOrders;