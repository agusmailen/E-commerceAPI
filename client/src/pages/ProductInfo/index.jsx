import React, { useState } from 'react';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import ProductGallery from '../../components/ProductGallery';
import ProductInfo from '../../components/ProductInfo';
import './styles.css';

const ProductInfoPage = () => {
  const [currentProduct, setCurrentProduct] = useState(null);

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
            <ProductGallery product={currentProduct} />
            <div className="pip-wrapper">
              <ProductInfo onProductLoaded={handleProductLoaded} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProductInfoPage;
