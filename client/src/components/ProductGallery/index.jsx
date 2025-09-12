
import React, { useState, useEffect } from 'react';
import './styles.css';

const ProductGallery = ({ product }) => {
    const [mainImage, setMainImage] = useState(product?.imagen || '');

    useEffect(() => {
        if (product && product.imagen) {
            setMainImage(product.imagen);
        }
    }, [product?.id]);

    const handleThumbnailClick = (image) => {
        setMainImage(image);
    };


    if (!product) {
        return <div className="product-gallery">Cargando galería...</div>;
    }

    return (
        <div className="product-gallery">
            <div className="main-image">
                <img src={mainImage} alt={product.nombre} />
            </div>
            <div className="thumbnail-gallery">
                {product.imagenes && product.imagenes.map((imagen, index) => (
                    <div 
                        key={index}
                        className={`thumbnail ${mainImage === imagen ? 'active' : ''}`} 
                        onClick={() => handleThumbnailClick(imagen)}
                    >
                        <img src={imagen} alt={`${product.nombre} ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGallery;
