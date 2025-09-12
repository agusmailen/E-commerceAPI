import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import dbData from '../../../json-server/db.json';

const Breadcrumb = () => {
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    // Tomar el primer producto del JSON como ejemplo
    if (dbData.productos && dbData.productos.length > 0) {
      setProducto(dbData.productos[0]);
    }
  }, []);

  if (!producto) {
    return (
      <nav className="breadcrumb">
        <Link to="/">Inicio</Link>
        <span className="breadcrumb-separator">›</span>
        <Link to="/products">Productos</Link>
      </nav>
    );
  }

  return (
    <nav className="breadcrumb">
      <Link to="/">Inicio</Link>
      <span className="breadcrumb-separator">›</span>
      <Link to="/products">Productos</Link>
    </nav>
  );
};

export default Breadcrumb;
