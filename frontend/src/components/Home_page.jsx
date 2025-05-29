import React from 'react';
import { useState, useEffect } from 'react';
import { Squares2X2Icon, PuzzlePieceIcon, BoltIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import PromoSection from './Home_Promo_Section';
import NewArrivals from './New_arrivals_bar';
import ExploreCategories from './Explore_cats';
import Hero from './Hero';
import PraiseSection from './Praises';
import CustomerReviews from './Customer_Review';

import { useNavigate } from'react-router-dom';

export default function Home_page() {
  const navigate = useNavigate();
  const handleBuyNow = () => {
    navigate(`/product/6836a247d1c1e405c2c4dffc`);

  };
  
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const breakpoint = 1024; // lg breakpoint
  
  // Update windowWidth when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Initial window width check
    handleResize();
    
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Determine if we're on a small screen
  const isSmallScreen = windowWidth < breakpoint;
  
  // Dynamic styles based on screen size
  const heroContainerStyle = {
    flexDirection: isSmallScreen ? 'column' : 'row',
  };

  const contentContainerStyle = {
    width: isSmallScreen ? '100%' : '50%',
    marginBottom: isSmallScreen ? '2.5rem' : '0',
    zIndex: 10,
  };

  const imageContainerStyle = {
    width: isSmallScreen ? '100%' : '50%',
  };
  
  return (    
    <>
      {/* Prevent horizontal scroll */}
      <div className="flex relative w-full text-white-500 bg-[#c6f022] h-96 overflow-hidden">
      <div style={heroContainerStyle} className="container mx-auto px-4 py-16 flex flex-row lg:flex-row items-center">
        {/* Left side: Content and Button */}
        {/* <div className="lg:w-1/2 z-10 mb-10 text-white-500 lg:mb-0"> */}
        <div style={contentContainerStyle}>
          <h1 className="text-4xl md:text-5xl font-bold text-white-600 leading-tight mb-4">
            GIMEX ORTHO +
          </h1>
          <span className="block text-white-600 mt-0 text-4xl font-normal mb-4 ">Health Booster</span>
          
          <p className="text-lg text-white-700 mb-6">
            Specially formulated natural orthopedic powder prescribed by doctors to support bone health, reduce inflammation, and improve mobility with clinically proven herbal ingredients.
          </p>
          
          <ul className="mb-8">
            <li className="flex items-center mb-2">
              {/* <svg className="w-5 h-5 mr-2 text-white-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg> */}
              <span>Doctor recommended formula</span>
            </li>
            <li className="flex items-center mb-2">
              {/* <svg className="w-5 h-5 mr-2 text-white-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg> */}
              <span>100% Natural ingredients</span>
            </li>
            <li className="flex items-center">
              {/* <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg> */}
              <span>Clinically tested efficacy</span>
            </li>
          </ul>
          
          <button
           onClick={handleBuyNow}
          className="bg-black p-2 hover:bg-green-700 text-white font-medium py-3 px-8 mx-8 mb-4 rounded-lg shadow-lg transition duration-300 flex items-center">
            Buy Now
            <svg className="w-4 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
        
        {/* Right side: Image */}
        {/* <div className="lg:w-1/2 relative"> */}
        <div style={imageContainerStyle} className="relative">
          <div className="relative overflow-hidden rounded-lg shadow-xl">
            {/* Here you need to use the actual URL of your image */}
            {/* <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4 pl-8">Natural Ortho Powder</h1> */}
            <div className="flex flex-row md:flex-col">
              <img 
                src="/images/Gimex_1.png"  
                alt="Ayurvedic mortar and pestle with herbs" 
                className="w-1/2 h-1/2 object-cover"
              />
              <img 
                src="/images/Gimex_2.png"  
                alt="Ayurvedic mortar and pestle with herbs" 
                className="w-1/2 h-1/2 object-cover"
              />
            </div>
            
            {/* Overlay effect */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-transparent"></div> */}
          </div>
          
         
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="hidden lg:block absolute top-0 right-0 w-1/3 h-full bg-green-100/50 -skew-x-12 transform origin-top-right z-0"></div>
    </div>
      {/* Other Sections */}
      <Hero />
      <PromoSection />
      {/* <NewArrivals /> */}
      <ExploreCategories />
      <PraiseSection />
      <CustomerReviews/>
    </>
  );
}

