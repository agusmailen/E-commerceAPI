import Home from '../pages/Home';
import Register from "./pages/Register";
import ProductList from './pages/ProductList/index.jsx';
import ProductInfoPage from './pages/ProductInfo';
import Login from './pages/Login';
import ProductManagement from './pages/ProductManagement/index.jsx';
import { CartProvider } from './context/CartContext';

export const App = () => {
  return (
    <>
  {/* Switch views by commenting/uncommenting the lines below */}
  {/* Home View */}
  <Home />
  {/* Product List View */}
  {/* <ProductList /> */}
  {/* Login View */}
  {/* <Login /> */}
  {/* Product Info View */}
  {/* <ProductInfoPage /> */}
      {/* Login View */}
      {/* <Login /> */}
      
      <CartProvider>
        {/* Switch views by commenting/uncommenting the lines below */}
        
        {/* Product Management View */}
        <ProductManagement />
        
        {/* Product Info View */}
        {/* <ProductInfoPage /> */}
      </CartProvider>
    </>
  );
}
