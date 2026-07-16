import React, { useState } from "react";
import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";
import productDesc from "../productDescription/ProductDesc";
import { placeCartItem } from "../../Api/cartApiService";

const ProductCard = ({ product }) => {
  const [cartItem, setCartItem] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });
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

  const handleAddToCart = async () => {
    const updatedCart = [...cartItem];
    const existingItemIndex = updatedCart.findIndex(
      (item) => item.id === product.id,
    );

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCartItem(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    try {
      await placeCartItem({
        productId: product.id,
        size: product.size,
        color: product.color,
        quantity: 1,
      });
    } catch (error) {
      console.error(error);
    }
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
