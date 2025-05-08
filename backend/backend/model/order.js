const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Reference to the User model
      productName: String,
      originalPrice: Number,
      discountedPrice: Number,
      discountPercentage: { type: Number, default: 0 },
      quantity: Number,
    }
  ],
  deliveryAddress: {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  }
  ,
  deliveryFee: {
    type: Number,
    default: 0
  },
  couponApplied: {
    type: String, // like "SAVE10" etc.
    default: null
  },
  couponDiscountAmount: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number, // After applying coupon
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
});
const Order = mongoose.model('Order',orderSchema );
module.exports = Order;