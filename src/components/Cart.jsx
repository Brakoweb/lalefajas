import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

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
                  <button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={clearCart} className="clear-cart-button">
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
