import Home from '../pages/Home';
import Register from "./pages/Register";
import ProductList from './pages/ProductList/index.jsx';
import ProductInfoPage from './pages/ProductInfo';
import Login from './pages/Login';
import ProductManagement from './pages/ProductManagement/index.jsx';
import CartView from './components/CartView';
import { CartProvider } from './context/CartContext';

export const App = () => {
  return (
    <>
  {/* Switch views by commenting/uncommenting the lines below */}

  {/* Login View */}
  {/* <Login /> */}
  {/* Register View */}
  {/* <Register /> */}
  <CartProvider>
    {/* Switch views by commenting/uncommenting the lines below */}
    
    {/* Home View */}
    {/* <Home /> */}
    {/* Product List View */}
    <ProductList />  
    {/* Product Info View */}
    {/* <ProductInfoPage /> */}
    {/* Product Management View */}
    {/* <ProductManagement /> */}
    {/* Cart View */}
    {/* <CartView /> */}
  </CartProvider>
  </>
  );
}
