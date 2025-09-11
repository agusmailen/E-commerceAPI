
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import './styles.css';

import  Categorias from '../../components/Categories';
import Header from '../../components/Header';
import ItemList from '../../components/ItemList';

const ProducList = ({ onCreateAccount }) => {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState('Todas');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerProductosPorCategoria = async () => {
      setCargando(true);
      setError(null);

      try {
        const url = categoria === 'Todas'
          ? 'http://localhost:3000/productos'
          : `http://localhost:3000/productos?categoria=${categoria}`;

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
          throw new Error('Error al obtener los datos de los productos.');
        }
        const data = await respuesta.json();

        // Sort products: items with stock first, then items without stock
        const sortedData = data.sort((a, b) => {
          // If both have stock or both don't have stock, maintain original order
          if ((a.stock > 0 && b.stock > 0) || (a.stock === 0 && b.stock === 0)) {
            return 0;
          }
          // Items with stock come first
          return a.stock > 0 ? -1 : 1;
        });

        setProductos(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductosPorCategoria();
  }, [categoria]);

 return (
  <>
    <Header />
    <div className='product-list-container'>
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
    </div>
  </>
);
}

export default ProducList;