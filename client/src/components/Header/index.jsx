import './styles.css';

import React from 'react';

export const Header = () => {
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
            <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>Inicio</a>
            <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>Productos</a>
            <a href="#" className="btn-secondary" onClick={(e) => e.preventDefault()}>Iniciar Sesión</a>
            <a href="#" className="btn-primary" onClick={(e) => e.preventDefault()}>Crear Cuenta</a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;