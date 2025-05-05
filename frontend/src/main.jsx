import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"; // Ensure this is imported globally
import './output.css';  // Ensure this path matches your project structure

// Component imports
import FAQSection from './components/FAQSection';
import AboutUsPage from './components/About';
import Contact from './components/Contact';
import Home_page from './components/Home_page';
import ProductDetails from './components/Product_Details';
import Blogs from './components/Blogs';
import Edit_Profile from './components/Edit_Profile';
import { BrowserRouter, Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';
import ExploreCategories from './components/Explore_cats';
import Layout from './components/Layout';
import NewArrivals from './components/New_arrivals_bar';
import CartPage from './components/Cart_Page';
import ProductPage from './components/Buy_Product';
import 'material-icons/iconfont/material-icons.css';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignUp';
import ForgetPassword from './components/ForgetPassword';

// Admin imports
import Products from './Pages/Products';
import Dashboard from './Pages/Dashboard';
import Orders from './Pages/Orders';
import Users from './Pages/Users';
import OngoingOrders from './Pages/OngoinOrders';
import AdminRoute from './Pages/Admin';

import AddProduct from './Pages/AddProduct';
import AdminLogin from './Pages/AdminLogin';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Main Layout for regular user pages */}
      <Route path='/' element={<Layout />}>
        <Route index element={<Home_page />} />
        <Route path='home' element={<Home_page/>} />
        <Route path='SignUp' element={<SignupPage />} />
        <Route path='LoginPage' element={<LoginPage />} />
        <Route path='Buy_Product' element={<ProductPage />} />
        <Route path='Cart_Page' element={<CartPage />} />
        <Route path='product_detail' element={<ProductDetails/>} />
        <Route path='contact' element={<Contact />} />
        <Route path='about' element={<AboutUsPage />} />
        <Route path='user_profile' element={<Blogs />} />
        <Route path='edit_profile' element={<Edit_Profile />} />
        <Route path='faqs' element={<FAQSection />} />
        <Route path='categories' element={<ExploreCategories />} />
        <Route path='forgetPassword' element={<ForgetPassword />} />
      </Route>

      {/* Admin Login Route - Not protected by AdminRoute */}
      <Route path='/admin/login' element={<AdminLogin />} />

      {/* Admin Routes - Protected by AdminRoute component */}
      <Route path='/admin' element={<AdminRoute />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='products' element={<Products />} />
        <Route path='orders' element={<Orders />} />
        <Route path='users' element={<Users />} />
        <Route path='ongoing-orders' element={<OngoingOrders />} />
        <Route path='addProduct' element={<AddProduct />} />
      </Route>

      {/* 404 catch-all route */}
      <Route path='*' element={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-xl mb-6">Page not found</p>
            <a href="/" className="text-blue-500 hover:underline">Return to home</a>
          </div>
        </div>
      } />
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)