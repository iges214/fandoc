import React, { useState, useEffect } from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import './SingleProduct.css';
import TopBanner from '../HOMEPAGE/TopBanner/TopBanner';
import Navbar from '../HOMEPAGE/Navbar/navbar';

export default function ProductDetail () {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample product data - replace with your actual data
  const product = {
    id: 1,
    name: "Sensual Massager Pro",
    price: 49.99,
    description: "Experience ultimate pleasure with our premium sensual massager. Designed for maximum comfort and satisfaction with multiple vibration patterns and whisper-quiet operation.",
    category: "massagers",
    images: [
      "/images/14.jpeg",
      "/images/18.jpg",
      "/images/1.jpg",
      "/images/2.jpg",
      "/images/19.jpg"
    ]
  };

  // Related products from same category
  const relatedProducts = [
    { id: 2, name: "Deluxe Vibrator", price: 59.99, image: "/images/2.jpg" },
    { id: 3, name: "Mini Massager", price: 34.99, image: "/images/1.jpg" },
    { id: 4, name: "Wireless Wonder", price: 69.99, image: "/images/18.jpg" },
    { id: 5, name: "Premium Pulse", price: 79.99, image: "/images/14.jpeg" },
    { id: 6, name: "Luxury Touch", price: 44.99, image: "/images/19.jpg" }
  ];

  // Auto-slide images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [product.images.length]);

  const handleAddToCart = () => {
    console.log('Added to cart:', product.id);
    // Add your cart logic here
  };

  const handleQuickOrder = () => {
    console.log('Quick order:', product.id);
    // Add quick order logic here
  };

  const handleRelatedProductClick = (relatedProductId) => {
    navigate(`/product/${relatedProductId}`);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
<>
  <TopBanner/>
  <Navbar/>
    <div className="product-detail">

        {/* Main product section */}
        <div className="product-main">

            {/* Left side - Main image */}
            <div className="image-section">
                <div className="main-image-container">
                    <img 
                        src={product.images[currentImageIndex]} 
                        alt={product.name}
                        className="main-image"
                    />
                </div>
            </div>

        
            {/* Right side - Thumbnails and info */}
            <div className="info-section">
              {/* Thumbnail images */}
                <div className="thumbnails">
                    {product.images.slice(0, 4).map((image, index) => (
                    <div 
                        key={index}
                        className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => handleThumbnailClick(index)}
                    >
                        <img src={image} alt={`${product.name} view ${index + 1}`} />
                    </div>
                    ))}
                </div>
        </div>

        <div>
                {/* Product info */}
                <div className="product-info">
                    <h1 className="product-name">{product.name}</h1>
            
                    {/* Price and Add to Cart row */}
                    <div className="price-cart-row">
                        <div className="price">${product.price}</div>
                        <button 
                            className="add-to-cart-btn"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>

                    {/* Quick order section */}
                    <div className="quick-order-section">
                        <p className="quick-order-text">ORDER JUST THIS PRODUCT NOW</p>
                        <button 
                            className="quick-order-btn"
                            onClick={handleQuickOrder}
                        >
                            ORDER NOW
                        </button>
                    </div>

                    {/* Product details link */}
                    <div className="details-link">
                        <button className="details-btn">
                            Product Details/Description ›››
                        </button>
                    </div>
                </div>
            </div>

        </div>

        {/* Related products section */}
        <div className="related-products">
            <h3 className="related-title">more items like this:</h3>
            <div className="related-grid">
                {relatedProducts.map((relatedProduct) => (
                <div 
                    key={relatedProduct.id}
                    className="related-product-card"
                    onClick={() => handleRelatedProductClick(relatedProduct.id)}
                 >
                    <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        className="related-product-image"
                    />
                    <div className="related-product-info">
                        <p className="related-product-name">{relatedProduct.name}</p>
                        <p className="related-product-price">${relatedProduct.price}</p>
                    </div>
                </div>
              ))}
           </div>
      </div>
    </div>
</>
  );
};
