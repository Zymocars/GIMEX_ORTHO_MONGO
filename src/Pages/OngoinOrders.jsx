import React from "react";

const OngoingOrders = () => {
  const ongoingOrders = [
    {
      id: "ORD101",
      customer: "Sneha Verma",
      product: "Natural Ortho Powder",
      status: "Processing",
      estimatedDelivery: "2025-04-25",
    },
    {
      id: "ORD102",
      customer: "Ankit Singh",
      product: "Organic Hair Oil",
      status: "Out for Delivery",
      estimatedDelivery: "2025-04-23",
    },
    {
      id: "ORD103",
      customer: "Meena Rathi",
      product: "Ayurvedic Body Lotion",
      status: "Processing",
      estimatedDelivery: "2025-04-26",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Ongoing Orders</h1>

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
            {ongoingOrders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-gray-700 hover:bg-gray-700 transition"
              >
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">{order.product}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      order.status === "Out for Delivery"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">{order.estimatedDelivery}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OngoingOrders;
