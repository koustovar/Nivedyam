const Menu = require('../models/Menu');

// Get All Menu Items
exports.getMenu = async (req, res) => {
    try {
        const menu = await Menu.find({ isAvailable: true });
        res.status(200).json({ success: true, count: menu.length, data: menu });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Create Menu Item (Admin)
exports.createMenuItem = async (req, res) => {
    try {
        const menuItem = await Menu.create(req.body);
        res.status(201).json({ success: true, data: menuItem });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// Update Menu Item (Admin)
exports.updateMenuItem = async (req, res) => {
    try {
        const menuItem = await Menu.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!menuItem) {
            return res.status(404).json({ success: false, error: 'Item not found' });
        }

        res.status(200).json({ success: true, data: menuItem });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// Delete Menu Item (Admin)
exports.deleteMenuItem = async (req, res) => {
    try {
        const menuItem = await Menu.findByIdAndDelete(req.params.id);

        if (!menuItem) {
            return res.status(404).json({ success: false, error: 'Item not found' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
