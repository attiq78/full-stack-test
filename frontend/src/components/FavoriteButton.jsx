// FavoriteButton.jsx
// A button to toggle the favorite status of a product.
//
// ─────────────────────────────────────────────────────────
// TASK 3 — THIS COMPONENT IS NOT FULLY IMPLEMENTED.
//
// Currently this button calls POST /api/products/:id/favorite
// but the backend returns 501 Not Implemented.
//
// Your tasks:
//   1. Implement the backend route  POST /api/products/:id/favorite
//      so it toggles the `isFavorited` field on the product in MongoDB
//      and returns the updated product.
//   2. Update this component so that after a successful toggle,
//      the button state updates immediately in the UI (optimistic update
//      or re-fetch — your choice, but explain your decision).
// ─────────────────────────────────────────────────────────

import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function FavoriteButton({ productId, isFavorited, onToggle }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/products/${productId}/favorite`, {
        method: 'POST',
      });
      const data = await res.json();

      if (!res.ok) {
        alert(`Error: ${data.message}`);
        return;
      }

      if (onToggle) onToggle(productId, data.data);
    } catch (err) {
      alert('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
      onClick={handleClick}
      disabled={loading}
      id={`favorite-btn-${productId}`}
    >
      {isFavorited ? '❤️ Favorited' : '🤍 Add to Favorites'}
    </button>
  );
}

export default FavoriteButton;
