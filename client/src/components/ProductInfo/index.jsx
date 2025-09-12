import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';

const ProductInfo = ({ onProductLoaded }) => {
  const [producto, setProducto] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/productos/${id}`);
        if (response.ok) {
          const productData = await response.json();
          setProducto(productData);
          // Notify parent component that product is loaded
          if (onProductLoaded) {
            onProductLoaded(productData);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, onProductLoaded]);

  if (!producto) {
    return <div className="pi-container">Cargando producto...</div>;
  }

  return (
    <div className="pi-container">
      <h1 className="pi-title">{producto.nombre}</h1>
      <div className="pi-price">${producto.precio}</div>
      <p className="pi-description">
        {producto.descripcion}
      </p>
      <div className="pi-details">
        <h3>Detalles del producto:</h3>
        <ul>
          {Object.entries(producto.detalles).map(([key, value]) => (
            <li key={key}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
      {producto.stock === 0 ? (
        <button className="sin-stock-btn" disabled>
          Sin stock
        </button>
      ) : (
        <>
          {/* Aquí iría el botón de agregar al carrito y el quantityselector */}
          {/* <QuantitySelector ... /> */}
          {/* <button>Agregar al carrito</button> */}
        </>
      )}
    </div>
  );
};

export default ProductInfo;
