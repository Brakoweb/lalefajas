import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, initiateCheckout } =
    useContext(CartContext);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, quantity);
    }
  };

  return (
    <div className="cart">
      <h1>Your Cart</h1>
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
                {item.currency} {item.price}
              </p>
              <div className="quantity-controls">
                <button
                  className="quantityBtn"
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                />
                <button
                  className="quantityBtn"
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-button"
                >
                  <img
                    src="/trash-icon.png"
                    alt="Remove"
                    className="remove-icon"
                  />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button className="clear-cart-button" onClick={clearCart}>
        Clear Cart
      </button>
      <button
        className="checkout-button"
        disabled={cart.length === 0}
        onClick={initiateCheckout} // Asegúrate de que esté apuntando a la función correcta
      >
        Checkout{" "}
        <img src="/checkout.png" alt="checkout" className="checkout-icon" />
      </button>
    </div>
  );
};

export default Cart;
