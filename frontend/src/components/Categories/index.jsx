import React, { useEffect, useState } from 'react';
import './styles.css';

const iconMap = {
  'Todas': '🧾',
  'Tecnología': '📱',
  'Tecnologia': '📱',
  'Moda': '👕',
  'Deportes': '⚽',
  'Libros': '📚',
  'Fotografía': '📷',
  'Fotografia': '�',
  'Accesorios': '🎒'
};

const Categorias = ({ categoriaSeleccionada, setCategoria }) => {
  const [categorias, setCategorias] = useState([{ nombre: 'Todas' }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchCategorias = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:8080/api/categorias');
        if (!res.ok) throw new Error('Error fetching categories');
        const data = await res.json();
        if (!mounted) return;
        // Map backend DTOs to expected shape
        const backendCats = Array.isArray(data) ? data.map(c => ({ nombre: c.nombre })) : [];
        // Prepend 'Todas' and avoid duplicates
        const names = new Set(['Todas', ...backendCats.map(c => c.nombre)]);
        setCategorias(Array.from(names).map(n => ({ nombre: n })));
      } catch (err) {
        console.error('Failed to load categories', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCategorias();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="categorias-container">
      <h3>Categorías</h3>
      <div className="categorias-list">
        {loading ? (
          <div className="categorias-loading">Cargando...</div>
        ) : (
          categorias.map(cat => (
            <button
              key={cat.nombre}
              className={`categoria-btn${categoriaSeleccionada === cat.nombre ? ' selected' : ''}`}
              onClick={() => setCategoria(cat.nombre)}
            >
              <div className="categoria-icon">{iconMap[cat.nombre] || '🏷️'}</div>
              <span>{cat.nombre}</span>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Categorias;