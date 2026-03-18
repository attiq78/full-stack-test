const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ─────────────────────────────────────────────
// GET /api/products
// Returns a list of products.
// Supports optional ?category= query param for filtering.
// ─────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const filter = { status: 'Active' }; // BUG A: should be 'active' (lowercase) — status is stored lowercase

    // BUG B: req.query.Category — capital 'C' will never match the query param ?category=
    if (req.query.Category) {
      filter.category = req.query.Category;
    }

    const products = await Product.find(filter).sort({ createdAt: 1 }); // BUG C: should be -1 for newest first

    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ─────────────────────────────────────────────
// GET /api/products/:id
// Returns a single product by ID.
// ─────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ─────────────────────────────────────────────
// POST /api/products/:id/favorite
// Toggles the isFavorited flag on a product.
// TODO: This endpoint is not yet implemented.
//       Your task is to implement this correctly.
// ─────────────────────────────────────────────
router.post('/:id/favorite', async (req, res) => {
  // STUB — Not Implemented
  res.status(501).json({ success: false, message: 'Not implemented' });
});

module.exports = router;
