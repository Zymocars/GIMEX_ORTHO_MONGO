const Product = require('../model/product');
const User = require('../model/user');
const Order = require('../model/order');
// Add new product service
const addProduct = async (productData) => {
    try {
        console.log('Adding new product:', productData);
        const product = await Product.create(productData);
        console.log('Product added successfully:', product);
        return product;
    } catch (error) {
        console.error('Error adding product:', error);
        throw new Error(error.message);
    }
};

// Update product service
const updateProduct = async (productId, updateData) => {
    try {
        console.log('Updating product:', productId);
        const product = await Product.findByIdAndUpdate(
            productId,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!product) {
            throw new Error('Product not found');
        }
        
        console.log('Product updated successfully:', product);
        return product;
    } catch (error) {
        console.error('Error updating product:', error);
        throw new Error(error.message);
    }
};

// Delete product
const deleteProduct = async (productId) => {
    try {
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        console.log('Product deleted successfully');
        return product;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw new Error(error.message);
    }
};

// Get all products with pagination and filters
const getAllProducts = async () => {
    try {
        const products = await Product.find();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error(error.message);
    }
};

const getAllUsers = async () => {
    try {
        console.log('Fetching all users');
        const users = await User.find()
            .select('-password') // Exclude password field
            .sort({ createdAt: -1 }); // Sort by newest first
        
        console.log(`Found ${users.length} users`);
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Error fetching users');
    }
};
const getAllOrders = async () => {
    try {
        console.log('Fetching all orders');
        const orders = await Order.find()
            .populate('user', 'name email') // Populate user details
            .sort({ createdAt: -1 }); // Sort by newest first
        
        console.log(`Found ${orders.length} orders`);
        return orders;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw new Error('Error fetching orders');
    }
}

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getAllUsers,
    getAllOrders
};