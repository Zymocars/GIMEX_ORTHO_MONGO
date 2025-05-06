import React from 'react'
import Footer from './Footer'
import ProductDetails from './Product_Details'
import { Outlet } from 'react-router-dom'
import Home_page from './Home_page'
import PromoSection from './Home_Promo_Section'
import Navbar from './Navbar'
import EditProfileForm from './Edit_Profile'
import FAQPage from './FAQSection'
import AboutUsPage from './About'
import Contact from './Contact'
import ExploreCategories from './Explore_cats'
import ManageProfile from './Blogs'
import { Sidebar } from 'lucide-react'
// import RSB from './Booking_button'
export default function Layout({children}) {
  return (
  <div>
    <Navbar/>
    <Outlet/>
    <Footer/>
    {/* <main className="flex-1 md:ml-64 mt-16 md:mt-0 mb-16 md:mb-0 p-4"> 
      {children}
    </main> */}
    </div>
  )
}
