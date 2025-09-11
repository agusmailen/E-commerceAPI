

import React, { useEffect, useState } from "react";
import "./styles.css";
import Header from "../../components/Header";
import ProductGallery from "../../components/ProductGallery";


export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/productos");
        if (!res.ok) throw new Error("Error al obtener productos");
        const productos = await res.json();
        // Selecciona los primeros 4 productos con stock > 0 como destacados
        const destacados = productos.filter(p => p.stock > 0).slice(0, 4);
        setFeaturedProducts(destacados);
      } catch (err) {
        setFeaturedProducts([]);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <div className="home-container">
        <section className="hero-section">
          <h1>Descubre Productos Increíbles</h1>
          <p>
            Encuentra las mejores ofertas en tecnología, moda, hogar y mucho más. Miles de productos con envío rápido y garantía de calidad.
          </p>
          <button className="hero-btn">Ver Productos</button>
        </section>
        <section className="featured-section">
          <h2>Productos Destacados</h2>
          <div className="featured-products">
            {featuredProducts.map((product) => (
              <ProductGallery key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
