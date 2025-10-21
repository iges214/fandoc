import React from 'react';
import { useCategories } from '../../../Hooks/UseData';
import './Sidebar.css';

export default function Sidebar ({ onCategorySelect, selectedCategory }) {
  const { categories, loading, error } = useCategories();

  const categoryIcons = {
    'Games': '🎮',
    'BDSM': '⛓️',
    'Strapon': '👙',
    'Wand': '✨',
    'Vibrators': '📳',
    'Suckers': '🌹',
    'Dildos': '🔹',
    '2 in 1': '🔄',
    'Masturbator': '🔥',
    'Roses': '🌹',
    'Anal Plugs': '💎',
    'Cockrings': '💍',
    'Lubes & Cream': '💧',
    'Men': '👨',
    'Women': '👩',
    'Couples': '👫'
  };

  if (loading) {
    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Categories</h3>
          <p className="sidebar-subtitle">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Categories</h3>
          <p className="sidebar-subtitle">Error loading categories</p>
        </div>
      </div>
    );
  }

  const handleCategoryClick = (categoryName) => {
    onCategorySelect(categoryName);
  };

  const handleViewAll = () => {
    onCategorySelect('');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Shop Categories</h3>
        <p className="sidebar-subtitle">Discover your desires</p>
      </div>

      <div className="categories-list">
        <div className="category-item">
          <button
            className={`category-button ${!selectedCategory ? 'active' : ''}`}
            onClick={handleViewAll}
          >
            <span className="category-icon">🏠</span>
            <span className="category-name">All Products</span>
          </button>
        </div>

        {categories.map(category => (
          <div key={category.id} className="category-item">
            <button
              className={`category-button ${selectedCategory === category.name ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <span className="category-icon">
                {categoryIcons[category.name] || '🎁'}
              </span>
              <span className="category-name">{category.name}</span>
            </button>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-promo">
          <p>🔞</p>
        </div>
        <button 
          className="view-all-btn"
          onClick={handleViewAll}
        >
          View All Products
        </button>
      </div>
    </div>
  );
};
