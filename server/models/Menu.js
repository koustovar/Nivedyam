const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [8, 'Price cannot exceed 8 characters'],
    },
    image: {
        type: String,
        required: [true, 'Please provide product image URL'],
    },
    category: {
        type: String,
        required: [true, 'Please enter product category'],
    },
    isVeg: {
        type: Boolean,
        default: true,
    },
    isSpicy: {
        type: Boolean,
        default: false,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Menu', menuSchema);
