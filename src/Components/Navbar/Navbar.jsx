import React, { useState } from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import CustLogin from '../CustLogin/CustLogin';

const Navbar = () => {

  return (
    <div className='NavbarMain'>
      <div className="navlinks">
        <Link className='navItems'>Home</Link>
        <Link className='navItems'>About</Link>
        <Link className='navItems'>Cars</Link>
        <Link className='navItems'>Bikes</Link>
        <Link className='LoginBtn'>Sign In</Link>
      </div>
    </div>
  )
}

export default Navbar
