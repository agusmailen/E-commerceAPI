import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Header from '../../components/Header';
import './styles.css';

const CartView = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    getCartItemsCount,
    clearCart
  } = useCart();


  const [successBanner, setSuccessBanner] = useState(false);
  const shippingCost = 15.99;
  const subtotal = getCartTotal();
  const total = subtotal + shippingCost;

  const handleQuantityChange = (productId, newQuantity, currentStock) => {
    if (newQuantity > currentStock) {
      alert(`Solo hay ${currentStock} unidades disponibles`);
      return;
    }
    updateQuantity(productId, newQuantity);
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="cart-view-container">
          {successBanner ? (
            <div className="cart-success-banner" style={{
              background: '#e0ffe0',
              color: '#155724',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '20px',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              ¡Gracias por tu compra!
            </div>
          ) : (
            <div className="empty-cart-view">
              <h2>Tu carrito está vacío</h2>
              <p>¡Agrega algunos productos para comenzar!</p>
              <button 
                className="continue-shopping-btn-view"
                onClick={() => navigate('/products')}
              >
                Continuar Comprando
              </button>
            </div>
          )}
        </div>
      </>
    );
  }

  const handleCheckout = async () => {
    // Verificar que todos los productos tengan stock suficiente
    const invalidItems = cartItems.filter(item => item.quantity > item.stock);
    if (invalidItems.length > 0) {
      // Puedes mostrar un banner de error si lo deseas
      return;
    }

    try {
      // Actualizar el stock de cada producto
      for (const item of cartItems) {
        const response = await fetch(`http://localhost:3000/productos/${item.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            stock: item.stock - item.quantity
          })
        });

        if (!response.ok) {
          throw new Error(`Error al actualizar el stock del producto ${item.nombre}`);
        }
      }

      // Si todo salió bien, limpiar el carrito y mostrar banner de éxito
      clearCart();
      setSuccessBanner(true);
      setTimeout(() => {
        setSuccessBanner(false);
        navigate('/products');
      }, 3000);
    } catch (error) {
      console.error('Error al procesar la compra:', error);
      // Puedes mostrar un banner de error si lo deseas
    }
  };

  return (
    <>
      <Header />
      <div className="cart-view-container">
        {successBanner && (
          <div className="cart-success-banner" style={{
            background: '#e0ffe0',
            color: '#155724',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            ¡Gracias por tu compra!
          </div>
        )}
        <h1 className="cart-view-title">Carrito de Compras</h1>
      
        <div className="cart-view-content">
          <div className="cart-items-view">
            <h2>Productos ({getCartItemsCount()} items)</h2>
            {cartItems.map(item => (
              <div key={item.id} className="cart-item-view">
                <div className="cart-item-image-view">
                  {item.imagen ? (
                    <img src={item.imagen} alt={item.nombre} />
                  ) : (
                    <div className="no-image-placeholder">Sin imagen</div>
                  )}
                </div>
                <div className="cart-item-info-view">
                  <h3 className="cart-item-title-view">{item.nombre}</h3>
                  <p className="cart-item-description-view">{item.descripcion}</p>
                  <p className="cart-item-stock-view">Stock disponible: {item.stock}</p>
                  <div className="cart-item-controls-view">
                    <div className="quantity-controls-view">
                      <button 
                        className="quantity-btn-view"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.stock)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span className="quantity-display-view">{item.quantity}</span>
                      <button 
                        className="quantity-btn-view"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.stock)}
                        disabled={item.quantity >= item.stock}
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
            <button 
              className="checkout-btn-view"
              onClick={handleCheckout}
            >
              Concretar Compra
            </button>
            <button 
              className="continue-shopping-btn-view"
              onClick={() => navigate('/products')}
            >
              Continuar Comprando
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartView;
