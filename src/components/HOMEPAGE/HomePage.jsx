import { useState, useRef, useEffect } from 'react';
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
import { useCategories } from '../Hooks/UseData';
import { useCategoryViewData } from '../Hooks/useCategoryViewData';
import './HomePage.css';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  const [seeAllCategory, setSeeAllCategory] = useState('');
  const { categories } = useCategories();

  // Refs for scrolling to top
  const desktopCategoryViewRef = useRef(null);
  const mobileCategoriesViewRef = useRef(null);

  // Use the new hook that fetches all data
  const {
    selectedCategoryToys,
    toysByOtherCategories,
    allToys,
    otherCategories,
    loading,
    error
  } = useCategoryViewData(selectedCategory);

  // Function to shuffle array randomly
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Scroll to top when category changes
  useEffect(() => {
    if (selectedCategory || seeAllCategory) {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [selectedCategory, seeAllCategory]);

  const handleCategorySelect = (category) => {
    // console.log('Category selected in HomePage:', category);
    setSelectedCategory(category);
    setShowMobileCategories(false);
    setSeeAllCategory('');
  };

  const handleMobileCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setSeeAllCategory('');
  };

  // Handle "See All" from desktop category sections
  const handleSeeAll = (categoryName) => {
    setSeeAllCategory(categoryName);
    setSelectedCategory(categoryName);
  };

  const handleBackToCategories = () => {
    setSeeAllCategory('');
    // Keep the category selected for sidebar highlighting
  };

  const clearFilter = () => {
    setSelectedCategory('');
    setShowMobileCategories(false);
    setSeeAllCategory('');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleMobileCategoriesClick = () => {
    setSelectedCategory('Games');
    setShowMobileCategories(true);
    setSeeAllCategory('');
  };

  const handleMobileHomeClick = () => {
    setSelectedCategory('');
    setShowMobileCategories(false);
    setSeeAllCategory('');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Get products for mobile view
  const productsForMobile = selectedCategory ? selectedCategoryToys : allToys || [];
  const shuffledProducts = shuffleArray(productsForMobile);

  // Get all categories in original order
  const allCategoriesList = categories.map(cat => cat.name);

  // Get products for all categories
  const getAllCategoryProducts = () => {
    if (!selectedCategory) {
      return {};
    }
    
    const allCategoryProducts = {};
    
    // Add selected category first
    allCategoryProducts[selectedCategory] = selectedCategoryToys;
    
    // Add all other categories
    otherCategories.forEach(category => {
      allCategoryProducts[category.name] = toysByOtherCategories[category.name] || [];
    });
    
    return allCategoryProducts;
  };

  const allCategoryProducts = getAllCategoryProducts();

  // Get category section order
  const getCategorySectionOrder = () => {
    if (!selectedCategory) {
      return allCategoriesList;
    }
    
    const orderedCategories = [selectedCategory];
    
    allCategoriesList.forEach(categoryName => {
      if (categoryName !== selectedCategory) {
        orderedCategories.push(categoryName);
      }
    });
    
    return orderedCategories;
  };

  const categorySectionOrder = getCategorySectionOrder();

  // Get products for the "see all" category
  const getSeeAllProducts = () => {
    if (!seeAllCategory) return [];
    
    // Check if it's the main selected category
    if (seeAllCategory === selectedCategory) {
      return selectedCategoryToys;
    }
    
    // Check other categories
    return toysByOtherCategories[seeAllCategory] || [];
  };

  const seeAllProducts = getSeeAllProducts();

  // Render Desktop See All View
  const renderDesktopSeeAllView = () => {
    return (
      <div className="desktop-see-all-view">
        <div className="desktop-see-all-header">
          <button onClick={handleBackToCategories} className="back-btn">← Category List</button>
          <h2>{seeAllCategory} Collection</h2>
          {/* <div className="category-name">{seeAllCategory}</div> */}
        </div>

        {loading ? (
          <div className="loading">Loading {seeAllCategory} products...</div>
        ) : error ? (
          <div className="error">Error loading products: {error}</div>
        ) : seeAllProducts.length === 0 ? (
          <div className="no-products">
            <h3>No products found in {seeAllCategory} category</h3>
          </div>
        ) : (
          <div className="desktop-see-all-products">
            {seeAllProducts.map(product => (
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
                  {/* <p className="product-description">{product.description}</p> */}
                  
                  {/* Product Categories */}
                  {/* <div className="product-categories">
                    {product.category.map(cat => (
                      <span key={cat} className="category-tag">{cat}</span>
                    ))}
                  </div> */}
                  
                  {/* Product Features */}
                  {/* <div className="product-features">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    ))}
                  </div> */}
                  
                  {/* <button className="view-details-btn">View Details</button> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render Mobile See All View
  const renderMobileSeeAllView = () => {
    return (
      <div className="see-all-view">
        {/* Categories Filter Row */}
        <div className="mobile-categories-filter">
          <div className="mobile-categories-scroll">
            {allCategoriesList.map(categoryName => (
              <button
                key={categoryName}
                className={`mobile-category-filter-btn ${seeAllCategory === categoryName ? 'active' : ''}`}
                onClick={() => handleSeeAll(categoryName)}
              >
                {categoryName}
              </button>
            ))}
          </div>
        </div>

        {/* Category Header with Back Button */}
        <div className="see-all-header">
          <button onClick={handleBackToCategories} className="back-btn">← Back to Categories</button>
          <h2>{seeAllCategory} Collection</h2>
          {/* <div className="category-name">{seeAllCategory}</div> */}
        </div>

        {/* All Products Grid */}
        {loading ? (
          <div className="loading">Loading {seeAllCategory} products...</div>
        ) : error ? (
          <div className="error">Error loading products: {error}</div>
        ) : seeAllProducts.length === 0 ? (
          <div className="no-products">
            <h3>No products found in {seeAllCategory} category</h3>
          </div>
        ) : (
          <div className="see-all-products-grid">
            {seeAllProducts.map(product => (
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
        )}
      </div>
    );
  };

  // Main rendering logic
  const renderContent = () => {
    // See All View (Both Desktop and Mobile)
    if (seeAllCategory) {
      return (
        <>
          {/* Desktop See All View */}
          <div className="desktop-see-all-container">
            {renderDesktopSeeAllView()}
          </div>
          
          {/* Mobile See All View */}
          <div className="mobile-see-all-container">
            {renderMobileSeeAllView()}
          </div>
        </>
      );
    }

    // Mobile Categories View
    if (showMobileCategories) {
      return (
        <div className="mobile-categories-view" ref={mobileCategoriesViewRef}>
          {/* Categories Filter Row */}
          <div className="mobile-categories-filter">
            <div className="mobile-categories-scroll">
              {allCategoriesList.map(categoryName => (
                <button
                  key={categoryName}
                  className={`mobile-category-filter-btn ${selectedCategory === categoryName ? 'active' : ''}`}
                  onClick={() => handleMobileCategorySelect(categoryName)}
                >
                  {categoryName}
                </button>
              ))}
            </div>
          </div>

          {/* Show all categories with their products */}
          {categorySectionOrder.map((categoryName, index) => {
            const categoryProducts = allCategoryProducts[categoryName] || [];
            const isFirstCategory = index === 0;
            
            return (
              <div 
                key={categoryName} 
                className={`mobile-category-section ${isFirstCategory ? 'first-category' : ''}`}
                id={`category-${categoryName}`}
              >
                <div className="popular-header">
                  <div className="header-left">
                    <h2 className="popular-title">{categoryName}</h2>
                  </div>
                  <div className="header-right">
                    <button 
                      className="see-all-btn"
                      onClick={() => handleSeeAll(categoryName)}
                    >
                      see all ›
                    </button>
                  </div>
                </div>

                {loading ? (
                  <div className="loading">Loading {categoryName} products...</div>
                ) : error ? (
                  <div className="error">Error loading products: {error}</div>
                ) : categoryProducts.length === 0 ? (
                  <div className="no-products">
                    <h3>No products found in {categoryName} category</h3>
                  </div>
                ) : (
                  <div className="mobile-categories-products">
                    {categoryProducts.slice(0, 5).map(product => (
                      <div key={product.id} className="mobile-category-product-card">
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
                )}
              </div>
            );
          })}
        </div>
      );
    }

    // Desktop Category View (from sidebar)
    if (selectedCategory && !showMobileCategories) {
      return (
        <div className="category-full-view" ref={desktopCategoryViewRef}>
          {/* Mobile View - Full width category display */}
          <div className="category-full-view-mobile">
            <div className="category-header">
              <button onClick={clearFilter} className="back-btn">← Back to Home</button>
              <h2>{selectedCategory} Collection</h2>
              <div className="product-count">{selectedCategoryToys.length} products</div>
            </div>
            
            {loading ? (
              <div className="loading">Loading {selectedCategory} products...</div>
            ) : error ? (
              <div className="error">Error loading products: {error}</div>
            ) : selectedCategoryToys.length === 0 ? (
              <div className="no-products">
                <h3>No products found in {selectedCategory} category</h3>
                <p>Try selecting a different category</p>
              </div>
            ) : (
              <div className="filtered-products-grid">
                {selectedCategoryToys.map(toy => (
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

          {/* Desktop View - Category layout with sidebar and categories list */}
          <div className="desktop-category-view">
            <div className="content-container category-layout">
              <aside className="sidebar-container fixed-sidebar">
                <Sidebar 
                  onCategorySelect={handleCategorySelect}
                  selectedCategory={selectedCategory}
                />
              </aside>
              
              <main className="category-main-content">
                {/* Selected Category Section */}
                <div className="category-section">
                  <div className="popular-header">
                    <div className="header-left">
                      <h2 className="popular-title">{selectedCategory}</h2>
                    </div>
                    <div className="header-right">
                      <button 
                        className="see-all-btn"
                        onClick={() => handleSeeAll(selectedCategory)}
                      >
                        see all ›
                      </button>
                    </div>
                  </div>

                  {loading ? (
                    <div className="loading">Loading {selectedCategory} products...</div>
                  ) : error ? (
                    <div className="error">Error loading products: {error}</div>
                  ) : selectedCategoryToys.length === 0 ? (
                    <div className="no-products">
                      <h3>No products found in {selectedCategory} category</h3>
                      <p>Try selecting a different category</p>
                    </div>
                  ) : (
                    <div className="products-grid">
                      {selectedCategoryToys.slice(0, 5).map((product) => (
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
                  )}
                </div>

                {/* Other Categories Sections */}
                <div className="other-categories">
                  {otherCategories.map(category => {
                    const categoryProducts = toysByOtherCategories[category.name] || [];
                    return (
                      <div key={category.id} className="category-section">
                        <div className="popular-header">
                          <div className="header-left">
                            <h2 className="popular-title">{category.name}</h2>
                          </div>
                          <div className="header-right">
                            <button 
                              className="see-all-btn"
                              onClick={() => handleSeeAll(category.name)}
                            >
                              see all ›
                            </button>
                          </div>
                        </div>
                        
                        {categoryProducts.length === 0 ? (
                          <div className="no-products">
                            <h3>No products found in {category.name} category</h3>
                          </div>
                        ) : (
                          <div className="products-grid">
                            {categoryProducts.slice(0, 5).map((product) => (
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
                        )}
                      </div>
                    );
                  })}
                </div>
              </main>
            </div>
          </div>
        </div>
      );
    }

    // Normal Homepage Layout
    return (
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
            {/* <div className="header-right"> */}
              {/* <button className="see-all-btn">
                see all ›
              </button> */}
            {/* </div> */}
          </div>
          
          {/* Make sure allToys is available and not empty */}
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : error ? (
            <div className="error">Error loading products: {error}</div>
          ) : (!allToys || allToys.length === 0) ? (
            <div className="no-products">
              <h3>No products available</h3>
            </div>
          ) : (
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
          )}
        </div>

        {/* Hide these sections on mobile */}
        <div className="desktop-sections">
          <PopularProducts onSeeAll={handleSeeAll} />
          <Men onSeeAll={handleSeeAll} />
          <Women onSeeAll={handleSeeAll} />
          <Games onSeeAll={handleSeeAll} />
          <Couples onSeeAll={handleSeeAll} />
        </div>
      </>
    );
  };

  return (
    <div>
      <TopBanner/>
      <div className="App">
        <Navbar 
          onHomeClick={clearFilter}
          showHomeButton={!!selectedCategory || showMobileCategories || !!seeAllCategory}
        />
        
        {renderContent()}
      </div>
      <Footer/>

      {/* Add Mobile Navbar */}
      <MobileNavbar 
        onCategoriesClick={handleMobileCategoriesClick}
        onHomeClick={handleMobileHomeClick}
        currentView={showMobileCategories ? 'categories' : (seeAllCategory ? 'see-all' : 'home')}
      />
    </div>
  );
}