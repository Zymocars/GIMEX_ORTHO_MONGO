import React from "react";

const Orders = () => {
  // Dummy order data
  const orders = [
    {
      id: "ORD001",
      customer: "Rahul Kumar",
      product: "Natural Ortho Powder",
      date: "2025-04-20",
      status: "Pending",
      amount: 249,
    },
    {
      id: "ORD002",
      customer: "Priya Sharma",
      product: "Organic Hair Oil",
      date: "2025-04-21",
      status: "Shipped",
      amount: 199,
    },
    {
      id: "ORD003",
      customer: "Amit Joshi",
      product: "Herbal Tea Pack",
      date: "2025-04-22",
      status: "Delivered",
      amount: 349,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Order Details</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead>
            <tr className="text-left text-gray-300">
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Amount (₹)</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-gray-700 hover:bg-gray-700 transition"
              >
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">{order.product}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">₹{order.amount}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-500"
                        : order.status === "Shipped"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
