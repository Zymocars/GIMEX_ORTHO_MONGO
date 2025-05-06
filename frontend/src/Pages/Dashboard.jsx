import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Example data (you can replace this with actual data fetched from the backend)
  const stats = {
    totalProducts: 120,
    totalOrders: 45,
    totalUsers: 300,
    ongoingOrders: 12,
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Products Card */}
        <Link to={"/admin/products"} className="no-underline">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl text-gray-300">Total Products</h2>
            <p className="text-3xl font-bold text-white">{stats.totalProducts}</p>
          </div>
        </Link>
        
        {/* Total Orders Card */}
        <Link to={"/admin/orders"} className="no-underline">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl text-gray-300">Total Orders</h2>
            <p className="text-3xl font-bold text-white">{stats.totalOrders}</p>
          </div>
        </Link>

        {/* Total Users Card */}
        <Link to={"/admin/users"} className="no-underline">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl text-gray-300">Total Users</h2>
            <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
          </div>
        </Link>

        {/* Ongoing Orders Card */}
        <Link to={"/admin/ongoing-orders"} className="no-underline">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl text-gray-300">Ongoing Orders</h2>
            <p className="text-3xl font-bold text-white">{stats.ongoingOrders}</p>
          </div>
        </Link>
      </div>

      {/* Additional Section for Analytics or Details (optional) */}
      {/* <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
        <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
          <p className="text-gray-300">You can display recent activities here like new orders, user registrations, etc.</p>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
