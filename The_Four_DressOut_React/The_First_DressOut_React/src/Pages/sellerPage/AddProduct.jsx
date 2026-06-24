import React, { useState } from "react";
import styles from "./AddProduct.module.css";
import { NavLink } from "react-router-dom";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    img: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));

      setFormData((prev) => ({
        ...prev,
        img: file,
      }));
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="description"
          placeholder="Add your product description"
          onChange={handleChange}
        ></input>
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          onChange={handleChange}
        ></input>
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
        ></input>
        <input
          name="img"
          type="file"
          accept="image/*"
          onChange={onImageChange}
        />
        {image && (
          <img src={image} alt="Preview" style={{ width: 200, height: 200 }} />
        )}

        <button type="submit" className={styles.addBtn}>
          Add Product
        </button>
      </form>
    </>
  );
};

export default AddProduct;
