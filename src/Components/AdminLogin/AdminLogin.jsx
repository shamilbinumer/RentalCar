import React, { useState } from 'react'
import './AdminLogin.scss'
import { Link, useNavigate } from 'react-router-dom'
import { TbSquareRoundedArrowLeftFilled } from "react-icons/tb";
import axios from 'axios'

const AdminLogin = () => {
  const navigate=useNavigate()
  const [val,setVal]=useState({
    email:"",
    password:""
  })

  const getData=(e)=>{
    setVal((pre)=>({...pre,[e.target.name]:e.target.value}))
    console.log(val);
  }

  const Login=async(e)=>{
   try {
    e.preventDefault()
    const res=await axios.post("http://localhost:7000/rentelCar/adminlogin",{...val})
    console.log(res.data);
    const data=res.data
    if(res){
      alert("Successfully Logined")
      const admin_token=data.token
      localStorage.setItem("admin_token",JSON.stringify(admin_token))
      navigate("/admin")
    }
   } catch (error) {
        alert("Email or Password does not exist")
   }
  }

  return (
    <div className='adminLoginMain'>
       <div className="back_btn">
        <Link to='/admin'><TbSquareRoundedArrowLeftFilled className='backBtn' /></Link>
      </div>
       <div className="regCard">
        <h2>Admin Login</h2>
       <div className="inputs">
      <form action="" onSubmit={Login}> 
      <div><input type="text" placeholder='Email' name='email' onChange={getData} /></div>
        <div><input type="password" placeholder='Password' name='password' onChange={getData} /></div>
        <div className="btn"><button>Sign In</button></div>
        </form>
       </div>
       <div className="gotoLogin">
        <Link className='goLogin' to='/adminRegistration'>Sign Up</Link>
       </div>

      </div>
    </div>
  )
}

export default AdminLogin
