import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Option 1: Create a standalone Logout button component
 function UserLogout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call your backend logout API if you have one
      // This step is optional depending on your backend setup
      await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}api/auth/logout`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Clear stored user data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      console.log('Logout successful');
      
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      
      // Even if the API call fails, still clear local storage and redirect
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="pr-1 py-2 text-md text-white   "
    >
      Logout
    </button>
  );
}
export default UserLogout;