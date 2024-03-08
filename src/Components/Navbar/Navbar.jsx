import React, { useState } from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import CustLogin from '../CustLogin/CustLogin';
import { HiMiniBars3CenterLeft } from "react-icons/hi2";

const Navbar = () => {

  return (
    <div className='NavbarMain'>

     

      {/* //////////////nav-bar-big-screen/////////////// */}
      <div className="navBar">
         {/* ///////////////////mobile-navbar/////////////////// */}
      <div className="offCanvas">
{/* <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
  Button with data-bs-target
</button> */}
<HiMiniBars3CenterLeft className='mobileNavToggle' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" />

<div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasExampleLabel">MyCar.com</h5>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    <div>
      Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
    </div>
  </div>
</div>
      </div>
        {/* ///////////////////mobile-navbar/////////////////// */}
     <div className="bignavbar">
     <div className='ls'><h3>MyCar.com</h3></div>
      <div className="navlinks">
        <Link className='navItems'>Home</Link>
        <Link className='navItems'>About</Link>
        <Link className='navItems'>Cars</Link>
        <Link className='navItems'>Bikes</Link>
        <Link className='LoginBtn' to='/custLogin'>Sign In</Link>
      </div>
     </div>
      </div>
        {/* //////////////nav-bar-big-screen/////////////// */}
    </div>
  )
}

export default Navbar
