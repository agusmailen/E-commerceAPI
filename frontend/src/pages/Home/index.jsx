

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
  // 1. Se define una función async (porque dentro hay await)
  const fetchProducts = async () => {
    try {
      // 2. Llama a la API
      const res = await fetch("http://localhost:8080/api/productos");

      // 3. Verifica que la respuesta sea correcta
      if (!res.ok) throw new Error("Error al obtener productos");

      // 4. Convierte la respuesta en JSON
      const productos = await res.json();

      // 5. Filtra solo productos con stock > 0
      //    y toma los primeros 4
      const destacados = productos.filter(p => p.stock > 0).slice(0, 5
      );

      // 6. Guarda esos destacados en el estado local
      setFeaturedProducts(destacados);

    } catch (err) {
      // 7. Si algo falla, muestra el error y limpia los destacados
      console.error('Error fetching products:', err);
      setFeaturedProducts([]);
    }
  };

  // 8. Ejecuta la función
  fetchProducts();
}, []); // [] => solo se ejecuta 1 vez al montar

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
