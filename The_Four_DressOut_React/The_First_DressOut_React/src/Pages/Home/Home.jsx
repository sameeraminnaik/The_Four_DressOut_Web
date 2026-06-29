import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../../Components/ProductCard/ProductCard";
  import { products } from "../../data/products";

const Home = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    const load= async ()=> {
      const data = await products();
      setAllProducts(data)
    }
    load();
  }, [])
  
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
         {allProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
