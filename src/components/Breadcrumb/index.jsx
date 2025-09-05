import React, { useState, useEffect } from 'react';
import './styles.css';
import dbData from '../../data/db.json';

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
        <a href="home.html">Inicio</a>
        <span className="breadcrumb-separator">›</span>
        <a href="productos.html">Productos</a>
        <span className="breadcrumb-separator">›</span>
        <span>Cargando...</span>
      </nav>
    );
  }

  return (
    <nav className="breadcrumb">
      <a href="home.html">Inicio</a>
      <span className="breadcrumb-separator">›</span>
      <a href="productos.html">Productos</a>
      <span className="breadcrumb-separator">›</span>
      <a href="#">{producto.categoria}</a>
      <span className="breadcrumb-separator">›</span>
      <span>{producto.nombre}</span>
    </nav>
  );
};

export default Breadcrumb;
