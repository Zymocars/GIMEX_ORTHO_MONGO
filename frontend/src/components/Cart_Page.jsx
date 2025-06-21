import React, { useState } from "react";
import { TruckIcon, TagIcon } from "@heroicons/react/24/outline";
import { createRazorpayOrder, loadScript } from "../utils/razorpayUtils";

export default function CartPage() {
  // Get saved product data
  const [cartProduct, setCartProduct] = useState(() => {
    const saved = localStorage.getItem("cartProduct");
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      _id: "default",
      name: "GIMEX Ortho",
      price: 44,
      originalPrice: 49,
      discount: 10,
      quantity: 1,
      image: "/images/Gimex_1.png",
      stock: 100,
    };
  });

  const [quantity, setQuantity] = useState(cartProduct.quantity || 1);
  const [deliveryOption, setDeliveryOption] = useState("address");
  const [couponCode, setCouponCode] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [addressAdded, setAddressAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState({
    success: false,
    message: "",
  });

  const handleIncrease = () => {
    if (quantity < cartProduct.stock) {
      setQuantity(quantity + 1);
      updateLocalStorage(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updateLocalStorage(quantity - 1);
    }
  };

  const updateLocalStorage = (newQuantity) => {
    const updatedProduct = { ...cartProduct, quantity: newQuantity };
    setCartProduct(updatedProduct);
    localStorage.setItem("cartProduct", JSON.stringify(updatedProduct));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressInfo({
      ...addressInfo,
      [name]: value,
    });
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setAddressAdded(true);
    setShowAddressModal(false);
  };

  const validateOrder = () => {
    // Check if address has been added
    if (!addressAdded) {
      setOrderStatus({
        success: false,
        message: "Please add a delivery address before placing your order.",
      });
      return false;
    }

    // Check if all required address fields are filled
    const requiredFields = [
      "name",
      "mobile",
      "email",
      "address",
      "city",
      "state",
      "pincode",
    ];
    for (const field of requiredFields) {
      if (!addressInfo[field]) {
        setOrderStatus({
          success: false,
          message: `Please fill in all required address fields (${field} is missing).`,
        });
        return false;
      }
    }

    return true;
  };

  const placeOrder = async () => {
    console.log("Placing order...");
    // First validate the order
    if (!validateOrder()) {
      return;
    }
    // Get authentication token if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      setOrderStatus({
        success: false,
        message: "Please log in to place an order.",
      });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setOrderStatus({ success: false, message: "" });

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Failed to load Razorpay SDK. Please try again later.");
      setIsLoading(false);
      return;
    }

    try {
      const amount = parseInt(cartProduct.price * quantity + deliveryFee);
      const orderData = await createRazorpayOrder(amount, "INR", token);
      if (!orderData || !orderData.data) {
        setOrderStatus({
          success: false,
          message: "Failed to create Razorpay order. Please try again.",
        });
        setIsLoading(false);
        return;
      }
      const options = {
        key: import.meta.env.VITE_RAZORPAY_PROD_KEY,
        amount: orderData.data.amount,
        currency: "INR",
        name: "GIMEX Ortho",
        description: "Order Payment",
        image: "/images/Gimex_1.png",
        order_id: orderData.id,
        handler: async (response) => {
          console.log("Payment successful:", response);
          setOrderStatus({
            success: true,
            message: "Payment successful! Your order is being processed.",
          });
        },
        prefill: {
          name: addressInfo.name,
          email: addressInfo.email,
          contact: addressInfo.mobile,
        },
        notes: {
          address: addressInfo.address,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error loading Razorpay SDK:", error);
    }

    try {
      // Format the order data to match the expected structure in the admin dashboard
      const orderData = {
        products: [
          {
            productId: cartProduct._id,
            name: cartProduct.name,
            originalPrice: cartProduct.originalPrice,
            price: cartProduct.price,
            quantity: quantity,
            image: cartProduct.image,
          },
        ],
        deliveryAddress: {
          name: addressInfo.name,
          mobile: addressInfo.mobile,
          email: addressInfo.email,
          address: addressInfo.address,
          city: addressInfo.city,
          state: addressInfo.state,
          pincode: addressInfo.pincode,
        },
        deliveryFee: deliveryFee,
        totalAmount: grandTotal,
        couponCode: couponCode.trim() || null,
        orderDate: new Date().toISOString(),
      };

      // Make API call to create order
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}api/user/placeorder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        // Clear cart data
        localStorage.removeItem("cartProduct");
        setOrderStatus({
          success: true,
          message: "Order placed successfully! Your order ID is " + data.data._id,
        });

        // Reset form
        setQuantity(1);
        setCouponCode("");
      } else {
        setOrderStatus({
          success: false,
          message:
            data.message || "Failed to place your order. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setOrderStatus({
        success: false,
        message:
          "An error occurred while placing your order. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const itemTotal = cartProduct.price * quantity;
  const deliveryFee = 50;
  const grandTotal = itemTotal + deliveryFee;

  return (
    <div className="min-h-screen bg-white text-black p-4 flex flex-col md:flex-row lg:flex-row gap-6">
      {/* Left Side */}
      <div className="w-full md:w-2/3 space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold">Cart</h1>

        {/* Delivery Address */}
        <div className="border p-4 rounded-lg flex justify-between items-center">
          <div className="flex-1">
            <p className="font-semibold flex items-center gap-2">
              <TruckIcon className="h-5 w-5 text-gray-600" />
              Delivery Address
            </p>
            <button
              className="text-green-700 font-semibold relative right-0"
              onClick={() => setShowAddressModal(true)}
            >
              {addressAdded ? "Edit address" : "Add address"}
            </button>
            {addressAdded && !showAddressModal && (
              <div className="mt-2 text-sm">
                <p>
                  <span className="font-medium">Name:</span> {addressInfo.name}
                </p>
                <p>
                  <span className="font-medium">Mobile:</span>{" "}
                  {addressInfo.mobile}
                </p>
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {addressInfo.address}, {addressInfo.city}, {addressInfo.state}{" "}
                  - {addressInfo.pincode}
                </p>
              </div>
            )}

            {showAddressModal && (
              <div className="mt-4 border-t pt-4">
                <form onSubmit={handleAddressSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={addressInfo.name}
                      onChange={handleAddressChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={addressInfo.mobile}
                      onChange={handleAddressChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={addressInfo.email}
                      onChange={handleAddressChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={addressInfo.address}
                      onChange={handleAddressChange}
                      rows="3"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={addressInfo.city}
                        onChange={handleAddressChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State *
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={addressInfo.state}
                        onChange={handleAddressChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="pincode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Pincode *
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={addressInfo.pincode}
                      onChange={handleAddressChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-4 mt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddressModal(false)}
                      className="bg-gray-200 text-gray-800 py-2 px-6 rounded-md font-medium hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 text-white py-2 px-4 rounded-md font-medium hover:bg-green-700"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Order Status Messages */}
        {orderStatus.message && (
          <div
            className={`p-4 rounded-lg ${
              orderStatus.success
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {orderStatus.message}
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/3 border-t md:border-t-0 md:border-l p-4 space-y-4 bg-rose-200">
        <div className="flex flex-row sm:flex-row gap-6 items-start">
          <img
            src={cartProduct.image}
            alt={cartProduct.name}
            className="w-[30px] h-[30px] mt-2"
          />
          <div className="flex-1">
            <p className="font-medium">{cartProduct.name}</p>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <span className="line-through">₹{cartProduct.originalPrice}</span>
              <span className="text-black">₹{cartProduct.price}</span>
              <span className="text-green-600 font-semibold">
                {cartProduct.discount}% OFF
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 border px-2 py-1 rounded-full">
            <button onClick={handleDecrease} className="text-lg font-semibold">
              -
            </button>
            {quantity}
            <button onClick={handleIncrease} className="text-lg font-semibold">
              +
            </button>
          </div>
          <p className="font-medium">₹{cartProduct.price * quantity}</p>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between">
            <span>Item Total</span>
            <span>₹{itemTotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery fees</span>
            <span>₹{deliveryFee}</span>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between font-bold text-lg">
            <span>Grand Total</span>
            <span>₹{grandTotal}</span>
          </div>
        </div>

        <button
          className={`w-full py-3 rounded-full font-semibold overflow-hidden ${
            isLoading
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-700"
          }`}
          onClick={placeOrder}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Place Order"}
        </button>

        {/* Available Offers */}
        <div className="border p-4 rounded-lg">
          <div className="flex items-center gap-2 font-semibold mb-2">
            <TagIcon className="h-5 w-5 text-black" /> Available offers
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="border rounded p-2 w-full"
            />
            <button
              className={`font-semibold px-6 py-2 rounded
                  ${
                    !couponCode.trim()
                      ? "bg-gray-100 text-gray-400"
                      : "bg-green-500 text-white"
                  }`}
              disabled={!couponCode.trim()}
            >
              Apply
            </button>
          </div>
        </div>

        <div className="flex sm:flex-col md:flex-row gap-4 text-sm text-gray-600 justify-center">
          <div className="flex items-center gap-1">
            <span className="material-icons text-gray-500">security</span>{" "}
            Secured Payment
          </div>
          <div className="flex items-center gap-1">
            <span className="material-icons text-gray-500">verified</span>{" "}
            Verified Merchant
          </div>
        </div>
      </div>
    </div>
  );
}
