import './styles.css';

export const Header = () => {
  return (
    <header>
      <nav class="navbar">
        <div class="nav-container">
            <a href="home.html" class="logo">
                <div class="logo-icon">🛍️</div>
                <span>ShopHub</span>
            </a>
            
            <div class="header-search">
                <input 
                    type="text" 
                    class="header-search-input" 
                    placeholder="Buscar productos..."
                    id="headerSearchInput"
                />
                <button class="header-search-btn" id="headerSearchBtn">
                    🔍
                </button>
            </div>
            
            <div class="nav-links">
                <a href="home.html" class="nav-link">Inicio</a>
                <a href="productos.html" class="nav-link">Productos</a>
                <a href="login.html" class="btn-secondary">Iniciar Sesión</a>
                <a href="register.html" class="btn-primary">Crear Cuenta</a>
            </div>
        </div>
    </nav>
    </header>
  );
}