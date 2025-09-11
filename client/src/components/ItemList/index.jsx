import './styles.css';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ItemList = ({item}) => {
  console.log(item);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(false);
  
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
  
  const {
    imagen,
    nombre,
    descripcion,
    precio,
    stock
  } = item;

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click when button is clicked
    if (!isAuthenticated) {
      // Store product info for post-login cart addition
      localStorage.setItem('pendingCartItem', JSON.stringify({ product: item, quantity: 1 }));
      navigate('/login');
      return;
    }
    
    addToCart(item, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleCardClick = () => {
    navigate(`/product/${item.id}`);
  };

  return (
      <div className="product-list-card" onClick={handleCardClick}>
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
                  style={{ 
                    background: isAdded ? '#10b981' : ''
                  }}
                >
                  {isAdded ? '✅ Agregado' : '+ Agregar al Carrito'}
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