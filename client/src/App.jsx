import ProductList from './pages/ProductList/index.jsx';
import ProductInfoPage from './pages/ProductInfo';
import Login from './pages/Login';

export const App = () => {
  return (
    <>
      {/* Switch views by commenting/uncommenting the lines below */}
      
      {/* Home/Product List View */}
      <ProductList />
      
      {/* Login View */}
      {/* <Login /> */}
      
      {/* Product Info View */}
      {/* <ProductInfoPage /> */}
    </>
  );
}