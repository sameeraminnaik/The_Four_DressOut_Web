import React from "react";
import styles from "./NewArrivals.module.css";
import products from "../../data/products";
import ProductCard from "../../components/ProductCard/ProductCard";

/* Doutbfull
1. Product is not showing up in the new arrivals section even though it is marked as new in the data.
2. The filtering logic for new products is not working correctly, resulting in an empty list of new arrivals.
*/

const NewArrivals = () => {
  const newProducts = products.filter((product) => product.isNew === true);
  const newMen = newProducts.filter((product) => product.category === "Men");
  const newWomen = newProducts.filter(
    (product) => product.category === "Women",
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
