import React from "react";
import Home from "./Pages/Home/Home";
import NewArrivals from "./Pages/New Arrivals/NewArrivals";
import Shop from "./Pages/Shop/Shop";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Women from "./Pages/Women/Women";
import Men from "./Pages/Men/Men";
import Contacts from "./Pages/Contacts/Contacts";
import Login from "./Pages/login/Login";
import Register from "./Pages/Register/Register";
import Cart from "./Pages/cart/Cart";
import ProductDesc from "./Components/productDescription/ProductDesc";
import Order from "./Components/Order/Order";
import AddProduct from "./Pages/sellerPage/AddProduct";

const App = () => {
  return (
    <>
    <div>
      <Navbar />

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
        <Route path="/order" element={<Order/>} />
        <Route path="/sellerpage" element={<AddProduct/>}/>
      </Routes>
      <Footer />
    </div>
    
    </>
  );
}

export default App;
