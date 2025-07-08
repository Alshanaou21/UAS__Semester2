const express = require('express');
const router = express.Router();
const pool = require('../db');

// Add a new order
router.post('/orders', async (req, res) => {
  const { product_name, quantity, price } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO orders (product_name, quantity, price) VALUES ($1, $2, $3) RETURNING *',
      [product_name, quantity, price]
    );
    res.json({ success: true, order: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to add order' });
  }
});

// Get list of orders
router.get('/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY order_date DESC');
    res.json({ success: true, orders: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
});

module.exports = router;
