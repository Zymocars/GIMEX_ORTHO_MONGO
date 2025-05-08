const Order=require('../model/order');
const User=require('../model/user');

const createOrder=async(userId,orderData)=>{
    try {
        console.log('Creating order for user:', userId);

        // Get user's shipping details
        const user = await User.findById(userId);
        if (!user.shippingDetails) {
            throw new Error('Shipping details not found');
        }

        // Create order with user's shipping details
        const order = await Order.create({
            userId,
            products: orderData.products,
            deliveryAddress: user.shippingDetails,
            deliveryFee: orderData.deliveryFee || 0,
            couponApplied: orderData.couponApplied,
            couponDiscountAmount: orderData.couponDiscountAmount || 0,
            totalAmount: orderData.totalAmount
        });

        console.log('Order created successfully:', order._id);
        return order;
    } catch (error) {
        console.error('Error creating order:', error);
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
    createOrder,
    getUserOrders,
    deleteOrder
};
    