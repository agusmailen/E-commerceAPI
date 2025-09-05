import React, { useState, useEffect } from 'react';
import './styles.css';
import dbData from '../../data/db.json';

const ProductGallery = () => {
    const [producto, setProducto] = useState(null);
    const [mainImage, setMainImage] = useState('');

    useEffect(() => {
        // Tomar el primer producto del JSON como ejemplo
        if (dbData.productos && dbData.productos.length > 0) {
            const primerProducto = dbData.productos[0];
            setProducto(primerProducto);
            setMainImage(primerProducto.imagen);
        }
    }, []);

    const handleThumbnailClick = (image) => {
        setMainImage(image);
    };

    if (!producto) {
        return <div className="product-gallery">Cargando galería...</div>;
    }

    return (
        <div className="product-gallery">
            <div className="main-image">
                <img src={mainImage} alt={producto.nombre} />
            </div>
            <div className="thumbnail-gallery">
                {producto.imagenes.map((imagen, index) => (
                    <div 
                        key={index}
                        className={`thumbnail ${mainImage === imagen ? 'active' : ''}`} 
                        onClick={() => handleThumbnailClick(imagen)}
                    >
                        <img src={imagen} alt={`${producto.nombre} ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGallery;
