import React from "react";
import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ShieldAlert } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Replace with your actual admin login API endpoint
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Handle successful login
        // For example, store token in localStorage and redirect
        localStorage.setItem('adminToken', data.token);
        window.location.href = '/admin/dashboard';
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-600 p-3 rounded-full">
            <ShieldAlert size={32} className="text-white" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Admin Portal</h1>
        <p className="text-center text-gray-600 mb-6">Sign in to access the admin dashboard</p>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6 text-sm flex items-center">
            <span className="mr-2">⚠️</span>
            {error}
          </div>
        )}
        
        <div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* <Mail size={18} className="text-gray-400" /> */}
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="admin@company.com"
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* <Lock size={18} className="text-gray-400" /> */}
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye size={18} className="text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>
          
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-70"
          >
            {loading ? 'Signing in...' : 'Sign In to Admin'}
          </button>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center justify-between">
            {/* <a href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a> */}
            <a href="/" className="text-sm text-indigo-600 hover:text-indigo-500">
              Return to user login
            </a>
          </div>
        </div>
        
        {/* <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            This is a secure admin portal. Unauthorized access is prohibited.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default AdminLogin;