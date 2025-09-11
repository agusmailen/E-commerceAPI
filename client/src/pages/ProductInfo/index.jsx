import React, { useState } from 'react';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import ProductGallery from '../../components/ProductGallery';
import ProductInfo from '../../components/ProductInfo';
import QuantitySelector from '../../components/QuantitySelector';
import AddToCartButton from '../../components/AddToCartButton';
import './styles.css';

const ProductInfoPage = () => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleQuantityChange = (quantity) => {
    setSelectedQuantity(quantity);
  };

  const handleProductLoaded = (product) => {
    setCurrentProduct(product);
  };

  return (
    <>
      <Header />
      <main className="main-content">
        <Breadcrumb />
        <section className="product-section">
          <div className="product-container">
            <ProductGallery />
            <div className="pip-wrapper">
              <ProductInfo onProductLoaded={handleProductLoaded} />
              <div className="add-to-cart-section">
                <div className="quantity-cart-wrapper">
                  <QuantitySelector 
                    onQuantityChange={handleQuantityChange} 
                    product={currentProduct}
                  />
                  <AddToCartButton 
                    quantity={selectedQuantity} 
                    product={currentProduct}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProductInfoPage;
