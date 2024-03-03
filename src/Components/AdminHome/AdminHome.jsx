import React, { useEffect, useState } from 'react';
import './AdminHome.scss';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { TbLogout2 } from 'react-icons/tb';
import { MdError } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
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
        <div> <Link className='off'>Dasbord</Link></div>
        <div> <Link>Category</Link></div>
        <div> <Link>Cars</Link></div>
        <div> <Link>Bikes</Link></div>
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
            <select name="" id="">
              <option value="">--select type--</option>
              <option value="">Bike</option>
              <option value="">Car</option>
            </select>
            <Link className='addVehicleBtn' to='/addCar'>Add Car</Link>
            <Link className='addVehicleBtn' to='/addBike'>Add bike</Link>
          </div>
          <div className="tableMain">
          <table className="table table-striped" border='1'>
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>TYPE</th>
              <th>IMAGE</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>

            {/* ///////////////map///////////// */}
            <tr>
              <td>1</td>
              <td>Innova Crysta</td>
              <td>Car</td>
              <td><img src="./car.png" alt="" /></td>
              <td className='status'>Active</td>
              <td>
                <i className="fa fa-ban" aria-hidden="true"></i>
                <i className="fa fa-edit" aria-hidden="true"></i>
                <i className="fa fa-trash" aria-hidden="true"></i>
                <i className="fa fa-eye" aria-hidden="true"></i>
              </td>
            </tr>
             {/* ///////////////map///////////// */}

            
        </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
