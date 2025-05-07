import React, { useState, useRef, useEffect } from "react";
import UserLogout from "./LogOut";
import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";

export default function UserSidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Menu Button */}
      <button
        className="flex items-center justify-center p-2 bg-white text-gray-800 rounded-md transition-colors"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="text-xl">☰</span>
      </button>

      {/* Dropdown Menu - Absolute positioning with high z-index */}
      {isMenuOpen && (
        <div className="absolute top-full right-0 mt-1 w-64 bg-gray-800 text-white rounded-md shadow-lg z-50">
          <div className="py-2">
            {/* <a href="/profile" className="block w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-3">
                <span className="text-lg">👤</span>
                <span>Profile</span>
            </div>
            </a> */}
            <Link
              to="/personal_info"
              className="block w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
              >
              <div className="flex items-center gap-3">
              <span className="text-lg">👤</span>
                <span>Profile</span>
              </div>
            </Link>

            {/* <Link
              to="/account_settings" 
              className="block w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
              >
              <div className="flex items-center gap-3">
                <span className="text-lg">⚙️</span>
                <span>Account Settings</span>
              </div>
            </Link> */}
            <Link
              to="/user-orders" 
              className="block w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
              >
              <div className="flex items-center gap-3">
              <FaShoppingBag className="text-lg pl-[6px]"  />
                <span className=" pl-[6px]">Orders</span>
              </div>
            </Link>
             
            <Link
              to="/user-ongoing-orders" 
              className="block w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
              >
              <div className="flex items-center gap-3">
              <MdPendingActions className="text-lg" />
                <span className="pl-[6px]">OngoingOrders</span>
              </div>
            </Link> 

            <Link
              to="/user-logout"
              className="block w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors text-red-300"
              >
                
              <div className="flex items-center gap-3">
                <span className="text-lg mr-3">↪️</span>
                {/* <span>Logout</span> */}
                <UserLogout />
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}