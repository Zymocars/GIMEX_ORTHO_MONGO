import React from "react";
import { Link,NavLink} from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaPlus,
  FaClock,
  FaSignInAlt,
} from "react-icons/fa";

const Footer = () => {
  // Footer links data structure
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Contact", href: "/contact" },
        { name: "FAQ", href: "/faqs" },
        { name: "Help", href: "/contact" },
        { name: "About", href: "/about" },
      ],
    },
    {
      title: "Customer Support",
      text: "Have any questions? Our support team is here to help.",
      action: { text: "Get Support →", href: "/contact" },
    },
    {
      title: "Follow Us",
      links: [
        { name: "Facebook", href: "#" },
        { name: "Instagram", href: "https://www.instagram.com/zymo.app?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
        { name: "LinkedIn", href: "https://www.linkedin.com/company/zymoapp/" },
      ],
    },
    {
      title: "For Queries",
      text: "Mail us at:",
      email: "gimex@gimexortho.com",
    },
  ];

  const adminNavItems = [
    { path: "/admin/login", label: "Login", icon: <FaSignInAlt /> },
    { path: "/admin/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/admin/products", label: "Products", icon: <FaBoxOpen /> },
    { path: "/admin/orders", label: "Orders", icon: <FaShoppingCart /> },
    { path: "/admin/users", label: "Users", icon: <FaUsers /> },
     { path: "/admin/addProduct", label: "Add Product", icon: <FaPlus /> },
    { path: "/admin/ongoing-orders", label: "Ongoing Orders", icon: <FaClock /> },
  ];


  return (
    // <footer className="bg-[#303030] text-white py-8 w-full overflow-hidden">
    <footer className="bg-black text-white py-8 w-full overflow-hidden">
      <div className="md:max-w-7xl mx-auto px-6">
        {/* Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h2 className="text-lg font-semibold mb-4">{section.title}</h2>
              
              {/* If section has links */}
              {section.links && (
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                     <Link to={link.href}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              )}

              {/* If section has text */}
              {section.text && <p className="text-gray-300">{section.text}</p>}

              {/* If section has an action button */}
              {section.action && (
                <a href={section.action.href} className="inline-block mt-2 text-gray-400 hover:text-white">
                  {section.action.text}
                </a>
              )}

              {/* If section has an email */}
              {section.email && (
                <a href={`mailto:${section.email}`} className="text-gray-400">
                  {section.email}
                </a>
              )}
            </div>
          ))}
        </div>

         {/* Admin Footer Navigation */}
         <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Admin Navigation</h2>
          <nav className="flex flex-wrap justify-center gap-6">
            {adminNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 hover:text-yellow-400 ${
                    isActive ? "text-yellow-400" : ""
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>


        {/* Divider Line */}
        {/* <div className="border-t border-gray-600 my-6"></div>

        {/* Copyright
        <div className="text-center text-gray-400">
          &copy; {new Date().getFullYear()} Vehicle Accessories. All Rights Reserved.
        </div> */}
      {/* </div> */}
      </div>
    </footer>
)
}
export default Footer;
