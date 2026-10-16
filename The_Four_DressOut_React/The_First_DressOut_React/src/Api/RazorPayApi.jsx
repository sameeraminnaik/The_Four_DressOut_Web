function loadScript(src) {
 return new Promise(resolve => {
   const script = document.createElement("script");
   script.src = src;
   script.onload = () => resolve(true);
   script.onerror = () => resolve(false);
   document.body.appendChild(script);
 });
}

async function displayRazorpay() {
 await loadScript("https://checkout.razorpay.com/v1/checkout.js");
 const { data } = await axios.post("/api/payment/create-order", 500);
 const options = {
   key: "YOUR_KEY_ID",
   amount: data.amount,
   currency: data.currency,
   order_id: data.id,
   handler: async (response) => {
     await axios.post("/api/payment/verify", response);
     alert("Payment Successful");
   }
 };
 new window.Razorpay(options).open();
}