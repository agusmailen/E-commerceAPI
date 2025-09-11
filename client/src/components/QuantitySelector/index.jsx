import React, { useState, useEffect } from 'react';
import './styles.css';

const QuantitySelector = ({ onQuantityChange, product }) => {
    const [quantity, setQuantity] = useState(1);
    const [stock, setStock] = useState(0);

    useEffect(() => {
        // Use product prop to get stock
        if (product) {
            setStock(product.stock || 0);
        }
    }, [product]);

    useEffect(() => {
        // Notify parent component of quantity changes
        if (onQuantityChange) {
            onQuantityChange(quantity);
        }
    }, [quantity, onQuantityChange]);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1);
        }
    };

    return (
        <div className="quantity-selector">
            <button 
                className="quantity-btn" 
                onClick={decreaseQuantity} 
                disabled={quantity <= 1}
            >
                −
            </button>
            <span className="quantity-display">{quantity}</span>
            <button 
                className="quantity-btn" 
                onClick={increaseQuantity}
                disabled={quantity >= stock}
            >
                +
            </button>
        </div>
    );
};

export default QuantitySelector;
