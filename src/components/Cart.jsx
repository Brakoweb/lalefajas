import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";
import { createCheckout } from "../api/checkout";

const Cart = () => {
  const { cart, decreaseQuantity, removeFromCart, clearCart } =
    useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const checkoutUrl = await createCheckout(cart);
    setLoading(false);
    if (checkoutUrl) {
      window.location.href = checkoutUrl; // Redirigir al checkout de Shopify
    } else {
      alert("There was an issue with the checkout. Please try again.");
    }
  };

  const handleRemoveItem = (productId) => {
    decreaseQuantity(productId);
  };

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-image"
                />
                <div>
                  <h2>{item.title}</h2>
                  <p>
                    {item.price} {item.currency}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <button onClick={() => handleRemoveItem(item.id)}>
                    Reduce Quantity
                  </button>
                  <button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="checkout-button"
          >
            {loading ? "Processing..." : "Checkout"}
          </button>
          <button onClick={clearCart} className="clear-cart-button">
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
