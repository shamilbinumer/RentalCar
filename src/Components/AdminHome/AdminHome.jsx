import React, { useEffect, useState } from 'react';
import './AdminHome.scss';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { TbLogout2 } from 'react-icons/tb';
import { MdError } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  const [name, setName] = useState('');
  const value = JSON.parse(localStorage.getItem('admin_token'));

  const getName = async () => {
    try {
      const res = await axios.get('http://localhost:7000/rentelCar/userAuth', {
        headers: { Authorization: `Bearer ${value}` },
      });
      setName(res.data.msg);
    } catch (error) {
      console.error('Error fetching user name:', error);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  const Logout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      localStorage.clear();
      window.location.reload()
    }
  };

  return name === '' ? (
    <div className='unauth-text'><div><MdError className='err-icon' /></div>Unauthorized Access <div><Link className='gotoLogin' to='/adminLogin'>Login</Link></div> </div>
  ) : (
    <div className="adminHomeMainDiv">
      <div className="nav-bar">
        <div>
          <FaBars className="bar-btn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" /> <span>My Car</span>
        </div>
        <div>
          <FaUserCircle className="user_icon" data-bs-toggle="modal" data-bs-target="#exampleModal" />
          <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    {name}
                  </h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <p onClick={Logout}>
                    <TbLogout2 className="logout-icon" />
                    Logout
                  </p>
                  <Link className='editPrfl'><FaRegEdit className='editPrfl-icon' />Edit Profile</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">My Car</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <p>Try scrolling the rest of the page to see this option in action.</p>
        </div>
      </div>

      <div className="body">
        <h2 className='welcomeTodashText'>Welcome to Dashbord</h2>
        <div className="basicDetails">
          <div className="basicDetailsCard">
            <h5>Customers</h5>
            <p>233</p>
          </div>
          <div className="basicDetailsCard">
          <h5>Bookings</h5>
            <p>302</p>
          </div>
        </div>
        <div className="mainBody">
          <div className="addVehicleBtnSection">
            <Link className='addVehicleBtn' to='/addCar'>Add Car</Link>
            <Link className='addVehicleBtn' to='/addBike'>Add bike</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
