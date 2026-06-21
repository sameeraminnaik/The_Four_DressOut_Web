import React from "react";
import styles from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../../Components/ProductCard/ProductCard";
import products from "../../data/products.js";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.content}>
          <h1>Discover Your Style</h1>

          <p>Elevate your wardrobe with premium fashion collections.</p>

          <button onClick={() => navigate("/shop")}>
            Shop Now
          </button>
        </div>
      </section>

      <section className={styles.featured}>
        <h2>Featured Products</h2>
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
