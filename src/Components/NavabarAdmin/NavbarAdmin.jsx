import React, { useEffect, useState } from 'react'
import './NavbarAdmin.scss'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars } from "react-icons/fa";
// import { FaUserCircle } from "react-icons/fa"; <FaUserCircle />
import { RiLogoutCircleLine } from "react-icons/ri";
import axios from 'axios';

const NavbarAdmin = () => {
    const navigate=useNavigate()
    const [name,setName]=useState("")
    const value = JSON.parse(localStorage.getItem('admin_token'));
    const getName=async()=>{
        const res=await axios.get("http://localhost:7000/rentelCar/userAuth",{ 
            headers: { Authorization: `Bearer ${value}` },
        })
        // console.log(res.data);
        setName(res.data.msg)
        console.log(name);
    }
   useEffect(()=>{
    getName()
   },[])

   const logout=()=>{
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
        localStorage.clear();
        navigate("/adminLogin")
    }
   }
  return (
    <div className='AdminNavbar'>
        {/* /////////mobile view navbar//////////// */}
        <div className="offCanvas">
       <div className="offcanvas-head">
        <div className='sgn-div'> {name === "" ? (<Link className='signinMobile' to='/adminLogin'>SIGN IN</Link>) : (<span><RiLogoutCircleLine onClick={logout} className='user' />{name}</span>)}</div>
       <div className="toggle-bar"><button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><FaBars className='bar' /></button></div>
       </div>

<div className="offcanvas offcanvas-start" data-bs-scroll="true"  id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">MY CARS</h5>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
       <div> <Link className='navItemsMobile'>Home</Link></div>
       <div> <Link className='navItemsMobile'>About</Link></div>
       <div> <Link className='navItemsMobile'>Cars</Link></div>
       <div> <Link className='navItemsMobile'>Bikes</Link></div>
       
        <Link className='LoginBtnMobile'>Add New Car/Bike</Link>
  </div>
</div>
        </div>

         {/* /////////mobile view navbar end//////////// */}

    <div className="navbar">
    <div className="navlinks">
        <Link className='navItems'>Home</Link>
        <Link className='navItems'>About</Link>
        <Link className='navItems'>Cars</Link>
        <Link className='navItems'>Bikes</Link>
        <Link className='LoginBtn' to='/addVehicle'>Add New Car/Bike</Link>
        {name===""?(  <Link className='LoginBtn' to='/adminLogin'>Sign In</Link>):(<span><RiLogoutCircleLine className='user' onClick={logout}/>{name}</span>)}
      
      </div>
    </div>
    </div>
  )
}

export default NavbarAdmin
