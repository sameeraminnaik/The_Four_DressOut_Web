import React from "react";
import { useEffect, useState } from "react";
import styles from "./Men.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import { products } from "../../data/products";

const Men = () => {
  const [menProducts, setMenProducts] = useState([]);
  const load = async () => {
    const data = await products();
    setMenProducts(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <div className={styles.menPage}>
        <div className={styles.header}>
          <h1>Men's Page</h1>
        </div>

        <section className={styles.products}>
          <div className={styles.grid}>
            {menProducts
              .filter((item) => item.categoryId == 1)
              .map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Men;
