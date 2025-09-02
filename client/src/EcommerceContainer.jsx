import React from 'react';
import ProductList from './ProductList';
import Carrito from './Carrito';
import { Grid, Box } from '@mui/material';

const EcommerceContainer = () => {
  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <ProductList />
        </Grid>
        <Grid item xs={12} md={4}>
          <Carrito />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EcommerceContainer;
