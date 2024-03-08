import React, { useEffect, useState } from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import CustLogin from '../CustLogin/CustLogin';
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCircleUser } from "react-icons/fa6";
import axios from 'axios';

const Navbar = () => {

  const [name,setName]=useState('')
  const [id,setId]=useState('')
  const [custPhoto,setCustPhoto]=useState('')
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

  useEffect(()=>{
    getName()
  },[])

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
        <div><Link className='navItems'>Home</Link></div>
        <div><Link className='navItems'>About</Link></div>
        <div><Link className='navItems'>Cars</Link></div>
        <div><Link className='navItems'>Bikes</Link></div>
        <div>
          {name===''?(<Link className='LoginBtn' to='/custLogin'>Sign In</Link>):(<div className='auth'><div className='name'>{name}</div><div className='custPhoto'><img src={custPhoto} alt="" data-bs-toggle="modal" data-bs-target="#staticBackdrop" /></div></div>)}
        </div>
        {/* //////////////modal/////////////// */}
        {/* <!-- Button trigger modal --> */}
{/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button> */}

{/* <!-- Modal --> */}
<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>
         {/* //////////////modal/////////////// */}
      </div>
     </div>
      </div>
        {/* //////////////nav-bar-big-screen/////////////// */}
        {/* <Link className='LoginBtn' to='/custLogin'>Sign In</Link> */}
    </div>
  )
}

export default Navbar
