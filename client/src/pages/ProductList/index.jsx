
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();

  useEffect(() => {
    const obtenerProductos = async () => {
      setCargando(true);
      setError(null);

      const params = new URLSearchParams(location.search);
      const search = params.get('search') || '';

      let url = 'http://localhost:3000/productos?_sort=nombre&_order=asc';
      if (categoria !== 'Todas') {
        url += `&categoria=${encodeURIComponent(categoria)}`;
      }

      try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
          throw new Error('Error al obtener los datos de los productos.');
        }
        let data = await respuesta.json();

        if (search) {
          data = data.filter(producto => producto.nombre.toLowerCase().includes(search.toLowerCase()));
        }

        setProductos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, [categoria, location.search]);

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