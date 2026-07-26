import React from "react";
import { useEffect, useState } from "react";
import styles from "./Women.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import {products} from "../../data/products";

const Women = () => {

  const [womenProduct, setWomenProduct] = useState([]);

  const load = async () => {
    const data = await products();
    setWomenProduct(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <div className={styles.womenPage}>
        <div className={styles.header}>
          <h1>Women's Page</h1>
        </div>

        <section className={styles.products}>
          <div className={styles.grid}>
            {womenProduct
              .filter((item) => item.categoryId == 2)
              .map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Women;
