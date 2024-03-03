import React from 'react'
import './AdminHome.scss'
import { FaBars } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios'

const AdminHome = () => {
  
  return (
    <div className='adminHomeMainDiv'>
      <div className="nav-bar">
     <div><span>My Car</span> <FaBars className='bar-btn'  data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling"  /></div>
     <div>
      <FaUserCircle className='user_icon'  data-bs-toggle="modal" data-bs-target="#exampleModal"/>
      
{/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button> */}

{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>wedhejkh</p>
        <p>wedhejkh</p>
        <p>wedhejkh</p>
      </div>
    </div>
  </div>
</div>
      </div>
      </div>
      {/* <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Enable body scrolling</button> */}
      

      <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">My Car</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <p>Try scrolling the rest of the page to see this option in action.</p>
        </div>
      </div>
    </div>
  )
}

export default AdminHome
