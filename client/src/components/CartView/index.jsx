import React from 'react';
import { useCart } from '../../context/CartContext';
import './styles.css';

const CartView = ({ setCurrentView }) => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    getCartItemsCount 
  } = useCart();

  const shippingCost = 15.99;
  const subtotal = getCartTotal();
  const total = subtotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="cart-view-container">
        <div className="empty-cart-view">
          <h2>Tu carrito está vacío</h2>
          <p>¡Agrega algunos productos para comenzar!</p>
          <button 
            className="continue-shopping-btn-view"
            onClick={() => setCurrentView('productos')}
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-view-container">
      <h1 className="cart-view-title">Carrito de Compras</h1>
      
      <div className="cart-view-content">
        <div className="cart-items-view">
          <h2>Productos ({getCartItemsCount()} items)</h2>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item-view">
              <div className="cart-item-image-view">
                <img src={item.imagen} alt={item.nombre} />
              </div>
              <div className="cart-item-info-view">
                <h3 className="cart-item-title-view">{item.nombre}</h3>
                <p className="cart-item-description-view">{item.descripcion}</p>
                <div className="cart-item-controls-view">
                  <div className="quantity-controls-view">
                    <button 
                      className="quantity-btn-view"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="quantity-display-view">{item.quantity}</span>
                    <button 
                      className="quantity-btn-view"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button 
                    className="remove-btn-view"
                    onClick={() => removeFromCart(item.id)}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
              <div className="cart-item-price-view">
                <span className="item-price-view">${item.precio}</span>
                <span className="item-total-view">${(item.precio * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary-view">
          <h2>Resumen del Pedido</h2>
          <div className="summary-line-view">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-line-view">
            <span>Envío:</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          <hr className="summary-divider-view" />
          <div className="summary-line-view total-line-view">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="checkout-btn-view">
            Ir al Checkout
          </button>
          <button 
            className="continue-shopping-btn-view"
            onClick={() => setCurrentView('productos')}
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartView;
