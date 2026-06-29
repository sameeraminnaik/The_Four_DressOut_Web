import React, { useState } from "react";
import styles from "./AddProduct.module.css";
import { NavLink } from "react-router-dom";
import { addProduct } from "../../Api/sellerApi";
import products from "../../Data/products";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    size: "",
    stock: "",
    color: "",
    image:"",
    categoryId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addProduct(formData);
      console.log(res);
      
      
    } catch (err) {
      console.log(err.response.data);
      console.log(err.response.data.errors);
    }
  };

  const handleAddProduct = async () => {
    const res = await addProduct(formData);
    console.log(res);
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
          name="name"
          placeholder="Product Title"
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Add your product description"
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
        />
        <input
          type="number"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          placeholder="Category ID"
        />
        <input
          type="text"
          name="size"
          placeholder="Size"
          onChange={handleChange}
        />
        <input
          type="text"
          name="color"
          placeholder="Colour"
          onChange={handleChange}
        />
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
