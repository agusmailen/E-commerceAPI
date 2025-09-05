import React, { useState, useEffect } from 'react';
import './styles.css';
import dbData from '../../data/db.json';

const QuantitySelector = () => {
    const [quantity, setQuantity] = useState(1);
    const [stock, setStock] = useState(0);

    useEffect(() => {
        // Tomar el primer producto del JSON como ejemplo
        if (dbData.productos && dbData.productos.length > 0) {
            setStock(dbData.productos[0].stock);
        }
    }, []);

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
