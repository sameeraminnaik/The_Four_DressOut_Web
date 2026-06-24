import React, { useState } from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  return (
    <>
      <nav className={styles.navbar}>
        <NavLink to="/">
          <img src={logo} alt="Logo" className={styles.logo} />
        </NavLink>

        <ul className={styles.navLinks}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/men">Men</NavLink>
          </li>
          <li>
            <NavLink to="/women">Women</NavLink>
          </li>
          <li>
            <NavLink to="/newarrivals">New Arrivals</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>

        <div className={styles.actions}>
          <input type="text" placeholder="Search..." />
          <NavLink className={styles.loginBtn} to="/login">
            {!token ? (
              <button className={styles.cartBtn}>Login</button>
            ) : (
              <span className={styles.cartBtn}>{name}</span>
            )}
          </NavLink>
          <NavLink to="/cart">
            <button className={styles.cartBtn}>Cart</button>
          </NavLink>
        </div>

        <button className={styles.hamburger} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        {menuOpen && (
          <div className={styles.mobileMenu}>
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/men" onClick={() => setMenuOpen(false)}>
              Men
            </NavLink>
            <NavLink to="/women" onClick={() => setMenuOpen(false)}>
              Women
            </NavLink>
            <NavLink to="/newarrivals" onClick={() => setMenuOpen(false)}>
              New Arrivals
            </NavLink>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </NavLink>

            <NavLink to="/login" className={styles.loginBtn}>
              Login
            </NavLink>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
