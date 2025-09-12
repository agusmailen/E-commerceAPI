import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/index.jsx';
import Register from "./pages/Register";
import ProductList from './pages/ProductList/index.jsx';
import ProductInfoPage from './pages/ProductInfo';
import Login from './pages/Login';
import ProductManagement from './pages/ProductManagement/index.jsx';
import CartView from './pages/Cart';
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';

export const App = () => {
  return (
    <Router>
      <CartProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductInfoPage />} />
          
          {/* Protected routes - require authentication */}
          <Route path="/cart" element={
            <ProtectedRoute>
              <CartView />
            </ProtectedRoute>
          } />
          <Route path="/admin/products" element={
            <ProtectedRoute>
              <ProductManagement />
            </ProtectedRoute>
          } />
          
          {/* Redirect to login by default */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}
