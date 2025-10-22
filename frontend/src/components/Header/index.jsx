
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useCart } from '../../context/CartContext';
import SearchBar from '../Search';

import './styles.css';

export const Header = () => {
  const { getCartItemsCount, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check authentication and admin state on component mount and when location changes
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsAuthenticated(authStatus);
      const userStr = localStorage.getItem('usuario');
      let user = null;
      try {
        user = userStr && userStr !== 'undefined' ? JSON.parse(userStr) : null;
      } catch (e) {
        console.warn('Error parsing usuario from storage:', e);
        user = null;
      }
      setIsAdmin(user?.rol === 'admin');
    };

    checkAuth();

    // Listen for storage changes (when logout happens in another tab/window)
    const handleStorageChange = (e) => {
      if (e.key === 'isLoggedIn' || e.key === 'usuario') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [location.pathname]);
  
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('usuario');
    localStorage.removeItem('authToken');
    
    // Clear sessionStorage (in case it's used elsewhere)
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('usuario');
    
    // Clear cart items
    clearCart();
    
    // Update local state immediately
    setIsAuthenticated(false);
    
    // Navigate to login
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <header>
      <nav className="navbar">
        <div className="nav-container">
          <button 
            className="logo" 
            onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <div className="logo-icon">🛍️</div>
            <span>ShopHub</span>
          </button>
          <div className="header-search">
            <SearchBar />
          </div>
          <div className="nav-links">
            <button 
              className={`nav-link ${isActive('/products') ? 'active' : ''}`}
              onClick={() => navigate('/products')}
            >
              Productos
            </button>
            {isAuthenticated && (
              <>
                {isAdmin && (
                  <button
                    className={`btn-primary ${isActive('/admin/products') ? 'active' : ''}`}
                    onClick={() => navigate('/admin/products')}
                  >
                    Gestionar Productos
                  </button>
                )}
                <button 
                  className={`cart-button ${isActive('/cart') ? 'active' : ''}`}
                  onClick={() => navigate('/cart')}
                >
                  🛒 Carrito ({getCartItemsCount()})
                </button>
                <button className="btn-secondary" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <button 
                  className="nav-link"
                  onClick={() => navigate('/login')}
                >
                  Iniciar Sesión
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => navigate('/register')}
                >
                  Registrarse
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;