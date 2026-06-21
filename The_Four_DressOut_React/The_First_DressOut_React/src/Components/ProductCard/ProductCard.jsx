import React from 'react'
import styles from './ProductCard.module.css'


const ProductCard = ({ product }) => {
  return (
    <>
        <div className={styles.card}>

      <div className={styles.imageWrapper}>
        <img src={product.image} alt={product.name} />
        <span className={styles.category}>{product.category}</span>
      </div>

      <div className={styles.info}>
        <h3>{product.name}</h3>
        <p>₹{product.price.toLocaleString()}</p>
        <button>Add to Cart</button>
      </div>

    </div>
    </>
  )
}

export default ProductCard