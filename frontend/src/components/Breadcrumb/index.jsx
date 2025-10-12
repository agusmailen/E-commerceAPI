import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

// Breadcrumb simplificado: solo Inicio y Productos
const Breadcrumb = () => {
  return (
    <nav className="breadcrumb">
      <Link to="/">Inicio</Link>
      <span className="breadcrumb-separator">›</span>
      <Link to="/products">Productos</Link>
    </nav>
  );
};

export default Breadcrumb;
