import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MobileNavbar.css';

export default function MobileNavbar({ onCategoriesClick, onHomeClick, currentView = 'home' }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Only show on homepage
  if (location.pathname !== '/') {
    return null;
  }

  const navItems = [
    { id: 1, name: 'Home', icon: '🏠', path: '/', view: 'home' },
    { id: 2, name: 'Categories', icon: '📁', path: '#categories', view: 'categories' },
    { id: 3, name: 'Account', icon: '👤', path: '/account', view: 'account' },
    { id: 4, name: 'Help', icon: '❓', path: '/help', view: 'help' },
    { id: 5, name: 'Cart', icon: '🛒', path: '/cart', view: 'cart' }
  ];

  const handleNavClick = (path, name, view) => {
    if (name === 'Home') {
      if (onHomeClick) {
        onHomeClick();
      }
    } else if (name === 'Categories') {
      if (onCategoriesClick) {
        onCategoriesClick();
      }
    } else if (path.startsWith('/')) {
      navigate(path);
    }
  };

  const isActive = (item) => {
    // For Home and Categories, check against currentView prop
    if (item.name === 'Home' || item.name === 'Categories') {
      return currentView === item.view;
    }
    // For other items, check against current path
    return location.pathname === item.path;
  };

  return (
    <div className="mobile-navbar">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`mobile-nav-item ${isActive(item) ? 'active' : ''}`}
          onClick={() => handleNavClick(item.path, item.name, item.view)}
        >
          <span className="mobile-nav-icon">{item.icon}</span>
          <span className="mobile-nav-text">{item.name}</span>
        </button>
      ))}
    </div>
  );
}