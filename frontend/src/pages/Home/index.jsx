

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";


export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const navigate = useNavigate();


  const handleViewProducts = () => {
    navigate('/products');
  };

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
        console.error('Error fetching products:', err);
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
          <button className="hero-btn" onClick={handleViewProducts}>Ver Productos</button>
        </section>
        <section className="featured-section">
          <h2>Productos Destacados</h2>
          <div className="featured-products">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
