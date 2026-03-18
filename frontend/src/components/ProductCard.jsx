// ProductCard.jsx
// Displays a single product with name, category, price, and the Favorite button.

import FavoriteButton from './FavoriteButton';

function ProductCard({ product, onFavoriteToggle }) {
  return (
    <div className="product-card">
      <span className="category-badge">{product.category}</span>
      <h3>{product.name}</h3>
      <p className="description">{product.description}</p>
      <p className="price">{product.price.toFixed(2)}</p>
      <FavoriteButton
        productId={product._id}
        isFavorited={product.isFavorited}
        onToggle={onFavoriteToggle}
      />
    </div>
  );
}

export default ProductCard;
