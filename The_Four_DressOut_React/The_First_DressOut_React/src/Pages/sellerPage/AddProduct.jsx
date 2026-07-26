import React, { useEffect, useState } from "react";
import styles from "./AddProduct.module.css";
import { NavLink } from "react-router-dom";
import { addProduct, getAllCategories } from "../../Api/sellerApi";
import cart from "../../Assets/cartTemp.webp";
import order from "../../Assets/orderTemp.png";
import revenue from "../../Assets/salesTemp.webp";
import rating from "../../Assets/ratingTemp.png";
import lowStock from "../../Assets/lowCostTemp.webp";
import products from "../../Data/products";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  const [countProducts, setCountProducts] = useState(0);

  const loadProducts = async () => {
    const res = await products();
    setCountProducts(res.length);
  }
  useEffect(() => {
    loadProducts();
  }, []);

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
        console.log(JSON.stringify(err.response.data, null, 2));
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
   const reader = new FileReader();
   reader.onloadend = () => {
    const base64Url = reader.result;
    setImage(URL.createObjectURL(file));
   }
    reader.readAsDataURL(file);

  }
};
  return (
    <>
      <div className={styles.dashboard}>
        <div className={styles.main}>
          <div>
            <img src={cart} alt="Cart" />
            <h3>Total Products</h3>
            <h1>{countProducts}</h1>
          </div>  
        </div>
      </div>

      <div className={styles.dashboard}>
        <div className={styles.main}>
          <div>
            <img src={order} alt="Order" />
            <h3>Total Orders</h3>
          </div>  
        </div>
      </div>

      <div className={styles.dashboard}>
        <div className={styles.main}>
          <div>
            <img src={revenue} alt="Revenue" />
            <h3>Total Revenues</h3>
          </div>  
        </div>
      </div>

      <div className={styles.dashboard}>
        <div className={styles.main}>
          <div>
            <img src={rating} alt="Rating" />
            <h3>Average Rating</h3>
          </div>  
        </div>
      </div>

      <div className={styles.dashboard}>
        <div className={styles.main}>
          <div>
            <img src={lowStock} alt="Low Stock" />
            <h3>Low Stock Products</h3>
          </div>  
        </div>
      </div>

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
          onChange={(e) => {
            console.log(e.target.value);
            console.log(typeof e.target.value);
            setFormData({ ...formData, categoryId: e.target.value });
          }}
          name="categoryId"
        >
          <option value="">Select Gender</option>
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
