
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import './styles.css';

import  Categorias from '../../components/Categories';
import Header from '../../components/Header';
import ItemList from '../../components/ItemList';
import CartView from '../../components/CartView';

const ProducList = () => {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState('Todas');
  const [currentView, setCurrentView] = useState('productos'); // 'productos' o 'carrito'
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Solo cargar productos si estamos en la vista de productos
    if (currentView !== 'productos') return;
    
    const obtenerProductosPorCategoria = async () => {
      setCargando(true);
      setError(null);

      try {
        const url = categoria === 'Todas'
          ? 'http://localhost:3001/productos'
          : `http://localhost:3001/productos?categoria=${categoria}`;

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