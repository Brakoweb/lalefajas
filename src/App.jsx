import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
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
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<div>Contact</div>} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;
