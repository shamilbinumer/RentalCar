import React, { useState } from 'react'
import './CustLogin.scss'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowRoundForward } from "react-icons/io";
import axios from 'axios';


const CustLogin = () => {
  const nav=useNavigate()
  const [val,setVal]=useState({
    email:"",
    password:""
  })

  const getData=(e)=>{
    setVal((pre)=>({...pre,[e.target.name]:e.target.value}))
    console.log(val);
  }

  const CustLoginDb=async(e)=>{
    e.preventDefault()
   try {
    const res=await axios.post("http://localhost:7000/rentelCar/custlogin",{...val})
    console.log(res.data);
    const data=res.data
    if(res){
      const cust_token=data.token
      localStorage.setItem("cust_token",JSON.stringify(cust_token))
      nav('/')
    }
   } catch (error) {
   alert("Email or Password does not exist.")
   }
  }
  return (
    <div className='CustLoginMain'>
       <div className="MainCard">
        <div className="MainCardLeft">
           <div className="contents">
           <h2><div>WELCOME TO</div> MYCAR.COM</h2>
           <div className="ul"></div>
           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias ex, et possimus reprehenderit assumenda tempora, culpa eius qui alias fugit, sequi enim neque nostrum dolor? Ab tenetur magni cumque deleniti.</p>
           <div className="home">
            <Link className='homeBtn' to='/'>Back to Home</Link>
           </div>
           </div>
        </div>
        <div className="MainCardRight">
            <div className="formData">
                <h3>Sign In</h3>
               <div className="input">
                <form action="" onSubmit={CustLoginDb}>
                <div><input type="email" placeholder='Email' name='email' onChange={getData} /></div>
                <div><input type="password" placeholder='Password' name='password' onChange={getData}/></div>
                <div className="sgnBtn">
                    <button>Sign In</button>
                   <div> <Link className='goToLogin' to='/custReg'>Sign Up <IoIosArrowRoundForward /></Link></div>
                </div>
                </form>
               </div>




            </div>
        </div>


      </div>
    </div>
  )
}

export default CustLogin
