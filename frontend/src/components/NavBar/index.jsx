import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const NavBar = () => {
  return (
    <header className="nb">
      <div className="nb-inner">
        <div className="nb-brand">ShopHub Admin</div>
        <nav className="nb-nav">
            <Link className="nb-link" to="/dashboard">Dashboard</Link>
            <Link className="nb-link nb-active" to="/productos">Productos</Link>
            <Link className="nb-link" to="/pedidos">Pedidos</Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;


