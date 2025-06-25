import React, { useState, useEffect, useMemo } from "react";

const UserOrders = () => {
  const [state, setState] = useState({
    orders: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchOrders = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token not found. Please log in.");
        }

        const apiUrl = `${import.meta.env.VITE_REACT_APP_API_URL}api/user/getorders`;
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        if (response.status === 401) {
          localStorage.removeItem("token");
          throw new Error("Session expired. Please log in again.");
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success && isMounted) {
          setState((prev) => ({
            ...prev,
            orders: data.data || [],
            loading: false,
          }));
        } else if (isMounted) {
          throw new Error(data.message || "Failed to fetch orders");
        }
      } catch (error) {
        if (error.name === "AbortError") return;
        if (isMounted) {
          setState((prev) => ({
            ...prev,
            error: error.message,
            loading: false,
          }));
          if (error.message.includes("token") || error.message.includes("Session")) {
            window.location.href = "/login";
          }
        }
      }
    };

    fetchOrders();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateTotal = useMemo(() => {
    return (products) => {
      if (!products || products.length === 0) return 0;
      return products.reduce(
        (total, item) =>
          total + (item.discountedPrice || item.originalPrice) * item.quantity,
        0
      );
    };
  }, []);

  const { orders, loading, error } = state;

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
                    <td className="px-6 py-4">{order._id.slice(0, 8)}...</td>
                    <td className="px-6 py-4">
                      {order.deliveryAddress?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4">{formatDate(order.orderDate)}</td>
                    <td className="px-6 py-4">
                      {order.products?.length > 0
                        ? `${order.products.length} items`
                        : "No products"}
                    </td>
                    <td className="px-6 py-4">
                      ₹{order.totalAmount || calculateTotal(order.products)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                        onClick={() => {
                          /* View details functionality */
                        }}
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

export default UserOrders;