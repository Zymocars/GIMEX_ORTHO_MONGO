import React from "react";
import { Link, NavLink } from "react-router-dom";
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
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Contact", href: "/contact" },
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
        {
          name: "Instagram",
          href: "https://www.instagram.com/zymo.app?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
        },
        { name: "LinkedIn", href: "https://www.linkedin.com/company/zymoapp/" },
      ],
    },
    {
      title: "For Queries",
      text: "Mail us at:",
      email: "gimex@gimexortho.com",
    },
    {
      title: "Policies",
      links: [
        { name: "Privacy & Policy", href: "/privacy-policy" },
        { name: "Terms of Service", href: "/terms-of-service" },
        {
          name: "Cancellation, Refund Policy and Shipping Policy",
          href: "/cancellation-refund-policy",
        },
      ],
    },
  ];

  return (
    <footer className="bg-black text-white py-8 w-full overflow-hidden">
      <div className="md:max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 custom-grid lg-custom:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6 sm:bg-red-500 md:bg-blue-500 lg-custom:bg-yellow-500 lg:bg-green-500 xl:bg-purple-500">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h2 className="text-lg font-semibold mb-4">{section.title}</h2>
              {section.links && (
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link to={link.href} className="text-gray-400 hover:text-white">{link.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
              {section.text && <p className="text-gray-300">{section.text}</p>}
              {section.action && (
                <a
                  href={section.action.href}
                  className="inline-block mt-2 text-gray-400 hover:text-white"
                >
                  {section.action.text}
                </a>
              )}
              {section.email && (
                <a href={`mailto:${section.email}`} className="text-gray-400">
                  {section.email}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;