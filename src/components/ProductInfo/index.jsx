import React from 'react';
import './styles.css';

const ProductInfo = () => {
  return (
    <div className="product-info">
      <h1 className="product-title">iPhone 15 Pro</h1>
      <div className="product-price">$999.99</div>
      <p className="product-description">
        El iPhone 15 Pro redefine lo que es posible con un smartphone. Equipado con el revolucionario 
        chip A17 Pro, ofrece un rendimiento excepcional y eficiencia energética sin precedentes. Su 
        sistema de cámaras profesional de 48MP captura cada detalle con una claridad impresionante, 
        mientras que su diseño en titanio de grado aeroespacial lo hace increíblemente resistente 
        y elegante. La pantalla Super Retina XDR de 6.1 pulgadas ofrece colores vibrantes y un 
        contraste excepcional, perfecto para cualquier contenido.
      </p>
    </div>
  );
};

export default ProductInfo;
