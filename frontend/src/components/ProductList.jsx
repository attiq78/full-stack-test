// ProductList.jsx
// Fetches all products from the backend and renders them in a grid.
// Supports filtering by category.
//
// ─────────────────────────────────────────────────────────
// TASK 1 — DEBUGGING
//
// The category filter does NOT work correctly.
// When you select a category from the dropdown, all products
// still appear (or no products appear).
//
// Hint: Look carefully at how the query parameter is sent
//       to the backend, and how the backend reads it.
// ─────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const CATEGORIES = ['All', 'shoes', 'electronics', 'clothing'];

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchProducts = async (category) => {
    setLoading(true);
    setError(null);
    try {
      // BUG: Query param key uses capital 'C' — should be ?category=...
      const query = category !== 'All' ? `?category=${category.toLowerCase()}` : '';
      const res = await fetch(`${API_URL}/api/products${query}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to fetch products');
      setProducts(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const handleFavoriteToggle = (productId, updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === productId ? updatedProduct : p))
    );
  };

  return (
    <div>
      <div className="controls">
        <label htmlFor="category-filter">Filter by Category:</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'All' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="status-message">Loading products...</p>}
      {error && <p className="status-message error">Error: {error}</p>}

      {!loading && !error && (
        <>
          <p className="count-bar">{products.length} product{products.length !== 1 ? 's' : ''} found</p>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
          {products.length === 0 && (
            <p className="status-message">No products found for this category.</p>
          )}
        </>
      )}
    </div>
  );
}

export default ProductList;
