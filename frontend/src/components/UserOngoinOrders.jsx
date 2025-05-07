import React from "react";

const UserOngoingOrders = () => {
  const ongoingOrders = [
    {
      id: "ORD101",
      product: "Natural Ortho Powder",
      status: "Processing",
      estimatedDelivery: "2025-04-25",
    },
    {
      id: "ORD102",
      product: "Organic Hair Oil",
      status: "Out for Delivery",
      estimatedDelivery: "2025-04-23",
    },
    {
      id: "ORD103",
      product: "Ayurvedic Body Lotion",
      status: "Processing",
      estimatedDelivery: "2025-04-26",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-800 border-b border-gray-700">
          <h1 className="text-2xl font-semibold text-white">Ongoing Orders</h1>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-800">
              <tr className="text-left text-gray-300">
                <th className="px-6 py-3 text-sm font-medium">Order ID</th>
                <th className="px-6 py-3 text-sm font-medium">Product</th>
                <th className="px-6 py-3 text-sm font-medium">Status</th>
                <th className="px-6 py-3 text-sm font-medium">Est. Delivery</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ongoingOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-sm text-gray-800">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{order.product}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                        order.status === "Out for Delivery"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{order.estimatedDelivery}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 bg-gray-50">
          <p className="text-sm text-gray-500">Showing {ongoingOrders.length} ongoing orders</p>
        </div>
      </div>
    </div>
  );
};

export default UserOngoingOrders;