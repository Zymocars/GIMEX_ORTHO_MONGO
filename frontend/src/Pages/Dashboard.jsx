import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    ongoingOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch dashboard statistics
 const fetchDashboardStats = async () => {
  try {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (!token) {
      throw new Error('No authentication token found');
    }
    const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001/zymo-prod/us-central1/orthoAPI';
    console.log('Fetching from:', `${apiUrl}/api/dashboard/stats`);
    const response = await fetch(`${apiUrl}/api/dashboard/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      redirect: 'error',
    });
    console.log('Response status:', response.status);
    console.log('Content-Type:', response.headers.get('content-type'));
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Body: ${text.slice(0, 100)}...`);
    }
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Expected JSON, got: ${text.slice(0, 100)}...`);
    }
    const result = await response.json();
    console.log('Response JSON:', result); // Log parsed JSON instead of raw body
    if (result.success) {
      setStats(result.data);
    } else {
      throw new Error(result.message || 'Failed to fetch dashboard stats');
    }
  } catch (err) {
    setError(err.message);
    console.error('Error fetching dashboard stats:', err);
  } finally {
    setLoading(false);
  }
};

  // Fetch data when component mounts
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-gray-700 p-6 rounded-lg shadow-lg animate-pulse">
              <div className="h-6 bg-gray-600 rounded mb-2"></div>
              <div className="h-8 bg-gray-600 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error loading dashboard data: {error}</p>
          <button 
            onClick={fetchDashboardStats}
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Products Card */}
        <Link to={"/admin/products"} className="no-underline">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 transition-colors">
            <h2 className="text-xl text-gray-300">Total Products</h2>
            <p className="text-3xl font-bold text-white">{stats.totalProducts}</p>
          </div>
        </Link>
        
        {/* Total Orders Card */}
        <Link to={"/admin/orders"} className="no-underline">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 transition-colors">
            <h2 className="text-xl text-gray-300">Total Orders</h2>
            <p className="text-3xl font-bold text-white">{stats.totalOrders}</p>
          </div>
        </Link>

        {/* Total Users Card */}
        <Link to={"/admin/users"} className="no-underline">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 transition-colors">
            <h2 className="text-xl text-gray-300">Total Users</h2>
            <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
          </div>
        </Link>

        {/* Ongoing Orders Card */}
        <Link to="/admin/ongoing-orders?status=ongoing">
  <div className="bg-gray-700 p-4 rounded-lg">
    <h3 className="text-lg font-semibold text-gray-300">Ongoing Orders</h3>
    <p className="text-2xl text-white">{stats.ongoingOrders}</p>
  </div>
</Link>
      </div>

      {/* Refresh Button */}
      <div className="mt-6">
        <button 
          onClick={fetchDashboardStats}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;