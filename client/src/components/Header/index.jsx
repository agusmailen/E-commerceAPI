import './styles.css';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export const Header = ({ currentView, setCurrentView }) => {
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('usuario');
    navigate('/login');
  };
  return (
    <header>
      <nav className="navbar">
        <div className="nav-container">
          <a href="#" className="logo" onClick={(e) => e.preventDefault()}>
            <div className="logo-icon">🛍️</div>
            <span>ShopHub</span>
          </a>
          <div className="header-search">
            <input
              type="text"
              className="header-search-input"
              placeholder="Buscar productos..."
            />
            <button className="header-search-btn">
              🔍
            </button>
          </div>
          <div className="nav-links">
            <button 
              className={`nav-link ${currentView === 'productos' ? 'active' : ''}`}
              onClick={() => setCurrentView('productos')}
            >
              Productos
            </button>
            <button 
              className={`cart-button ${currentView === 'carrito' ? 'active' : ''}`}
              onClick={() => setCurrentView('carrito')}
            >
              🛒 Carrito ({getCartItemsCount()})
            </button>
            <button className="btn-secondary" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;