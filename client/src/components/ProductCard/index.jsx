import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="pc-card" onClick={handleClick}>
      <div className="pc-image">
        <img src={product.imagen} alt={product.nombre} />
      </div>
      <div className="pc-info">
        <h3 className="pc-title">{product.nombre}</h3>
        <p className="pc-description">{product.descripcion}</p>
        <div className="pc-price">${product.precio}</div>
        <button className="pc-view-btn">
          Ver Producto
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
