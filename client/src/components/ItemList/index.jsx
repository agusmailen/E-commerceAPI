import './styles.css';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

const ItemList = ({item}) => {
  console.log(item);
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  
  const {
    imagen,
    nombre,
    descripcion,
    precio,
    stock
  } = item;

  const handleAddToCart = () => {
    addToCart(item, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };
  return (
      <div className="product-list-card">
        <div className="product-list-image">
            <img src={imagen} alt="Producto" />
        </div>
        <div className="product-list-info">
          <h3 className="product-list-title">{nombre}</h3>
          <p className="product-list-description">{descripcion}</p>
          <div className="product-list-price-section">
            <div>
              <span className="product-list-price">${precio}</span>
            </div>
          </div>
          <div className="product-list-actions">
            {
              stock > 0 ? 
                <button 
                  className="add-to-cart-btn"
                  onClick={handleAddToCart}
                  style={{ background: isAdded ? '#10b981' : '' }}
                >
                  {isAdded ? '✅ Agregado al Carrito' : '🛒 Agregar al Carrito'}
                </button>
              : <button className="add-to-cart-btn out-of-stock-btn" disabled>
                  Sin stock
                </button>
            }
          </div>
        </div>
      </div>
  );
};

export default ItemList;