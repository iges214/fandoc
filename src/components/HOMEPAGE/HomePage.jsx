import { useState } from 'react';
import TopBanner from './TopBanner/TopBanner';
import Navbar from "./Navbar/navbar";
import Sidebar from "./Third-3in1-Layout/Sidebar/Sidebar";
import CenterLayout from "./Third-3in1-Layout/CenterSlide/CenterLayout";
import RightInfo from "./Third-3in1-Layout/RightInfo/RightInfo";
import PopularProducts from "./PopularHome/Popular";
import Men from "./MenHome/Men";
import Women from "./WomenHome/Women";
import Games from "./GamesHome/Games";
import Couples from "./CouplesHome/Couples";
import MobileNavbar from './MobileNavBar/MobileNavbar';
import Footer from "./Footer/Footer";
import { useToys } from '../Hooks/UseData';
import './HomePage.css';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const { toys, loading, error } = useToys(selectedCategory);

    // Function to shuffle array randomly
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };


  const handleCategorySelect = (category) => {
    console.log('Category selected in HomePage:', category);
    setSelectedCategory(category);
  };

  const clearFilter = () => {
    setSelectedCategory('');
  };

    // Get shuffled products for mobile view
  const shuffledProducts = shuffleArray(toys);

  return (
    <div>
      <TopBanner/>
      <div className="App">
        <Navbar/>
        
        {/* Show filtered products or normal layout */}
{selectedCategory ? (
  <div className="category-full-view">
    <div className="category-header">
      <button onClick={clearFilter} className="back-btn">← Back to Home</button>
      <h2>{selectedCategory} Collection</h2>
      <div className="product-count">{toys.length} products</div>
    </div>
    
    {loading ? (
      <div className="loading">Loading {selectedCategory} products...</div>
    ) : error ? (
      <div className="error">Error loading products: {error}</div>
    ) : toys.length === 0 ? (
      <div className="no-products">
        <h3>No products found in {selectedCategory} category</h3>
        <p>Try selecting a different category</p>
      </div>
    ) : (
      <div className="filtered-products-grid">
        {toys.map(toy => (
          <div key={toy.id} className="product-card">
            <img 
              src={`/images/${toy.image}`} 
              alt={toy.name}
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-name">{toy.name}</h3>
              <p className="product-price">₦{toy.price.toLocaleString()}</p>
              <p className="product-description">{toy.description}</p>
              
              {/* Product Categories */}
              <div className="product-categories">
                {toy.category.map(cat => (
                  <span key={cat} className="category-tag">{cat}</span>
                ))}
              </div>
              
              {/* Product Features */}
              <div className="product-features">
                {toy.features.slice(0, 3).map((feature, index) => (
                  <span key={index} className="feature-tag">{feature}</span>
                ))}
              </div>
              
              <button className="view-details-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
        ) : (
          /* Normal 3-in-1 layout when no category is selected */
          <>
               <div className="content-container">
              <aside className="sidebar-container">
                <Sidebar 
                  onCategorySelect={handleCategorySelect}
                  selectedCategory={selectedCategory}
                />
              </aside>
              <main className="main-content">
                <CenterLayout />
              </main>
              <aside className="right-container">
                <div className="content-placeholder">
                  <RightInfo />
                </div>
              </aside>
            </div>

            {/* Mobile-only all products grid */}
          <div className='mobile-products-ALL'>
             <div className="popular-header">
               <div className="header-left">
                  <h2 className="popular-title">All Products</h2>
               </div>
               <div className="header-right">
                  <button className="see-all-btn">
                  see all ›
                 </button>
              </div>
            </div>
            <div className="all-products-mobile">
              {shuffledProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <img 
                      src={`/images/${product.image}`} 
                      alt={product.name}
                      className="product-image"
                    />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">₦{product.price.toLocaleString()}</p>
                    <button className="add-to-cart-btn">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

            {/* Hide these sections on mobile */}
            <div className="desktop-sections">
            <PopularProducts />
            <Men />
            <Women />
            <Games />
            <Couples />
            </div>
          </>
        )}
      </div>
      <Footer/>

        {/* Add Mobile Navbar */}
      <MobileNavbar />
    </div>
  );
}