const Booking = require('../models/Booking');

// Create New Booking
exports.createBooking = async (req, res) => {
    try {
        const booking = await Booking.create(req.body);

        // Emit socket event for admin notification
        const io = req.app.get('socketio');
        io.emit('new-booking', booking);

        res.status(201).json({ success: true, data: booking });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// Get All Bookings (Admin)
exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort('-createdAt');
        res.status(200).json({ success: true, count: bookings.length, data: bookings });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Update Booking Status (Admin)
exports.updateBookingStatus = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true }
        );

        if (!booking) {
            return res.status(404).json({ success: false, error: 'Booking not found' });
        }

        res.status(200).json({ success: true, data: booking });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
