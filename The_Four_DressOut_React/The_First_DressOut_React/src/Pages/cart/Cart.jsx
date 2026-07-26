import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import remove from "../../assets/remove.png";
import { NavLink } from "react-router-dom";
import { getCart, updateCartQuantity, removeCartItem } from "../../Api/cartApiService";

const SHIPPING = 50;

const Cart = () => {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const data = await getCart();
    setCart(data.cartItems || []);
    console.log(data)
  };

  useEffect(() => {
    loadCart();
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );
  const shipping = cart.length ? SHIPPING : 0;
  const total = subtotal + shipping;

  const handleQuantity = async (id, delta) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item,
    );
    setCart(updatedCart);

    const item = updatedCart.find((x) => x.id === id);
    await updateCartQuantity(id, item.quantity);
  };

  const handleRemove = async (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    await removeCartItem(id);
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <h1>Your bag</h1>
          <span className={styles.itemCount}>
            {cart.length} {cart.length === 1 ? "item" : "items"}
          </span>
        </div>

        {cart.length === 0 ? (
          <div className={styles.empty}>
            <p>Your bag is empty</p>
            <NavLink to="/">Continue shopping</NavLink>
          </div>
        ) : (
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.imageFrame}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.cartImage}
                  />
                  <span />
                </div>

                <div className={styles.cartInfo}>
                  <h3>{item.name}</h3>
                  <p className={styles.price}>
                    ₹{item.price.toLocaleString()}
                  </p>
                  {item.color && (
                    <div className={styles.color}>
                      Colour<span>{item.color}</span>
                    </div>
                  )}
                  {item.size && (
                    <div className={styles.size}>
                      Size<span>{item.size}</span>
                    </div>
                  )}
                </div>

                {item.quantity && (
                  <div className={styles.quantityInfo}>
                    <div className={styles.qty}>
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => handleQuantity(item.id, -1)}
                      >
                        −
                      </button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => handleQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                <div
                  className={styles.removeBtn}
                  onClick={() => handleRemove(item.id)}
                  role="button"
                  aria-label="Remove item"
                >
                  <img src={remove} alt="" className={styles.removeIcon} />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={styles.checkout}>
          <h2>Order summary</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>{shipping ? `₹${shipping}` : "—"}</span>
          </div>
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Total</span>
            <span className={styles.totalAmount}>
              ₹{total.toLocaleString()}
            </span>
          </div>
          <NavLink to="/order">
            <button className={styles.checkoutBtn} disabled={!cart.length}>
              Proceed to checkout
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Cart;