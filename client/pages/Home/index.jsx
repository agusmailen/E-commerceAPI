
import React, { useEffect, useState } from "react";
import "./styles.css";
import Header from "../../src/components/Header";


export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3001/productos");
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
              <div className="product-card" key={product.id}>
                <img src={product.imagen} alt={product.nombre} className="product-img" />
                <h3>{product.nombre}</h3>
                <p>{product.descripcion}</p>
                <span className="product-price">${product.precio}</span>
                <button className="add-cart-btn">Agregar al Carrito</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
