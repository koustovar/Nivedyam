const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderType: {
        type: String,
        enum: ['table', 'delivery'],
        required: true,
    },
    tableId: {
        type: String, // String ID for table (e.g., T1, T2)
        required: function () { return this.orderType === 'table'; }
    },
    customerDetails: {
        name: String,
        phone: String,
        address: String, // For delivery
    },
    items: [
        {
            menuId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Menu',
                required: true,
            },
            name: String,
            price: Number,
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            notes: {
                type: String,
                default: ""
            }
        },
    ],
    subtotal: {
        type: Number,
        required: true,
    },
    gst: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'preparing', 'ready', 'served', 'out-for-delivery', 'delivered', 'cancelled'],
        default: 'pending',
    },
    paymentStatus: {
        type: String,
        enum: ['unpaid', 'paid'],
        default: 'unpaid',
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'upi', 'card'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Order', orderSchema);
