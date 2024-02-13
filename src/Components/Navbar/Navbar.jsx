import React, { useState } from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import CustLogin from '../CustLogin/CustLogin';

const Navbar = () => {
    const [showLogin, setShowLogin] = useState(false); // State to control login overlay visibility

    // Function to toggle login overlay visibility
    const toggleLogin = () => {
      setShowLogin(!showLogin);
    };
  return (
    <div className='NavbarMain'>
      <div className="navlinks">
        <Link className='navItems'>Home</Link>
        <Link className='navItems'>About</Link>
        <Link className='navItems'>Cars</Link>
        <Link className='navItems'>Bikes</Link>
        <button className='LoginBtn' onClick={toggleLogin}>Sign In</button>
      </div>
       {/* Render Login component as overlay if showLogin is true */}
       {showLogin && <CustLogin onClose={toggleLogin} />}
    </div>
  )
}

export default Navbar
