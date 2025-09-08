import React from 'react';
import './styles.css';

const NavBar = () => {
  return (
    <header className="nb">
      <div className="nb-inner">
        <div className="nb-brand">ShopHub Admin</div>
        <nav className="nb-nav">
          <a className="nb-link" href="#">Dashboard</a>
          <a className="nb-link nb-active" href="#">Productos</a>
          <a className="nb-link" href="#">Pedidos</a>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;


