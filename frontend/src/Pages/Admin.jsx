import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Components/Sidebar"; // Adjust the import path as needed

const AdminRoute = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        // Get user info from localStorage
        const user = JSON.parse(localStorage.getItem("user") || '{}');
        const token = localStorage.getItem("token");
        
        // Basic validation
        if (!user || !token) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Check if user is admin
        if (user.isAdmin === true) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }

        // Optional: Verify token with backend for extra security
        // This helps prevent token tampering or using expired tokens
        try {
          const response = await fetch('http://localhost:5000/api/auth/verify-admin', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (!response.ok) {
            // Token invalid or expired
            setIsAuthenticated(false);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          }
        } catch (err) {
          console.error("Token verification error:", err);
          // If API is unavailable, we'll rely on the client-side check
        }
      } catch (error) {
        console.error("Authentication check error:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // If not authenticated as admin, redirect to admin login page
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If authenticated as admin, render the admin layout with outlet
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content area */}
      <div className="flex-1 p-6 ml-0">
        <div className="container mx-auto">
          {/* This is where your admin pages will be rendered */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminRoute;