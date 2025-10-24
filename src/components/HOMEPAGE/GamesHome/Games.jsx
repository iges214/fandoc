import React from 'react';
import '../Styles.css';
import { useNavigate } from 'react-router-dom';
import { useToys } from '../../Hooks/UseData';


export default function Women({onSeeAll }) {
  const navigate = useNavigate();
  const { toys, loading, error } = useToys(); // Get all toys

  const handleAddToCart = (productId, e) => {
    e.stopPropagation();
    console.log('Added to cart:', productId);
  };

  const handleImageClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Filter products for women locally
  const Games = toys.filter(toy => toy.category.includes('Games'));

  if (loading) {
    return (
      <div className="popular-products">
        <div className="popular-header">
          <h2 className="popular-title">Games</h2>
        </div>
        <div className="loading" style={{padding: '40px', textAlign: 'center'}}>
          Loading women's products...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="popular-products">
        <div className="popular-header">
          <h2 className="popular-title">Games</h2>
        </div>
        <div className="error" style={{padding: '40px', textAlign: 'center'}}>
          Error loading products
        </div>
      </div>
    );
  }

  return (
      <div className="popular-products">
      <div className="popular-header">
        <div className="header-left">
          <h2 className="popular-title">Games</h2>
        </div>
        <div className="header-right">
          <button 
            className="see-all-btn"
            onClick={() => onSeeAll('Games')}
          >
            see all ›
          </button>
        </div>
      </div>

      <div className="products-grid">
        {Games.slice(0, 5).map((product) => (
          <div key={product.id} className="product-card">
            <div 
              className="product-image-container"
              onClick={() => handleImageClick(product.id)}
              style={{cursor: 'pointer'}}
            >
              <img 
                src={`/images/${product.image}`} 
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">₦{product.price.toLocaleString()}</p>
              <button 
                className="add-to-cart-btn"
                onClick={(e) => handleAddToCart(product.id, e)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}