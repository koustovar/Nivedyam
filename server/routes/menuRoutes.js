const express = require('express');
const router = express.Router();
const {
    getMenu,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
} = require('../controllers/menuController');

// For simplicity, I'm not adding auth middleware yet, will add later
router.route('/').get(getMenu).post(createMenuItem);
router.route('/:id').put(updateMenuItem).delete(deleteMenuItem);

module.exports = router;
