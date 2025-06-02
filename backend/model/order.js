const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    discountedPrice: { type: Number },
  }],
  totalAmount: { type: Number, required: true },
  deliveryFee: { type: Number },
  couponCode: { type: String },
  deliveryAddress: {
    name: { type: String, required: true },
    email: { type: String },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], 
    default: 'Pending' 
  },
  orderDate: { type: Date, default: Date.now },
  estimatedDelivery: { type: Date }
});

const Order = mongoose.model('Order', orderSchema);
console.log('Order model defined:', Order); // Debug log

module.exports = Order;