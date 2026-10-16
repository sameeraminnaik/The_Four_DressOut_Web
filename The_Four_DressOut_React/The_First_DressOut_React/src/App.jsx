import React from "react";
import Home from "./Pages/Home/Home";
import NewArrivals from "./Pages/New Arrivals/NewArrivals";
import Shop from "./Pages/Shop/Shop";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import Women from "./Pages/Women/Women";
import Men from "./Pages/Men/Men";
import Contacts from "./Pages/Contacts/Contacts";
import Login from "./Pages/login/Login";
import Register from "./Pages/Register/Register";
import Cart from "./Pages/cart/Cart";
import ProductDesc from "./Components/productDescription/ProductDesc";
import Order from "./Components/Order/Order";
import AddProduct from "./Pages/sellerPage/AddProduct";
import Dashboard from "./Pages/sellerPage/Dashboard";
import Sales from "./Pages/sellerPage/Sales";
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>

const App = () => {
  //used to hide the navbar and footer in seller page
  const location = useLocation();

  const isSellerPage = location.pathname.startsWith("/seller");


  return (
    <>
      <div>
        {!isSellerPage && <Navbar/>}

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/newarrivals" element={<NewArrivals />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/productdesc/:id" element={<ProductDesc />} />
          <Route path="/order" element={<Order />} />
          <Route path="/seller" element={<Dashboard />} />
          <Route path="/sellerproducts" element={<AddProduct/>}/>
          <Route path="/sellersales" element={<Sales/>}/>
        </Routes>
        {!isSellerPage && <Footer />}
      </div>
      
    </>
  );
};

export default App;
