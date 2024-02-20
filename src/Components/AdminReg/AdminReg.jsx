import React, { useState } from 'react'
import './AdminReg.scss'
import Navbar from '../Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminReg = () => {
      const navigate=useNavigate()
      const [val,setVal]=useState({
        username:"",
        email:"",
        phone:"",
        password:""
      })

  const getData=(e)=>{
    setVal((pre)=>({...pre,[e.target.name]:e.target.value}))
    console.log(val);
  }

  const addAdmin=async(e)=>{
      e.preventDefault()
      const res=await axios.post("http://localhost:7000/rentelCar/addadmin",{...val})
     if(res){
      alert("Registered Successfully")
      navigate("/admin")
     }
  }

  return (
    <div className='adminRegMainDiv'>
      {/* <Navbar/> */}
      <div className="regCard">
        <h2>Admin Registration</h2>
       <div className="inputs">
           <form action="" onSubmit={addAdmin}>
           <div><input type="text" placeholder='Username' name='username' onChange={getData} /></div>
            <div><input type="text" placeholder='Email' name='email' onChange={getData}  /></div>
            <div><input type="text" placeholder='Phone Number' name='phone' onChange={getData}  /></div>
            <div><input type="text" placeholder='Password' name='password' onChange={getData}  /></div>
            <div className="btn"><button>Sign Up</button></div>
           </form>
       </div>
       <div className="gotoLogin">
        <Link className='goLogin' to='/admin'>I have an Account</Link>
       </div>

      </div>
    </div>
  )
}

export default AdminReg
