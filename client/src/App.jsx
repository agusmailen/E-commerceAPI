import Home from "./pages/Home";
import Register from "./pages/Register";                // ./pages/Register/index.jsx
import ProductList from "./pages/ProductList";          // ./pages/ProductList/index.jsx
import ProductInfoPage from "./pages/ProductInfo";
import Login from "./pages/Login";
import ProductManagement from "./pages/ProductManagement"; // ./pages/ProductManagement/index.jsx
import CartView from "./components/CartView";

import { CartProvider } from "./context/CartContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";   // lo creamos abajo

export const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductInfoPage />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ejemplo de ruta protegida (admin / checkout, etc.) */}
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <ProductManagement />
              </ProtectedRoute>
            }
          />

          {/* 404 → redirige al home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};
