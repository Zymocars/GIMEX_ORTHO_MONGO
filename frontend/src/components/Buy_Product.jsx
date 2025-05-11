import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [isReadMore, setIsReadMore] = useState(false);
  const navigate = useNavigate();
  const handleCart = () => {
    navigate("/Cart_Page");
  };

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="w-full min-h-screen py-6 bg-white ">
      <div className="max-w-xl mx-auto px-4">
        {/* Main product container - flex-col by default (mobile), flex-row for md and up */}
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Left side - Product Image */}
          {/* <div className="w-full md:w-1/2 bg-lime-300 h-20 object-contain "> */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0 flex">
            <img
              src="/images/Gimex_1.png"
              alt="Ortho Powder Pack"
              // className=" w-full h-[400px]"
              className=" w-full h-auto object-contain max-h-[500px]"
            />
          </div>

          {/* Right side - Product Details */}
          {/* <div className="w-full md:w-full pt-4 px-4 md:pl-2"> */}
          <div className="w-full md:w-1/2">
            {/* Product Title */}
            <h1 className="text-2xl md:text-3xl font-bold mb-3">
              GIMEX Ortho Plus
            </h1>

            {/* Pricing */}
            <div className="flex items-center mb-3">
              <span className="text-xl font-bold">₹44</span>
              <span className="text-gray-500 line-through mx-2">₹49</span>
              <span className="text-red-600 font-medium">10% Off</span>
            </div>

            {/* Reviews */}
            <div className="mb-6">
              <span className="text-gray-600">(42 reviews)</span>
            </div>

            {/* Side by side equal width buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Go to Cart */}
              <div className="w-full sm:w-1/2">
                <button
                  onClick={handleCart}
                  className="w-full border border-gray-300 py-3 px-4 text-center rounded hover:bg-gray-50 transition-colors"
                >
                  Go to Cart
                </button>
              </div>

              {/* Quantity selector */}
              {/* <div className="w-full sm:w-1/2 mt-2 md:mt-0"> */}
              <div className="w-full sm:w-1/2">
                {/* <div className="flex items-center justify-between border border-gray-300 rounded-full h-[54px] w-full md:w-[260px]"> */}
                <div className="flex items-center justify-between border border-gray-300 rounded-full h-14">
                  <button
                    onClick={decreaseQuantity}
                    className="w-12 h-full flex items-center justify-center text-black font-bold"
                  >
                    −
                  </button>
                  <div className="flex-1 text-center">{quantity}</div>
                  <button
                    onClick={increaseQuantity}
                    className="w-12 h-full flex items-center justify-center text-black font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div>
              <h2 className="text-xl font-bold mb-2">Product Description</h2>
              <h3 className="font-medium mb-3">Uses</h3>

              <ul className="space-y-2">
                <li>It helps to make bone strong.</li>
                <li>It helps to reduce rigidity of bones.</li>
                <li>It helps to reduce pain in arthritics.</li>
                <li>To reduce pain in backbone</li>
                <li>To reduce pain in neck</li>
                {isReadMore && (
                  <>
                    <li>Helps in joint mobility</li>
                    <li>Supports healthy cartilage</li>
                    <li>Reduces inflammation in joints</li>
                  </>
                )}
                <li>
                  <a
                    href="#!"
                    onClick={toggleReadMore}
                    className="text-green-500 hover:underline"
                  >
                    {isReadMore ? "Read Less" : "Read More"}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
