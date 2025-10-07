import React from 'react';
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
        </div>
      </>
    );
  }

  const handleCheckout = async () => {
    // Verificar que todos los productos tengan stock suficiente
    const invalidItems = cartItems.filter(item => item.quantity > item.stock);
    if (invalidItems.length > 0) {
      alert('Algunos productos no tienen stock suficiente. Por favor revisa tu carrito.');
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

      // Si todo salió bien, limpiar el carrito y mostrar mensaje de éxito
      clearCart();
      alert('¡Compra realizada con éxito!');
      navigate('/products');
    } catch (error) {
      console.error('Error al procesar la compra:', error);
      alert('Hubo un error al procesar tu compra. Por favor, intenta nuevamente.');
    }
  };

  return (
    <>
      <Header />
      <div className="cart-view-container">
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
