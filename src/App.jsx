import React from 'react';
import Header from './components/Header';
import Breadcrumb from './components/Breadcrumb';
import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';
import QuantitySelector from './components/QuantitySelector';
import AddToCartButton from './components/AddToCartButton';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Breadcrumb />
        <section className="product-section">
          <div className="product-container">
            <ProductGallery />
            <div className="product-info-wrapper">
              <ProductInfo />
              <div className="add-to-cart-section">
                <div className="quantity-cart-wrapper">
                  <QuantitySelector />
                  <AddToCartButton />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
