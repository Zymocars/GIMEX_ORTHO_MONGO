import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaClock,
  FaSignInAlt,
  FaPlus,
  FaBars,
  FaTimes
} from "react-icons/fa";

const navItems = [
  { path: "/admin/login", label: "Login", icon: <FaSignInAlt /> },
  { path: "/admin/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { path: "/admin/products", label: "Products", icon: <FaBoxOpen /> },
  { path: "/admin/orders", label: "Orders", icon: <FaShoppingCart /> },
  { path: "/admin/users", label: "Users", icon: <FaUsers /> },
  { path: "/admin/addProduct", label: "Add Product", icon: <FaPlus /> },
  { path: "/admin/ongoing-orders", label: "Ongoing Orders", icon: <FaClock /> },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  // Close the menu when clicking outside
  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Toggle Button - moved to right side */}
      <button
        className="md:hidden text-2xl p-4 text-black fixed top-0 right-0 z-30"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <FaBars />
      </button>

      {/* Overlay for mobile - only shows when menu is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar for all screen sizes - slides in/out on mobile */}
      <div
        className={`bg-gray-800 text-white w-64 h-screen p-4 fixed top-0 left-0 z-20 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <button 
            className="md:hidden text-white text-xl" 
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;