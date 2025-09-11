import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './styles.css';

const AddToCartButton = ({ product, quantity = 1 }) => {
    const [isAdded, setIsAdded] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(product);
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const { id } = useParams();
    
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

    useEffect(() => {
        // Use product prop if available, otherwise fetch from URL
        if (product) {
            setCurrentProduct(product);
        } else if (id) {
            const fetchProduct = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/productos/${id}`);
                    if (response.ok) {
                        const productData = await response.json();
                        setCurrentProduct(productData);
                    }
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            };
            fetchProduct();
        }
    }, [product, id]);

    const handleClick = () => {
        if (!isAuthenticated) {
            // Store product info for post-login cart addition
            localStorage.setItem('pendingCartItem', JSON.stringify({ product: currentProduct, quantity }));
            navigate('/login');
            return;
        }
        
        if (currentProduct) {
            addToCart(currentProduct, quantity);
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
            style={{ 
                background: isAdded ? '#10b981' : ''
            }}
        >
            {isAdded ? '✅ Agregado' : '+ Agregar al Carrito'}
        </button>
    );
};

export default AddToCartButton;
