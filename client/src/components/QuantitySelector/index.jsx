import React, { useState, useEffect } from 'react';
import './styles.css';
import dbData from '../../../json-server/db.json';

const QuantitySelector = () => {
    const [quantity, setQuantity] = useState(1);
    const [stock, setStock] = useState(0);

    useEffect(() => {
        // Simulate fetching stock data from db.json
        const fetchStock = () => {
            // Assuming dbData has a structure like { products: [{ id: 1, stock: 10 }, ...] }
            const product = dbData.products.find(p => p.id === 1); // Example: fetching product with id 1
            if (product) {
                setStock(product.stock);
            }
        };
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
