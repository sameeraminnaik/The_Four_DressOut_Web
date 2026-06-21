import React from "react";
import styles from "./Men.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import products from "../../data/products";

const Men = () => {
  return (
    <>
      <div className={styles.menPage}>
        <div className={styles.header}>
          <h1>Men's Page</h1>
        </div>

        <section className={styles.products}>
          <div className={styles.grid}>
            {products
              .filter((product) => product.category === "Men")
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Men;
