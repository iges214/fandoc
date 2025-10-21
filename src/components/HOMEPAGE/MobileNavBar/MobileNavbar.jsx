import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MobileNavbar.css';

export default function MobileNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Only show on homepage
  if (location.pathname !== '/') {
    return null;
  }

  const navItems = [
    { id: 1, name: 'Home', icon: '🏠', path: '/', isActive: true },
    { id: 2, name: 'Categories', icon: '📁', path: '#categories' },
    { id: 3, name: 'Account', icon: '👤', path: '/account' },
    { id: 4, name: 'Help', icon: '❓', path: '/help' },
    { id: 5, name: 'Cart', icon: '🛒', path: '/cart' }
  ];

  const handleNavClick = (path, name) => {
    if (name === 'Categories') {
      // Scroll to all products section
      const productsSection = document.querySelector('.all-products-mobile');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (path.startsWith('/')) {
      navigate(path);
    }
    // For Home, do nothing since we're already there
  };

  const isActive = (item) => {
    if (item.name === 'Home') return location.pathname === '/';
    return false;
  };

  return (
    <div className="mobile-navbar">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`mobile-nav-item ${isActive(item) ? 'active' : ''}`}
          onClick={() => handleNavClick(item.path, item.name)}
        >
          <span className="mobile-nav-icon">{item.icon}</span>
          <span className="mobile-nav-text">{item.name}</span>
        </button>
      ))}
    </div>
  );
}