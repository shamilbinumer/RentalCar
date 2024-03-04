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
  // http://localhost:7000/rentelCar/getAllbike
  const [name, setName] = useState('');
  const [bike, setBike] = useState([])
  const [car, setCar] = useState([])
  const [selectedType, setSelectedType] = useState('bike');
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

  const Logout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      localStorage.clear();
      window.location.reload()
    }
  };

  const getAllBike = async () => {
    const res = await axios.get("http://localhost:7000/rentelCar/getAllbike")
    setBike(res.data)
    console.log(bike);
  }


  const getAllCar = async () => {
    const res = await axios.get("http://localhost:7000/rentelCar/getAllCar")
    setCar(res.data)
    console.log(car);
  }

  useEffect(() => {
    getName();
    getAllBike();
    getAllCar();
  }, []);

  useEffect(() => {
    // Determine the selected type based on the URL pathname
    const pathname = location.pathname;
    if (pathname === '/addBike') {
      setSelectedType('bike');
    } else if (pathname === '/addCar') {
      setSelectedType('car');
    } else {
      // Default to 'bike' if the pathname is neither '/addBike' nor '/addCar'
      setSelectedType('bike');
    }
  }, [location.pathname]);


  const handleSelectChange = (event) => {
    setSelectedType(event.target.value);
    console.log(event.target.value);
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
            <select name="" id="" value={selectedType} onChange={handleSelectChange}>
              <option value="all">All</option>
              <option value="bike">Bike</option>
              <option value="car">Car</option>
            </select>
            <Link className='addVehicleBtn' to={selectedType === 'car' ? '/addCar' : '/addBike'}>
              Add {selectedType === 'car' ? 'Car' : 'Bike'}
            </Link>
            {/* <Link className='addVehicleBtn' to='/addCar'>Add Car</Link>
            <Link className='addVehicleBtn' to='/addBike'>Add bike</Link> */}
          </div>
          <div className="tableMain">
            <table className="table table-striped" border='1'>
              <tr>
                <th className='th'>#</th>
                <th>NAME</th>
                <th>TYPE</th>
                <th>IMAGE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>

              {/* ///////////////map///////////// */}
              {(selectedType === 'all' ? [...bike, ...car] : selectedType === 'bike' ? bike : car).map((vehicle, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.type}</td>
                  <td><img src={vehicle.photo} alt="" /></td>
                  <td className='status'>{vehicle.isActive ? (<span className='active'>Active</span>) : (<span className='blocked'>Blocked</span>)}</td>
                  <td>
                    <div className="icons">
                      <div> <i className="fa fa-ban" aria-hidden="true"></i></div>
                      <div> <i className="fa fa-edit" aria-hidden="true"></i></div>
                      <div> <i className="fa fa-trash" aria-hidden="true"></i></div>
                      <div>
                        <i className="fa fa-eye" aria-hidden="true"  data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
        

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
      </div>
    </div>
  </div>
</div>
                        </div>
                    </div>
                  </td>
                </tr>
              ))}
              {/* ///////////////map///////////// */}


            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
