import React from 'react'
import './AdminReg.scss'
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom'

const AdminReg = () => {
  return (
    <div className='adminRegMainDiv'>
    
      <div className="regCard">
        <h2>Admin Registration</h2>
       <div className="inputs">
       <div><input type="text" placeholder='Username' /></div>
        <div><input type="text" placeholder='Email' /></div>
        <div><input type="text" placeholder='Phone Number' /></div>
        <div><input type="text" placeholder='Password' /></div>
        <div className="btn"><button>Sign Up</button></div>
       </div>
       <div className="gotoLogin">
        <Link className='goLogin' to='/adminlogin'>I have an Account</Link>
       </div>

      </div>
    </div>
  )
}

export default AdminReg
