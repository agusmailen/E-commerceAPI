import React, { useState, useEffect } from 'react';
import './styles.css';

const QuantitySelector = ({ onQuantityChange, product }) => {
    const [quantity, setQuantity] = useState(1);
    const [stock, setStock] = useState(0);

    useEffect(() => {
        if (product) {
            setStock(product.stock || 0);
            // Asegurar que la cantidad inicial no exceda el stock
            if (quantity > product.stock) {
                setQuantity(product.stock);
            }
        }
    }, [product]);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            if (onQuantityChange) {
                onQuantityChange(newQuantity);
            }
        }
    };

    const increaseQuantity = () => {
        if (quantity < stock) {
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);
            if (onQuantityChange) {
                onQuantityChange(newQuantity);
            }
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
