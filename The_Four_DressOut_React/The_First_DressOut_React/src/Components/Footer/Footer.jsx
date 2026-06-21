import React from "react";
import styles from "./Footer.module.css";
import { Link, NavLink } from "react-router-dom";


const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <h2>The Four DressOut</h2>
            <p>Your premium fashion destination</p>
          </div>
          <div className={styles.links}>
            <h4>Shops</h4>
            <ul>
              <NavLink to="./men"><li>Men</li></NavLink>
              <NavLink to="./women"><li>Women</li></NavLink>
              <NavLink to="./newarrivals"><li>New Arrivals</li></NavLink>
              <li>Sale</li>
            </ul>
          </div>

          <div className={styles.links}>
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className={styles.links}>
            <h4>Help</h4>
            <ul>
              <li>FAQs</li>
              <li>Shipping</li>
              <li>Returns</li>
              <li>Track Order</li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>© 2026 The Four DressOut. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
