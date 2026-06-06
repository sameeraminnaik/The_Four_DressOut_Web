import React from 'react'

const Header = () => {
  return (
    <>
        <nav>
            <ul className='Navbar' style={{ listStyle: 'none' }}>
                <li><a href="/pages/home" className='nav-link'>Home</a></li>
                <li><a href="/pages/about" className='nav-link'>About</a></li>
                <li><a href="/pages/contact" className='nav-link'>Contact</a></li>
                <li><a href="/pages/login" className='nav-link'>Login</a></li>
            </ul>
        </nav>
    </>
  )
}

export default Header