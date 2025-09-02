import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useCarrito } from './contexts/CarritoProvider';

const ProductCard = ({ producto }) => {
  const { agregarProducto } = useCarrito();

  const handleAgregar = () => {
    agregarProducto(producto);
  };

  return (
    <Card>
      {producto.imagen && (
        <CardMedia
          component="img"
          height="140"
          image={producto.imagen}
          alt={producto.nombre}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {producto.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {producto.descripcion}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
          ${producto.precio}
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleAgregar}>
          Agregar al Carrito
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
