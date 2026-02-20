const Order = require('../models/Order');

// Create New Order
exports.createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);

        // Emit socket event for real-time admin update
        const io = req.app.get('socketio');
        io.emit('new-order', order);

        res.status(201).json({ success: true, data: order });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// Get All Orders (Admin)
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort('-createdAt');
        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Get Single Order
exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }

        res.status(200).json({ success: true, data: order });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// Update Order Status (Admin)
exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }

        // Emit socket event for real-time status update to customer
        const io = req.app.get('socketio');
        io.to(order._id.toString()).emit('order-status-update', order);

        res.status(200).json({ success: true, data: order });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
