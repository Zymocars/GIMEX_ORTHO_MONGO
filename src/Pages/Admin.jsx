import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Sidebar from "../Components/Sidebar"; // Adjust the import path as needed

// This component will check if the user is authenticated as an admin
// and either show the admin content or redirect to login

const AdminRoute = () => {
  const location = useLocation();

   // Get user info from localStorage (you can use context or Redux as well)
   const user = JSON.parse(localStorage.getItem("user"));

     // Check if user exists and is an admin
  const isAdmin = user?.isAdmin === true;

  // If user is not admin, redirect to login page
  if (!isAdmin) {
    return <Navigate to="/loginPage" state={{ from: location }} replace />;
  }

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