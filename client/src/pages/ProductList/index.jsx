
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import './styles.css';
import  Categorias from '../../components/Categories';
import Header from '../../components/Header';
import ItemList from '../../components/ItemList';

const ProducList = () => {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState('Todas');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/productos?categoria=' + (categoria === 'Todas' ? '' : categoria))
      .then(res => res.json())
      .then(data => [setProductos(data), setIsLoading(false)])
      .catch(() => [setError("Error al cargar los productos"), setIsLoading(false)]);
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
      ) : isLoading ? (
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