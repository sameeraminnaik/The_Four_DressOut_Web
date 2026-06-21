import {React,useState} from "react";
import styles from "./Shop.module.css";
import ProductCard from "../../Components/ProductCard/ProductCard";
import products from "../../data/products.js";

const categories = ["All", "Men", "Women"];
const Shop = () => {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <>
      <div className={styles.shop}>
        <div className={styles.header}>
          <h1>Shop All Products</h1>
          <p>Find your perfect style</p>
        </div>

        <div className={styles.filters}>
          {categories.map(cat => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${active === cat ? styles.activeBtn : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
            </button>
          ))}
        </div>
        <div className={styles.grid}>
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </>
  );
};

export default Shop;
