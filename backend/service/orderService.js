const mongoose = require('mongoose');
const Order = require('../model/order');
const User = require('../model/user');

const createOrder = async (userId, orderData) => {
    try {
        // Validate productId
        orderData.products.forEach(product => {
            if (!mongoose.Types.ObjectId.isValid(product.productId)) {
                throw new Error(`Invalid productId: ${product.productId}`);
            }
        });

        console.log('Saving order to database');
        const newOrder = new Order({
            userId,
            products: orderData.products,
            deliveryAddress: orderData.deliveryAddress,
            deliveryFee: orderData.deliveryFee,
            couponApplied: orderData.couponCode,
            couponDiscountAmount: orderData.couponDiscountAmount,
            totalAmount: orderData.totalAmount,
            status: 'Processing',
            orderDate: new Date(),
        });

        return await newOrder.save();
    } catch (error) {
        console.error('Error saving order:', error);
        throw new Error(error.message);
    }
};

const getUserOrders = async (userId) => {
    try {
        console.log('Fetching orders for user:', userId);
        const orders = await Order.find({ userId })
            .sort({ orderDate: -1 })
            .populate('products.productId', 'name price');

        return orders;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw new Error(error.message);
    }
};

const deleteOrder = async (orderId) => {
    try {
        console.log('Deleting order:', orderId);
        const order = await Order.findByIdAndDelete(orderId);
        
        if (!order) {
            throw new Error('Order not found');
        }

        console.log('Order deleted successfully');
        return order;
    } catch (error) {
        console.error('Error deleting order:', error);
        throw new Error(error.message);
    }
};

module.exports = {
    ...module.exports,
    createOrder,
    getUserOrders,
    deleteOrder
};
