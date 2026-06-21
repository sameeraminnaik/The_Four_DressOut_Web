import React from "react";
import styles from "./Women.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import products from "../../data/products";

const Women = () => {
  return (
    <>
      <div className={styles.womenPage}>
        <div className={styles.header}>
          <h1>Women's Page</h1>
        </div>

        <section className={styles.products}>
          <div className={styles.grid}>
            {products
              .filter((product) => product.category === "Women")
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Women;
