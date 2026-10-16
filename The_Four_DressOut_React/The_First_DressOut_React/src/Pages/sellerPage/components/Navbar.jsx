import React from 'react'
import styles from '../AddProduct.module.css'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
  return (
    <>
        <nav className={styles.navbar}>
        <div>
          <span>Dashboard</span>
        </div>


        <ul className={styles.navLinks}>
          <li>
            <NavLink to="/seller">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/sellersales">Sales</NavLink>
          </li>
          <li>
            <NavLink to="/sellerproducts">Products</NavLink>
          </li>
          {/* <li>
            <NavLink to="/newarrivals">New Arrivals</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li> */}
        </ul>

        {/* <div className={styles.actions}>
          <input type="text" placeholder="Search..." />
          {!token ? (
            <NavLink className={styles.loginBtn} to="/login">
              <button className={styles.cartBtn}>Login</button>
            </NavLink>
          ) : (
            <button className={styles.cartBtn} onClick={handleLogOut}>
              LogOut
            </button>
          )}
          <NavLink to="/cart">
            <button className={styles.cartBtn}>Cart</button>
          </NavLink>
        </div> */}

        {/* <button className={styles.hamburger} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button> */}

        {/* {menuOpen && (
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
        )} */}
      </nav>
    </>
  )
}

export default Navbar