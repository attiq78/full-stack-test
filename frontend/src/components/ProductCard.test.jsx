import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductCard from './ProductCard';

describe('ProductCard component', () => {
  const mockProduct = {
    _id: '123',
    name: 'Test Product',
    category: 'electronics',
    price: 99.99,
    description: 'A test product description',
    isFavorited: false,
  };

  it('renders product details correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('electronics')).toBeInTheDocument();
    expect(screen.getByText('A test product description')).toBeInTheDocument();
    
    // BUG E (Intentional): The test expects the price to be exactly "$99.99"
    // but the component might format it differently or the candidate might
    // have changed the rendering.
    // Hint: check how toFixed(2) and the "$" prefix are handled.
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('renders the favorite button', () => {
    render(<ProductCard product={mockProduct} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Add to Favorites/i);
  });
});
