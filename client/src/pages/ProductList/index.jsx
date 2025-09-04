
import { useEffect, useState } from 'react';
import './styles.css';
import  Categorias from '../../components/Categories';
import Header from '../../components/Header';
import ItemList from '../../components/ItemList';

const ProducList = () => {
  const [productos, setProductos] = useState([]);

  const [categoria, setCategoria] = useState('Todas');

  useEffect(() => {
    fetch('http://localhost:3000/productos')
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  console.log(productos);

  return (
    <>
      <Header />
      <div className='product-list-container'>
        <Categorias categoriaSeleccionada={categoria} setCategoria={setCategoria} />
        <div className='products-grid'>
          <ItemList productos={productos} categoria={categoria} />
          <ItemList productos={productos} categoria={categoria} />
          <ItemList productos={productos} categoria={categoria} />
          <ItemList productos={productos} categoria={categoria} />
          <ItemList productos={productos} categoria={categoria} />
          <ItemList productos={productos} categoria={categoria} />
          <ItemList productos={productos} categoria={categoria} />
        </div>
      </div>
    </>
  );
}

export default ProducList;