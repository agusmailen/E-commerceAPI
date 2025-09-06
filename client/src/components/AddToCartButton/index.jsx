import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './styles.css';

const AddToCartButton = ({ product, quantity = 1 }) => {
    const [isAdded, setIsAdded] = useState(false);
    const { addToCart } = useCart();

    const handleClick = () => {
        if (product) {
            addToCart(product, quantity);
            setIsAdded(true);
            setTimeout(() => {
                setIsAdded(false);
            }, 2000);
        }
    };

    return (
        <button 
            className="add-to-cart" 
            onClick={handleClick}
            style={{ background: isAdded ? '#10b981' : '' }}
        >
            {isAdded ? '✅ Agregado al Carrito' : '🛒 Agregar al Carrito'}
        </button>
    );
};

export default AddToCartButton;
