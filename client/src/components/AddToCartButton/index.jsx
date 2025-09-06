import React, { useState } from 'react';
import './styles.css';

const AddToCartButton = () => {
    const [isAdded, setIsAdded] = useState(false);

    const handleClick = () => {
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
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
