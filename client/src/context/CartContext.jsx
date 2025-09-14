import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    if (quantity > product.stock) {
      alert(`Solo hay ${product.stock} unidades disponibles`);
      return false;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Verificar que la nueva cantidad no exceda el stock
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock) {
          alert(`Solo hay ${product.stock} unidades disponibles`);
          return prevItems;
        }
        // Si hay stock suficiente, actualizar cantidad
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        // Agregar nuevo item
        return [...prevItems, { ...product, quantity }];
      }
    });
    return true;
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems(prevItems => {
      const item = prevItems.find(item => item.id === productId);
      if (!item) return prevItems;

      // Validar que la nueva cantidad no exceda el stock
      if (newQuantity > item.stock) {
        alert(`Solo hay ${item.stock} unidades disponibles`);
        return prevItems;
      }

      if (newQuantity <= 0) {
        return prevItems.filter(item => item.id !== productId);
      }
      
      return prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.precio * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
