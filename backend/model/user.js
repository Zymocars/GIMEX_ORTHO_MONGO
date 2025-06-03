const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Mongoose schema for user
const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ // regex for email pattern verification
        },
        role: { type: String, enum: ['Admin', 'User'], default: 'User' },
        status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
        joined: { type: Date, default: Date.now },
        
        password: {    // stored in hashed form
            type: String,
            required: true,
            minlength: 6,
            select: false,
        },
        isAdmin: {    // set roles, is an admin or non-admin, can use enums if more than one role
            type: Boolean,
            required: true,
            default: false,
        },
        shippingDetails: {      // needs to be updated before making purchase
            name: { type: String, required: false },
            mobile: { type: String, required: false },
            email: { type: String, required: false },
            address: { type: String, required: false },    // Full street address
            city: { type: String, required: false },
            state: { type: String, required: false },
            pincode: { type: String, required: false }
        },
        resetPasswordToken: String,
        resetPasswordExpires: Date,
    },
    {
        timestamps: true
    }
);

// Check if model exists before creating to prevent overwrite error
const User = mongoose.models.User || mongoose.model('User', UserSchema);
module.exports = User;