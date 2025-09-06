import './styles.css';

import React, { useState } from 'react';
import './styles.css';

export const Header = ({ setBusqueda, onCreateAccount }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav className="navbar">
        <div className="nav-container">
          <a href="home.html" className="logo">
            <div className="logo-icon">🛍️</div>
            <span>ShopHub</span>
          </a>
          <div className="header-search">
            <input
              type="text"
              className="header-search-input"
              placeholder="Buscar productos..."
              onChange={e => setBusqueda(e.target.value)}
            />
            <button className="header-search-btn">
              🔍
            </button>
          </div>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            <span />
            <span />
            <span />
          </button>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="home.html" className="nav-link">Inicio</a>
            <a href="productos.html" className="nav-link">Productos</a>
            <a href="login.html" className="btn-secondary">Iniciar Sesión</a>
            <button onClick={onCreateAccount} className="btn-primary">Crear Cuenta</button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;