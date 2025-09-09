import './styles.css';

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export const Header = () => {
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => location.pathname === path;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to products page with search parameter
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="nav-container">
          <button 
            className="logo" 
            onClick={() => handleNavigation('/')}
          >
            <div className="logo-icon">🛍️</div>
            <span>ShopHub</span>
          </button>
          <form className="header-search" onSubmit={handleSearch}>
            <input
              type="text"
              className="header-search-input"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
            <button type="submit" className="header-search-btn">
              🔍
            </button>
          </form>
          <div className="nav-links">
            <button 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => handleNavigation('/')}
            >
              Home
            </button>
            <button 
              className={`nav-link ${isActive('/products') ? 'active' : ''}`}
              onClick={() => handleNavigation('/products')}
            >
              Productos
            </button>
            <button 
              className={`cart-button ${isActive('/cart') ? 'active' : ''}`}
              onClick={() => handleNavigation('/cart')}
            >
              🛒 Carrito ({getCartItemsCount()})
            </button>
            <button 
              className={`btn-secondary ${isActive('/login') ? 'active' : ''}`}
              onClick={() => handleNavigation('/login')}
            >
              Iniciar Sesión
            </button>
            <button 
              className={`btn-primary ${isActive('/register') ? 'active' : ''}`}
              onClick={() => handleNavigation('/register')}
            >
              Crear Cuenta
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;