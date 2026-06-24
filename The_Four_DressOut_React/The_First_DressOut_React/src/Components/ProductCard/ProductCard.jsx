import React from "react";
import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";
import productDesc from "../productDescription/ProductDesc";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleProductDesc = () => {
    // console.log(`Clicked on ${product.name}`);
    localStorage.setItem("selectedProduct", JSON.stringify(product));

    // navigate(`./productdesc/${product.id}`);
    if (product.categoryId === 1 && "./men") {
      navigate(`/productdesc/${product.id}`);
    } else if (product.categoryId === 2 && "./women") {
      navigate(`/productdesc/${product.id}`);
    }
  };

  const handleAddToCart = () => {
    // console.log(`Added ${product.name} to cart!`);
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id,
    );
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  return (
    <>
      <div className={styles.card}>
        <div onClick={handleProductDesc}>
          <div className={styles.imageWrapper}>
            <img src={product.image} alt={product.name} />
            <span className={styles.category}>
              {product.categoryId === 1 ? "Men" : "Women"}
            </span>
          </div>

          <div className={styles.info}>
            <h3>{product.name}</h3>
            <p>₹{product.price.toLocaleString()}</p>
          </div>
        </div>

        <div className={styles.info}>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
