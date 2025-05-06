import React, { useState } from 'react';
import { ChevronDown, ShoppingCart, User, Search ,Menu} from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Upper Navbar with Logo, Search and Account */}
      <div className="bg-white  w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo - Updated to match Mystic style */}
          <div className="flex-1">
            <Link to="/home" className="flex flex-col items-start">
              {/* <span className="text-2xl font-serif text-yellow-500 tracking-wide">GIMEX</span> */}
              <img 
                src="/images/Gimex_logo.png" alt="Gimex_Logo" 
                width={"75px"}/>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 justify-center  ">
            <div className="relative w-full max-w-xl hidden md:flex">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-gray-100 border border-gray-200 rounded-md py-2 px-4 pr-10 text-gray-800 text-base focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Search className="h-4 w-4 text-amber-700" />
              </div>
            </div>
          </div>

          {/* Cart */}
          <div className="flex justify-end text-black relative pr-3">
            {/* <span className="font-medium text-sm">₹499.00</span> */}
            <Link to="/Cart_Page" className="relative ml-3 text-amber-500 flex items-center">
              <ShoppingCart className="w-5 h-5" />
              {/* <span className="absolute -top-2 -right-2 bg-amber-500 text-gray-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"> */}
              {/* <span className="ml-2 bg-amber-500 text-gray-900 rounded-full w-5 h-5 text-xs flex justify-center items-center font-bold">
                2
              </span> */}
            </Link>
          </div>

          {/* Account Details */}
          <div className="flex justify-end h-12 w-auto">
          <Link to="/signupPage" className="flex flex-col items-center justify-center text-gray-700 hover:text-amber-700 w-20 h-12 self-start">
          {/* <User className="w-5 h-5 mb-1 " /> */}
          <User className="w-7 h-5 mb-1 "/>
              {/* <span className="text-sm">Account

              </span> */}
            </Link>
          </div>


        </div>
      </div>

      {/* Lower Navbar with Navigation Links - Updated to match Mystic style */}
      {/* <nav className="bg-gray-900 w-full z-40">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          Main Navigation */}
          {/* <div className="flex space-x-6 gap-2 text-white py-3">
            <Link to="/shop" className="text-sm hover:text-amber-500 transition-colors">Shop</Link>
            
            <div className="relative group">
              <Link to="/skin-care" className="flex items-center text-sm hover:text-amber-500 transition-colors">
                Skin Care <ChevronDown className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="relative group">
              <Link to="/ayurvedic-hair-care" className="flex items-center text-sm hover:text-amber-500 transition-colors">
                Ayurvedic Hair Care <ChevronDown className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <Link to="/ayurvedic-supplement" className="text-sm hover:text-amber-500 transition-colors">
              Ayurvedic Supplement
            </Link>
            
            <div className="relative group">
              <Link to="/natural-oils" className="flex items-center text-sm hover:text-amber-500 transition-colors">
                Natural Oils <ChevronDown className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <Link to="/combo" className="text-sm hover:text-amber-500 transition-colors">Combo</Link>
            <Link to="/super-saver-deals" className="text-sm hover:text-amber-500 transition-colors">Super Saver Deals</Link>
          </div> */}

          {/* Cart */}
          {/* <div className="flex items-center text-white">
            <span className="font-medium text-sm">₹499.00</span>
            <Link to="/cart" className="relative ml-3 text-amber-500">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-amber-500 text-gray-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                2
              </span>
            </Link>
          </div>
        </div>
      </nav> */}
    </>
  );
};

export default Navbar;