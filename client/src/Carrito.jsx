import React from 'react';
import { useCarrito } from './contexts/CarritoProvider';
import { Container, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const Carrito = () => {
  const { carrito } = useCarrito();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Carrito de Compras
      </Typography>
      {carrito.length === 0 ? (
        <Typography variant="body1">El carrito está vacío.</Typography>
      ) : (
        <List>
          {carrito.map((producto, idx) => (
            <React.Fragment key={idx}>
              <ListItem>
                <ListItemText
                  primary={producto.nombre}
                  secondary={`Precio: $${producto.precio}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Carrito;
