import React from "react";
import styles from "./Cart.module.css";
import ProductCard from "../../Components/ProductCard/ProductCard";
import products from "../../data/products";
import remove from "../../assets/remove.png";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Cart = ({ cartItems }) => {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  });

  const [subtotal, shipping, total] = 
  [
    cart.reduce((subTotal, item) => subTotal + item.price * (item.quantity || 1), 0),
    50,
    cart.reduce((subTotal, item) => subTotal + item.price * (item.quantity || 1), 0) + 50
  ];

  const handleQuantity = (id, delta) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
          : item,
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.header}>
          <h1> Cart</h1>
        </div>
        <div className={styles.cartItems}>
          <div className={styles.grid}>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItems}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.cartImage}
                />
                <div className={styles.cartInfo}>
                  <h3>{item.name}</h3>
                  <p>₹{item.price.toLocaleString() }</p>
                  <div className={styles.color}>
                    Colour:
                    {item.color}
                  </div>

                  <div className={styles.size}>
                    Size:
                    {item.size}
                  </div>
                </div>
                <div className={styles.quantity}>
                  {item.quantity && (
                    <div className={styles.quantityInfo}>
                      <div className={styles.qty}>
                        Qty:
                        <button onClick={() => handleQuantity(item.id, -1)}>
                          -
                        </button>
                        {item.quantity}
                        <button onClick={() => handleQuantity(item.id, 1)}>
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={styles.removeBtn}
                  onClick={() => handleRemove(item.id)}
                >
                  <img
                    src={remove}
                    alt="Remove"
                    className={styles.removeIcon}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className={styles.checkout}>
        <h2>
          Order Summary
        </h2>
        <h2 className={styles.subtotal}>
          Subtotal: ₹ 
          {subtotal.toLocaleString()}
        </h2>
        <h2 className={styles.shipping}>
          Shipping: ₹ 50
        </h2>
        <h2 className={styles.total}>
          Total: ₹ 
          {total.toLocaleString()}
        </h2>
        <NavLink to="/order">
            <button className={styles.checkoutBtn} >
          Order Now
        </button>
        </NavLink>
        
      </div>
    </>
  );
};

export default Cart;
