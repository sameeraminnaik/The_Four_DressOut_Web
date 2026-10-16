import { useState } from "react";

function PayButton({ orderId, authToken }) {
  const [loading, setLoading] = useState(false);

  const payNow = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/RazorApiPayment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ orderId })
      });

      if (!res.ok) {
        alert("Could not start payment. Try again.");
        return;
      }

      const data = await res.json();

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "The Four DressOut",
        description: "Order Payment",
        handler: async function (response) {
          const verifyRes = await fetch("/api/RazorApiPayment/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`
            },
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              orderId
            })
          });

          if (verifyRes.ok) {
            alert("Payment successful!");
          } else {
            alert("Payment verification failed.");
          }
        },
        modal: {
          ondismiss: function () {
            console.log("Payment popup closed by user");
          }
        },
        theme: { color: "#000000" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={payNow} disabled={loading}>
      {loading ? "Starting payment..." : "Pay Now"}
    </button>
  );
}

export default PayButton;