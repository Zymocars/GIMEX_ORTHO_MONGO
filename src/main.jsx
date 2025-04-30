import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import '../index.css'
import "./index.css"; // Ensure this is imported globally
// import Login from './components/Login';
import './output.css';  // Ensure this path matches your project structure
import FAQSection from './components/FAQSection';
import AboutUsPage from './components/About';
import Contact from './components/Contact';
import Home_page from './components/Home_page';
import ProductDetails from './components/Product_Details';
import Blogs from './components/Blogs';
import Edit_Profile from './components/Edit_Profile';
import { BrowserRouter, Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
// import Login from './components/Login';
import ExploreCategories from './components/Explore_cats';
import Layout from './components/Layout';
import NewArrivals from './components/New_arrivals_bar';
import CartPage from './components/Cart_Page';
import ProductPage from './components/Buy_Product';
import 'material-icons/iconfont/material-icons.css';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignUp';
import Products from './Pages/Products';
import Dashboard from './Pages/Dashboard';
import Orders from './Pages/Orders';
import Users from './Pages/Users';
import OngoingOrders from './Pages/OngoinOrders';
import AdminRoute from './Pages/Admin';
import Sidebar from './Components/Sidebar';
import AddProduct from './Pages/AddProduct';
import AdminLogin from './Pages/AdminLogin';

// import App from './App'
// import LoginPage from './components/Login'

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    <Route path='SignUp' element = {<SignupPage />} />
    <Route path='LoginPage' element={<LoginPage />}/>
    <Route path='Buy_Product' element={<ProductPage />} />
    <Route path='Cart_Page' element={<CartPage />} />
    {/* <Route path='products' element={<Products />} /> */}
    {/* <Route path='dashboard' element={<Dashboard />} /> */}
    {/* <Route path='orders' element={<Orders />} /> */}
    <Route path='ongoing-orders' element={<OngoingOrders />} />
    {/* <Route path='users' element={<Users />} /> */}
    <Route path='product_detail' element={<ProductDetails/>}></Route>
    <Route path='contact' element={<Contact />}></Route>
    <Route path='about' element={<AboutUsPage />}></Route>
    <Route path='user_profile' element={<Blogs />}></Route>
    <Route path='edit_profile' element={<Edit_Profile />}></Route>
    <Route path='faqs' element={<FAQSection />}></Route>
    <Route path='categories' element={<ExploreCategories />}></Route>
    <Route index element={<Home_page />}></Route>
    <Route path='home' element={<Home_page/>}></Route>
    <Route path='admin' element={<AdminRoute />}></Route>
    {/* <Route path='admin' element={<AdminRoute />}></Route> */}
    {/* <Route path='dashboard' element={<Dashboard />}></Route> */}
    {/* <Route path='products' element={<Products />}></Route> */}
    {/* <Route path='orders' element={<Orders />}></Route> */}
    <Route path='Sidebar' element={<Sidebar />}></Route>
    <Route path='loginPage' element={<LoginPage />}></Route>
    <Route path='signupPage' element={<SignupPage />}></Route>
    {/* <Route path='addProduct' element={<AddProduct />}></Route> */}
    {/* <Route path='adminLogin' element={<AdminLogin />}></Route> */}

  

Admin-only routes wrapped in AdminRoute 
  <Route path='admin' element={<AdminRoute />}>
     <Route path='login' element={<AdminLogin />}></Route>
     <Route path='dashboard' element={<Dashboard />}></Route>
     <Route path='products' element={<Products />}></Route>
     <Route path='orders' element={<Orders />}></Route>
     <Route path='users' element={<Users />}></Route>
     <Route path='ongoing-orders' element={<OngoingOrders />}></Route>
     <Route path='addProduct' element={<AddProduct />}></Route>
   </Route>
</Route>

  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
