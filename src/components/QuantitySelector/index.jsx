import React, { useState } from 'react';
import './styles.css';

const QuantitySelector = () => {
    const [quantity, setQuantity] = useState(1);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    return (
        <div className="quantity-selector">
            <button className="quantity-btn" onClick={decreaseQuantity} disabled={quantity <= 1}>−</button>
            <span className="quantity-display">{quantity}</span>
            <button className="quantity-btn" onClick={increaseQuantity}>+</button>
        </div>
    );
};

export default QuantitySelector;
