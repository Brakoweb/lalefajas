import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Product from "./components/Product";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import OrderConfirmation from "./components/OrderConfirmation";
import Footer from "./components/Footer";

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
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/about" element={<div>About Us</div>} />
          <Route path="/contact" element={<div>Contact</div>} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;
