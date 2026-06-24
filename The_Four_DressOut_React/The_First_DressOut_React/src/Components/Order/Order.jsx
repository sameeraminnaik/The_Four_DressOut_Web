import React, { useEffect, useState } from "react";
import styles from "./Order.module.css";
import { placeOrder, getMyOrders, cancelOrder } from "../../Api/apiService";

const Order = () => {
  // const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // const totalPrice = cartItems.reduce((sum, item) => {
  //   return sum + item.price * item.quantity;
  // }, 0);

  // const [address, setAddress] = useState({
  //   name: "",
  //   phone: "",
  //   street: "",
  //   city: "",
  //   pincode: "",
  // });

  // const handleChange = (e) => {
  //   setAddress({ ...address, [e.target.name]: e.target.value });
  // };

  // const handlePlaceOrder = () => {
  //   if (
  //     !address.name ||
  //     !address.phone ||
  //     !address.street ||
  //     !address.city ||
  //     !address.pincode
  //   ) {
  //     alert("Please fill in all fields.");
  //     return;
  //   }

  //   const order = {
  //     items: cartItems,
  //     address: address,
  //     total: totalPrice,
  //     orderedAt: new Date().toLocaleString(),
  //     status: "Pending",
  //   };

  //   const orders = JSON.parse(localStorage.getItem("orders")) || [];
  //   orders.push(order);
  //   localStorage.setItem("orders", JSON.stringify(orders));
  //   localStorage.removeItem("cartItems");

  //   alert("Order placed successfully!");
  // };

  // if (cartItems.length === 0) {
  //   return <p>Your cart is empty. Add items before ordering.</p>;
  // }

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getMyOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setMessage("");
    setError("");
    try{
      const data = await placeOrder();
      setMessage(`${data.message} (Order #${data.orderId})`);
      localStorage.removeItem("cartItems");
      fetchOrders();
    } catch (err) {
      setError(err.message);
    }
    finally{
      setLoading(false)
    }
  };

  const handleCancel = async (orderId) => {
    try {
      await cancelOrder(orderId);
      fetchOrders(); // refresh list after cancel
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.page}>

      {/* PLACE ORDER */}
      <div className={styles.placeOrder}>
        <h2>Ready to Order?</h2>
        <p>Your cart items are saved. Click below to place your order.</p>
        {message && <p className={styles.success}>{message}</p>}
        {error && <p className={styles.error}>{error}</p>}
        <button onClick={handlePlaceOrder} disabled={loading}>
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>

      {/* MY ORDERS */}
      <div className={styles.myOrders}>
        <h2>My Orders</h2>
        {orders.length === 0 && <p>No orders yet.</p>}
        {orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>

            <div className={styles.orderHeader}>
              <div>
                <p>Order <strong>#{order.id}</strong></p>
                <p className={styles.date}>
                  {new Date(order.orderedAt).toLocaleDateString()}
                </p>
              </div>
              <div className={styles.right}>
                <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                  {order.status}
                </span>
                <p className={styles.total}>
                  ₹{order.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>

            {/* ITEMS IN ORDER */}
            {order.items.map((item, index) => (
              <div key={index} className={styles.item}>
                <p className={styles.itemName}>{item.name}</p>
                <p className={styles.itemMeta}>
                  {item.size} · {item.color} · Qty: {item.quantity}
                </p>
                <p className={styles.itemPrice}>
                  ₹{item.priceAtPurchase.toLocaleString()}
                </p>
              </div>
            ))}

            {/* CANCEL BUTTON — only for Pending */}
            {order.status === "Pending" && (
              <button
                className={styles.cancelBtn}
                onClick={() => handleCancel(order.id)}
              >
                Cancel Order
              </button>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};


export default Order;
