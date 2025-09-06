import React from 'react';
import { useCart } from '../../context/CartContext';
import './styles.css';

const CartModal = ({ isOpen, onClose }) => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    getCartItemsCount 
  } = useCart();

  if (!isOpen) return null;

  const shippingCost = 15.99;
  const subtotal = getCartTotal();
  const total = subtotal + shippingCost;

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-modal-header">
          <h2>Carrito de Compras ({getCartItemsCount()} items)</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="cart-modal-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart-modal">
              <p>Tu carrito está vacío</p>
              <button className="continue-shopping-btn" onClick={onClose}>
                Continuar Comprando
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items-modal">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item-modal">
                    <img src={item.imagen} alt={item.nombre} className="cart-item-image-modal" />
                    <div className="cart-item-info-modal">
                      <h4>{item.nombre}</h4>
                      <p>${item.precio}</p>
                      <div className="quantity-controls-modal">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          +
                        </button>
                        <button 
                          className="remove-btn-modal"
                          onClick={() => removeFromCart(item.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <div className="cart-item-total-modal">
                      ${(item.precio * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary-modal">
                <div className="summary-line-modal">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-line-modal">
                  <span>Envío:</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <hr />
                <div className="summary-line-modal total-line-modal">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button className="checkout-btn-modal">
                  Ir al Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
