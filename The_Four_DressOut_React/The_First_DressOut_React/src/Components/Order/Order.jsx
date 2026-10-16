import React, { useEffect, useState } from "react";
import styles from "./Order.module.css";
import { placeOrder, getMyOrders, cancelOrder } from "../../Api/apiService";
import { getCart } from "../../Api/cartApiService";
import { api } from "../../Api/apiService";

const Order = () => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [payingOrderId, setPayingOrderId] = useState(null); // tracks which order is mid-payment
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const authToken = localStorage.getItem("token"); // adjust key to match however you store the JWT

  const loadCart = async () => {
    const data = await getCart();
    setCart(data.cartItems || []);
  };

  useEffect(() => {
    loadCart();
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



const payNow = async (orderId) => {
  setPayingOrderId(orderId);
  setError("");
  setMessage("");
  try {
    const res = await api.post("/RazorApiPayment/create-order", { orderId });
    const data = res.data;

    const options = {
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      order_id: data.orderId,
      name: "The Four DressOut",
      description: `Payment for Order #${orderId}`,
      handler: async function (response) {
        try {
          const verifyRes = await api.post("/RazorApiPayment/verify-payment", {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            orderId
          });
          setMessage("Payment successful!");
          fetchOrders();
        } catch (err) {
          setError(err.response?.data || "Payment verification failed.");
        } finally {
          setPayingOrderId(null);
        }
      },
      modal: {
        ondismiss: function () {
          setError("Payment cancelled.");
          setPayingOrderId(null);
        }
      },
      theme: { color: "#000000" }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    setError(err.response?.data || "Could not start payment. Please try again.");
    setPayingOrderId(null);
  }
};

  const handlePlaceOrder = async () => {
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const data = await placeOrder();
      setMessage(`${data.message} (Order #${data.orderId})`);
      localStorage.removeItem("cartItems");
      await fetchOrders();
      payNow(data.orderId); // immediately open Razorpay checkout for the new order
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
        <div className={styles.summary}>
          <h2>Your Orders</h2>
          <div>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <p>{item.product}</p>
                <p>{item.color}</p>
                <p>{item.size}</p>
                <p>{item.quantity}</p>
                <p>₹{item.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

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
                <p>
                  Order <strong>#{order.id}</strong>
                </p>
                <p className={styles.date}>
                  {new Date(order.orderedAt).toLocaleDateString()}
                </p>
              </div>
              <div className={styles.right}>
                <span
                  className={`${styles.status} ${styles[order.status.toLowerCase()]}`}
                >
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

            {/* PAY NOW + CANCEL — only for Pending */}
            {order.status === "Pending" && (
              <div className={styles.actions}>
                <button
                  className={styles.payBtn}
                  onClick={() => payNow(order.id)}
                  disabled={payingOrderId === order.id}
                >
                  {payingOrderId === order.id ? "Processing..." : "Pay Now"}
                </button>
                <button
                  className={styles.cancelBtn}
                  onClick={() => handleCancel(order.id)}
                  disabled={payingOrderId === order.id}
                >
                  Cancel Order
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;