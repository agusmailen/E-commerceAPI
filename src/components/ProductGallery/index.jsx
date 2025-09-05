import React, { useState } from 'react';
import './styles.css';

const ProductGallery = () => {
    const [mainImage, setMainImage] = useState('📱');
    const thumbnails = ['📱', '📱', '📱', '📱'];

    const handleThumbnailClick = (image) => {
        setMainImage(image);
    };

    return (
        <div className="product-gallery">
            <div className="main-image">
                {mainImage}
            </div>
            <div className="thumbnail-gallery">
                {thumbnails.map((thumb, index) => (
                    <div 
                        key={index}
                        className={`thumbnail ${mainImage === thumb ? 'active' : ''}`} 
                        onClick={() => handleThumbnailClick(thumb)}
                    >
                        {thumb}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGallery;
