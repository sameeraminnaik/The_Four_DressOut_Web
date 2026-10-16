import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import products from "../../Data/products";
import styles from "./AddProduct.module.css";
import cart from "../../Assets/cartTemp.webp";
import order from "../../Assets/orderTemp.png";
import revenue from "../../Assets/salesTemp.webp";
import rating from "../../Assets/ratingTemp.png";
import lowStock from "../../Assets/lowCostTemp.webp";
import { getAllOrders } from "../../Api/apiService";
import Navbar from "./components/Navbar";


const Dashboard = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);

  const loadData = async () => {
    const res1 = await products();
    setProductDetails(res1);

    const res2 = await getAllOrders();
    setOrderDetails(res2);
  };


  useEffect(() => {
    loadData();
  }, []);

  const stats = [
    { id: "1", title: "Total Products", value: productDetails.length, image: cart },
    { id: "2", title: "Total Orders", value: 120, image: order },
    { id: "3",title: "Total Revenues", value: 120, image: revenue },
    { id: "4",title: "Average Rating", value: 120, image: rating },
    { id: "5",title: "Low Stock Products", value: 120, image: lowStock },
  ];

  return (
    <>
      <Navbar/>
      <div className={styles.stats}>
        {stats.map((item) => (
          <div className={styles.card} key={item.id}>
            <div>
              <img src={item.image} alt="Image" /> 
              <h3>{item.title}</h3>
              <h1>{item.value}</h1>
            </div>
          </div>
        ))};
      </div>
    </>
  );
};

export default Dashboard;
