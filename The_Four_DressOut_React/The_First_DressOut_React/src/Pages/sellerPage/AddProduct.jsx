import React, { useEffect, useState } from "react";
import styles from "./AddProduct.module.css";
import { NavLink } from "react-router-dom";
import { addProduct, getAllCategories } from "../../Api/sellerApi";
import products from "../../Data/products";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    size: "",
    stock: "",
    color: "",
    image: "",
    categoryId: "",
  });

  useEffect(() => {
    getAllCategories().then((res) => setCategories(res.data));
  }, []);

  console.log("Form Data:", formData);

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
      console.log("Full error:", err);

      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Data:", err.response.data);
        console.log("Errors:", err.response.data?.errors);
      } else {
        console.log("Message:", err.message);
      }
    }
  };

  const handleAddProduct = async () => {
    const res = await addProduct(formData);
    console.log(res);
  };

  const onImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
    setImage(URL.createObjectURL(file));
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
        <select
          value={formData.categoryId}
          onChange={(e) =>
            setFormData({ ...formData, categoryId: e.target.value })
          }
          name="categoryId"
          placeholder="Select Category"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
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
          name="image"
          type="file"
          accept="image/*"
          onChange={onImageChange}
        />
        {image && (
          <img src={image} alt="Preview" style={{ width: 400, height: 200 }} />
        )}

        <button type="submit" className={styles.addBtn}>
          Add Product
        </button>
      </form>
    </>
  );
};

export default AddProduct;
