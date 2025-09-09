import Home from "./pages/Home";
import Register from "./pages/Register";                // ./pages/Register/index.jsx
import ProductList from "./pages/ProductList";          // ./pages/ProductList/index.jsx
import ProductInfoPage from "./pages/ProductInfo";
import Login from "./pages/Login";
import ProductManagement from "./pages/ProductManagement"; // ./pages/ProductManagement/index.jsx
import CartView from "./components/CartView";
import Header from "./components/Header";

import { CartProvider } from "./context/CartContext";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

const AppContent = () => {
  const location = useLocation();
  const hideHeaderRoutes = ['/login', '/register'];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        {/* públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductInfoPage />} />
        <Route path="/cart" element={<CartView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 404 → redirige al home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CartProvider>
  );
};
