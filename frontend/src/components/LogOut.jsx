import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserLogout() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    
    try {
      // Log the API URL and token for debugging
      console.log('API URL:', import.meta.env.VITE_API_URL);
      console.log('Token exists:', !!token);
      
      // Only call API if we have a token
      if (token) {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.data.success) {
          console.log('Logout successful');
        }
      }
      
      // Always clear stored user data and redirect
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/'); // Redirect to home page
      
    } catch (error) {
      console.error('API URL:', import.meta.env.VITE_API_URL);
      console.error('Logout error:', error);
      console.error('Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      
      // Even if API call fails, clear local data and redirect
      // This ensures user is logged out locally regardless of API response
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Show error briefly but still redirect
      setError('Logged out locally (API error occurred)');
      setTimeout(() => {
        setError(null);
        navigate('/');
      }, 1500);
    }
  };

  return (
    <>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        onClick={handleLogout}
        className="pr-1 py-2 text-md text-white"
      >
        Logout
      </button>
    </>
  );
}

export default UserLogout;