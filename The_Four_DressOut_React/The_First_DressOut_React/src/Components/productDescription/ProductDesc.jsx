import React from "react";
import styles from "./ProductDesc.module.css";
import ProductCard from "../ProductCard/ProductCard";
import { NavLink } from "react-router-dom";

const ProductDesc = () => {
  const singleProduct = JSON.parse(localStorage.getItem("selectedProduct"));

  if (!singleProduct) {
    return <p>No product selected.</p>;
  }

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === singleProduct.id
    );
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({ ...singleProduct, quantity: 1 });
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img src={singleProduct.image} alt={singleProduct.name} />
        </div>
        <div className={styles.info}>
          <h2 className={styles.name}>{singleProduct.name}</h2>
          <p className={styles.price}>₹{singleProduct.price.toLocaleString()}</p>
          <div className={styles.tags}>
            <div className={styles.tag}>
              Size: <span>{singleProduct.size}</span>
            </div>
            <div className={styles.tag}>
              Color: <span>{singleProduct.color}</span>
            </div>
            <div className={styles.tag}>
              Stock: <span>{singleProduct.stock}</span>
            </div>
          </div>
          <hr className={styles.divider} />
          <div>
            <p className={styles.descLabel}>Details</p>
            <p className={styles.desc}>{singleProduct.description}</p>
          </div>
          <button className={styles.addToCart} onClick={handleAddToCart}>Add to Cart</button>
          <NavLink to="/order">
            <button className={styles.addToCart}>Order Now</button>
          </NavLink>
          
        </div>
      </div>
    </div>
  );
};

export default ProductDesc;
