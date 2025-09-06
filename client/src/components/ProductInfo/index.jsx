import React, { useState, useEffect } from 'react';
import './styles.css';
import dbData from '../../../json-server/db.json';

const ProductInfo = () => {
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    // Tomar el primer producto del JSON como ejemplo
    if (dbData.productos && dbData.productos.length > 0) {
      setProducto(dbData.productos[0]);
    }
  }, []);

  if (!producto) {
    return <div className="product-info">Cargando producto...</div>;
  }

  return (
    <div className="product-info">
      <h1 className="product-title">{producto.nombre}</h1>
      <div className="product-price">${producto.precio}</div>
      <p className="product-description">
        {producto.descripcion}
      </p>
      <div className="product-details">
        <h3>Detalles del producto:</h3>
        <ul>
          {Object.entries(producto.detalles).map(([key, value]) => (
            <li key={key}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductInfo;
