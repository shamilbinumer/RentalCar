import React, { useEffect, useState } from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import CustLogin from '../CustLogin/CustLogin';
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCircleUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import axios from 'axios';

const Navbar = () => {

  const [name,setName]=useState('')
  const [id,setId]=useState('')
  const [custPhoto,setCustPhoto]=useState('')
  const [favProd,setFavProd]=useState([])
  const value = JSON.parse(localStorage.getItem('cust_token'));
  // http://localhost:7000/rentelCar/custAuth

 

  const getName = async () => {
    try {
      const res = await axios.get('http://localhost:7000/rentelCar/custAuth', {
        headers: { Authorization: `Bearer ${value}` },
      });
      setName(res.data.msg);
      setId(res.data.id)
      console.log(name);
      console.log(id);
    } catch (error) {
      console.error('Error fetching user name:', error);
    }
  };

  const getCust=async()=>{
    const res=await axios.get(`http://localhost:7000/rentelCar/getOneCust/${id}`)
    // console.log(res.data.image);
    setCustPhoto(res.data.image)
    console.log(custPhoto);
  }

  const logout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem('cust_token');
      window.location.href = '/custLogin';
    }
  }

  const FavProducts=async()=>{
    const res=await axios.get(`http://localhost:7000/rentelCar/getFavourateVehicle/${id}`)
    setFavProd(res.data)
}

  useEffect(()=>{
    getName()
    FavProducts(id)
  },[id])

  useEffect(() => {
    if (id) {
      getCust();
    }
  }, [id]);

  return (
    <div className='NavbarMain'>

     

      {/* //////////////nav-bar-big-screen/////////////// */}
      <div className="navBar">
         {/* ///////////////////mobile-navbar/////////////////// */}
      <div className="offCanvas">
<HiMiniBars3CenterLeft className='mobileNavToggle' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" />

<div className="offcanvas offcanvas-start" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
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
        <div><Link className='navItems' to='/'>HOME</Link></div>
        <div><Link className='navItems'>ABOUT</Link></div>
        <div><Link className='navItems'>CARS</Link></div>
        <div><Link className='navItems'>BIKES</Link></div>
        <div className='cartMain'><Link className='navItems' to={`/favouratePage/${id}`}><FaRegHeart className='cart' /></Link><div className="count">{favProd.length}</div></div>
        <div>
          {name===''?(<Link className='LoginBtn' to='/custLogin'>Sign In</Link>):(<div className='auth'><div className='custPhoto'><img src={custPhoto} alt="" /></div><button onClick={logout}>Logout</button></div>)}
        </div>
      </div>
     </div>
      </div>
        {/* //////////////nav-bar-big-screen/////////////// */}
        {/* <Link className='LoginBtn' to='/custLogin'>Sign In</Link> */}
    </div>
  )
}

export default Navbar
