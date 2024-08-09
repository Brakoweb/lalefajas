import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Product from "./components/Product";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<ProductList />} />
          {/* Placeholder routes for demonstration */}
          <Route path="/about" element={<div>About Us</div>} />
          <Route path="/contact" element={<div>Contact</div>} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
