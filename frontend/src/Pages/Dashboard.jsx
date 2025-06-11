import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    ongoingOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isRefreshing = useRef(false); // Prevent multiple refresh attempts
  const refreshAttempts = useRef(0); // Track refresh attempts
  const maxRefreshAttempts = 2; // Limit refresh retries

  // Function to refresh the access token
  const refreshToken = async () => {
    if (isRefreshing.current) {
      console.log('Refresh already in progress, skipping');
      return null;
    }
    if (refreshAttempts.current >= maxRefreshAttempts) {
      console.error('Max refresh attempts reached');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      navigate('/login');
      return null;
    }

    isRefreshing.current = true;
    refreshAttempts.current += 1;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001/zymo-prod/us-central1/orthoAPI';
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token found');
      }
      console.log('Attempting to refresh token');
      const response = await fetch(`${apiUrl}/api/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
      if (!response.ok) {
        throw new Error(`Refresh failed: ${await response.text()}`);
      }
      const { token } = await response.json();
      localStorage.setItem('token', token);
      console.log('Token refreshed successfully');
      return token;
    } catch (err) {
      console.error('Token refresh failed:', err.message);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      navigate('/login');
      return null;
    } finally {
      isRefreshing.current = false;
    }
  };

  // Function to fetch dashboard statistics
  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      console.log('Token from localStorage:', token);
      if (!token) {
        console.error('No authentication token found');
        navigate('/login');
        return;
      }
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001/zymo-prod/us-central1/orthoAPI';
      const endpoint = `${apiUrl}/api/dashboard/stats`;
      console.log('Fetching from:', endpoint);
      let response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        redirect: 'error',
      });
      console.log('Response status:', response.status);
      if (response.status === 401) {
        console.warn('Unauthorized - attempting to refresh token');
        const newToken = await refreshToken();
        if (newToken) {
          response = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${newToken}`,
            },
          });
        } else {
          console.error('Unable to refresh token');
          navigate('/login');
          return;
        }
      }
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
      console.log('Response JSON:', result);
      if (result.success) {
        setStats(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch dashboard stats');
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err.message);
      setError(err.message);
      if (err.message.includes('No authentication token found') || err.message.includes('Unable to refresh token')) {
        navigate('/login');
      }
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
            onClick={() => {
              refreshAttempts.current = 0; // Reset refresh attempts
              fetchDashboardStats();
            }}
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
        <Link to={"/admin/products"} className="no-underline">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 transition-colors">
            <h2 className="text-xl text-gray-300">Total Products</h2>
            <p className="text-3xl font-bold text-white">{stats.totalProducts}</p>
          </div>
        </Link>
        <Link to={"/admin/orders"} className="no-underline">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 transition-colors">
            <h2 className="text-xl text-gray-300">Total Orders</h2>
            <p className="text-3xl font-bold text-white">{stats.totalOrders}</p>
          </div>
        </Link>
        <Link to={"/admin/users"} className="no-underline">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 transition-colors">
            <h2 className="text-xl text-gray-300">Total Users</h2>
            <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
          </div>
        </Link>
        <Link to="/admin/ongoing-orders?status=ongoing" className="no-underline">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 transition-colors">
            <h2 className="text-xl text-gray-300">Ongoing Orders</h2>
            <p className="text-3xl font-bold text-white">{stats.ongoingOrders}</p>
          </div>
        </Link>
      </div>
      <div className="mt-6">
        <button
          onClick={() => {
            refreshAttempts.current = 0; // Reset refresh attempts
            fetchDashboardStats();
          }}
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