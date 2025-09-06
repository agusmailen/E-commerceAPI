import { useState } from "react";
import ProductList from "./pages/ProductList/index.jsx"; // tu Home
import Register from "./pages/Register";

export default function App() {
  const [page, setPage] = useState("home"); // 'home' | 'register'

  return (
    <>
      {page === "home" && <ProductList onCreateAccount={() => setPage("register")} />}
      {page === "register" && (
        <Register onCancel={() => setPage("home")} onSuccess={() => setPage("home")} />
      )}
    </>
  );
}