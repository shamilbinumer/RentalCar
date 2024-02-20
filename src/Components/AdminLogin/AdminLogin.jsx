import React from 'react'
import './AdminLogin.scss'
import { Link } from 'react-router-dom'

const AdminLogin = () => {
  return (
    <div className='adminLoginMain'>
       <div className="regCard">
        <h2>Admin Login</h2>
       <div className="inputs">
       <div><input type="text" placeholder='Username' /></div>
        <div><input type="text" placeholder='Email' /></div>
        <div className="btn"><button>Sign In</button></div>
       </div>
       <div className="gotoLogin">
        <Link className='goLogin' to='/adminRegistration'>Sign Up</Link>
       </div>

      </div>
    </div>
  )
}

export default AdminLogin
