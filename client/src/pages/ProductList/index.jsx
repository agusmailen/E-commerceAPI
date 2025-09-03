import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';


const ProducList = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/productos')
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  console.log(productos);

  return (
    <>
       <Container maxWidth="sm">
         <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>

        </Box>
      </Container>
    </>
  );
}

export default ProducList;