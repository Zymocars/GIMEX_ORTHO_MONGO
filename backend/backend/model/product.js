const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true
        },
        category: {
            type: String,
            required: [true, 'Product category is required'],
            enum: ['Health', 'Fitness', 'Wellness', 'Nutrition'], 
            default: 'Health'
        },
        price: {
            type: Number,
            required: [true, 'Product price is required'],
            min: [0, 'Price cannot be negative']
        },
        stock: {
            type: Number,
            required: [true, 'Product stock is required'],
            min: [0, 'Stock cannot be negative'],
            default: 0
        },
        description: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

ProductSchema.index({ name: 'text', category: 'text' });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;