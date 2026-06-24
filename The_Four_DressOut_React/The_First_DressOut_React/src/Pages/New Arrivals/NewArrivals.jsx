import React from "react";
import styles from "./NewArrivals.module.css";
import products from "../../data/products";
import ProductCard from "../../components/ProductCard/ProductCard";

const NewArrivals = () => {
  const newProducts = products.filter((product) => product.isNew === true);
  const newMen = newProducts.filter((product) => product.categoryId === 1);
  const newWomen = newProducts.filter(
    (product) => product.categoryId === 2,
  );

  return (
    <div className={styles.newArrivals}>
      <div className={styles.header}>
        <h1>Check out our latest collection!</h1>
      </div>

      <section className={styles.products}>
        <div className={styles.menSection}>
          <h3>Men's New Arrivals</h3>
          <div className={styles.grid}>
            {newMen.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className={styles.womenSection}>
          <h3>Women's New Arrivals</h3>
          <div className={styles.grid}>
            {newWomen.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewArrivals;
