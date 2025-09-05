import React from 'react';
import './styles.css';

const Breadcrumb = () => {
  return (
    <nav className="breadcrumb">
      <a href="home.html">Inicio</a>
      <span className="breadcrumb-separator">›</span>
      <a href="productos.html">Productos</a>
      <span className="breadcrumb-separator">›</span>
      <a href="#">Tecnología</a>
      <span className="breadcrumb-separator">›</span>
      <span>iPhone 15 Pro</span>
    </nav>
  );
};

export default Breadcrumb;
