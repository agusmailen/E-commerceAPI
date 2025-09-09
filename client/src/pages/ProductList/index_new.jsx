import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import './styles.css';

import Categorias from '../../components/Categories';
import ItemList from '../../components/ItemList';
import { searchProducts, getAllProducts } from '../../services/productService';

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState('Todas');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search');

  useEffect(() => {
    const obtenerProductos = async () => {
      setCargando(true);
      setError(null);

      try {
        let productosData;
        
        // Si hay un término de búsqueda, buscar productos
        if (searchTerm) {
          productosData = await searchProducts(searchTerm);
        } else {
          // Si hay una categoría específica, filtrar por categoría
          if (categoria === 'Todas') {
            productosData = await getAllProducts();
          } else {
            const url = `http://localhost:3000/productos?categoria=${encodeURIComponent(categoria)}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error al obtener productos');
            productosData = await response.json();
          }
        }

        setProductos(productosData);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, [categoria, searchTerm]);

  return (
    <div className='product-list-container'>
      {/* Mostrar término de búsqueda si existe */}
      {searchTerm && (
        <div className="search-results-header">
          <h2>Resultados para: "{searchTerm}"</h2>
          <p>{productos.length} producto(s) encontrado(s)</p>
        </div>
      )}
      
      {/* Solo mostrar categorías si no hay búsqueda activa */}
      {!searchTerm && (
        <Categorias categoriaSeleccionada={categoria} setCategoria={setCategoria} />
      )}
      
      {error ? (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      ) : cargando ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <ItemList productos={productos} />
      )}
    </div>
  );
};

export default ProductList;
