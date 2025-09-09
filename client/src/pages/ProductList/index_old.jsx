
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
          : `http://localhost:3000/productos?categoria=${categoria}`;

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
          throw new Error('Error al obtener los datos de los productos.');
        }
        const data = await respuesta.json();

        setProductos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductosPorCategoria();
  }, [categoria, currentView]);

 return (
  <>
    <Header currentView={currentView} setCurrentView={setCurrentView} />
    <div className='product-list-container'>
      {currentView === 'productos' ? (
        <>
          <Categorias categoriaSeleccionada={categoria} setCategoria={setCategoria} />
          {error ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'red' }}>
              Error: {error}
            </Box>
          ) : cargando ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <CircularProgress />
            </Box>
          ) : productos.length === 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              No hay productos para mostrar!
            </Box>
          ) : (
            <div className='products-grid'>
              {productos.map(product => (
                <ItemList key={product.id} item={product} />
              ))}
            </div>
          )}
        </>
      ) : (
        <CartView setCurrentView={setCurrentView} />
      )}
    </div>
  </>
);
}

export default ProducList;