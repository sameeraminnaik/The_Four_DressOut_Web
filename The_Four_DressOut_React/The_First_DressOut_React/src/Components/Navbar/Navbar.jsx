import React, { useState } from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <Link to="/">
          <img src={logo} alt="Logo" className={styles.logo} />
        </Link>

        <ul className={styles.navLinks}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/men">Men</Link>
          </li>
          <li>
            <Link to="/women">Women</Link>
          </li>
          <li>
            <Link to="/newarrivals">New Arrivals</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        <div className={styles.actions}>
          <input type="text" placeholder="Search..." />
          <Link className={styles.loginBtn} to="/login">
            Login
          </Link>
          <button className={styles.cartBtn}>Cart</button>
        </div>

        <button className={styles.hamburger} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        {menuOpen && (
          <div className={styles.mobileMenu}>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/shop" onClick={() => setMenuOpen(false)}>
              Shop
            </Link>
            <Link to="/shop" onClick={() => setMenuOpen(false)}>
              Men
            </Link>
            <Link to="/shop" onClick={() => setMenuOpen(false)}>
              Women
            </Link>
            <Link to="/shop" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
            <button className={styles.loginBtn}>Login</button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
