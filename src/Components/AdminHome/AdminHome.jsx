import React, { useEffect, useState } from 'react';
import './AdminHome.scss';
import { FiChevronRight } from "react-icons/fi";
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { TbLogout2 } from 'react-icons/tb';
import { MdError } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { TbBrandAppgallery } from "react-icons/tb";
import { FaCarRear } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";
import { GiGearStickPattern } from "react-icons/gi";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { BiSolidColorFill } from "react-icons/bi";
import { GiCarSeat } from "react-icons/gi";
import { TbBrandCashapp } from "react-icons/tb";
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  // http://localhost:7000/rentelCar/getAllbike
  const [name, setName] = useState('');
  const [vehicle, setVehicle] = useState([])
  // const [car, setCar] = useState([])
  const [selectedType, setSelectedType] = useState("all");
  const [modalDetails, setModalDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
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


  const handleSelectChange = (e) => {
    setSelectedType(e.target.value);
    getAllRecods(e.target.value); 
  };

  const getAllRecods = async (selectedType) => {
    try {
      let url;
      if (selectedType === 'all') {
        console.log(selectedType);
        const carRes = await axios.get(`http://localhost:7000/rentelCar/getAllVehicle/car`);
        const bikeRes = await axios.get(`http://localhost:7000/rentelCar/getAllVehicle/bike`);
        setVehicle([...carRes.data, ...bikeRes.data]);
      } else {
        url = `http://localhost:7000/rentelCar/getAllVehicle/${selectedType}`;
        const res = await axios.get(url);
        setVehicle(res.data);
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };





  const getDetailsOfVehicle = async (type, id) => {
    try {
      const res = await axios.get(`http://localhost:7000/rentelCar/getFullBikeDetails/${type}/${id}`);
      setModalDetails(res.data); 
    } catch (error) {
      console.error('Error fetching bike details:', error);
    }
  }

  const deleteItem = async (type, id) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this item?');
      if (!confirmDelete) {
        return;
      }
      const res = await axios.delete(`http://localhost:7000/rentelCar/deleteItem/${type}/${id}`);
      console.log(res.data);
      getAllRecods(selectedType);
    } catch (error) {
      console.log(error);
    }
  }

  const changeStatus = async (type, id) => {
    try {
      const index = vehicle.findIndex(v => v._id === id);
      if (index !== -1) {
        const newStatus = !vehicle[index].isActive;
        let confirmationMessage = '';
        if (newStatus === true) {
          confirmationMessage = 'Are you sure you want to activate this vehicle?';
        } else {
          confirmationMessage = 'Are you sure you want to block this vehicle?';
        }
        const confirmChange = window.confirm(confirmationMessage);
        if (confirmChange) {
          const res = await axios.patch(`http://localhost:7000/rentelCar/editItem/${type}/${id}`, { isActive: newStatus });
          console.log(res.data);
          const updatedVehicle = [...vehicle];
          updatedVehicle[index].isActive = newStatus;
          setVehicle(updatedVehicle);
        }
      } else {
        console.log('Vehicle not found.');
      }
    } catch (error) {
      console.error('Error changing status:', error);
      alert(error.message);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };



  useEffect(() => {
    getName(); 
    getAllRecods(selectedType);
}, [selectedType]);

const filteredVehicle = vehicle.filter(item =>
  item.model.toLowerCase().includes(searchQuery.toLowerCase())
);


  return name === '' ? (
    <div className='unauth-text'><div><MdError className='err-icon' /></div>Unauthorized Access <div><Link className='gotoLogin' to='/adminLogin'>Login</Link></div> </div>
  ) : (
    <div className="adminHomeMainDiv">
      <div className="nav-bar">
        <div>
          <FaBars className="bar-btn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" /> <span>My Car</span>
        </div>
        <div>
        <button className='logUotBtn' onClick={Logout}>LOGOUT</button>
          {/* <FaUserCircle className="user_icon" data-bs-toggle="modal" data-bs-target="#exampleModal" /> */}
          
          <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
           
            {/* <div className="modal-dialog profile_modal">
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
            </div> */}
          </div>
        </div>
      </div>
      <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">My Car</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
         <div className="offCanvasNavlinks">
         <div> <Link className='offCanvasLinks'><FiChevronRight /> Dasbord</Link></div>
          <div> <Link className='offCanvasLinks'><FiChevronRight /> Category</Link></div>
          <div> <Link className='offCanvasLinks'><FiChevronRight /> Cars</Link></div>
          <div> <Link className='offCanvasLinks'><FiChevronRight /> Bikes</Link></div>
         </div>
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
            <select name="type" id="" value={selectedType}  onChange={handleSelectChange}>
              <option value="all">All</option>
              <option value="bike">Bikes</option>
              <option value="car">Cars</option>
            </select>
            {/* <Link className='addVehicleBtn' to={selectedType === 'car' ? '/addCar' : '/addBike'}>
          Add {selectedType === 'car' ? 'Car' : 'Bike'}
          </Link> */}
            <Link className='addVehicleBtn' to='/addCar'>Add Car</Link>
            <Link className='addVehicleBtn' to='/addBike'>Add bike</Link>
            <div className='searchBar'>
              <div className="serchInput">
              <i className="fa fa-search" aria-hidden="true"></i><input type="search" placeholder='Search Item'   value={searchQuery}
              onChange={handleSearchInputChange}  />
              </div>
            </div>
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
              {filteredVehicle.map((vehicle, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.type}</td>
                  <td><img src={vehicle.photo} alt="" /></td>
                  <td className='status'>{vehicle.isActive ? (<span className='active'>Active</span>) : (<span className='blocked'>Blocked</span>)}</td>
                  <td>
                    <div className="icons">
                      {/* <div> <i className="fa fa-ban" aria-hidden="true"  onClick={() => changeStatus(vehicle.type, vehicle._id)}></i></div> */}
                      <div>{vehicle.isActive==true?(<i className="fa fa-ban" aria-hidden="true"  onClick={() => changeStatus(vehicle.type, vehicle._id)}></i>):(<i className="fa fa-check" aria-hidden="true" onClick={() => changeStatus(vehicle.type, vehicle._id)}></i>)}</div>
                      <div><Link to={`/edit${vehicle.type === 'car' ? 'Car' : 'Bike'}/${vehicle.type}/${vehicle._id}`}> <i className="fa fa-edit" aria-hidden="true"></i></Link></div>
                      <div> <i className="fa fa-trash" aria-hidden="true" onClick={() => deleteItem(vehicle.type, vehicle._id)}></i></div>
                      <div>
                        <i className="fa fa-eye" aria-hidden="true" onClick={() => getDetailsOfVehicle(vehicle.type, vehicle._id)} data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>


                        {/* <!-- Modal --> */}
                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Vehicle Details</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body details-modal">
                                {modalDetails && (
                                  <div>
                                    <div className="img"><img src={modalDetails.photo} alt="" /></div>
                                    <div className="row caardsMain">
                                      <div className="col-lg-4 col-md-6 col-sm-6 detailsCard">
                                        <div>
                                          <TbBrandAppgallery className='modalIcons' />
                                          <p className="cardHeadig">Brand</p>
                                          <p>{modalDetails.brand}</p>
                                        </div>
                                      </div>
                                      <div className="col-lg-4 col-md-6 col-sm-6 detailsCard">
                                        <div>
                                          <FaCarRear className='modalIcons' />
                                          <p className="cardHeadig">Model Name</p>
                                          <p>{modalDetails.model}</p>
                                        </div>
                                      </div>
                                      <div className="col-lg-4 col-md-6 col-sm-6 detailsCard">
                                        <div>
                                          <CiCalendarDate className='modalIcons' />
                                          <p className="cardHeadig">Year of Reg</p>
                                          <p>{modalDetails.yearOfRegistration}</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row caardsMain">
                                      <div className="col-lg-4 col-md-6 col-sm-6 detailsCard">
                                        <div>
                                          <GiGearStickPattern className='modalIcons' />
                                          <p className="cardHeadig">Transmision</p>
                                          {/* <p>{modalDetails.brand}</p> */}
                                          <>
                                            {modalDetails.type === 'bike' ? <p>Manual</p> : <p>{modalDetails.transmision}</p>}
                                          </>
                                        </div>
                                      </div>
                                      <div className="col-lg-4 col-md-6 col-sm-6 detailsCard">
                                        <div>
                                          <BiSolidColorFill className='modalIcons' />
                                          <p className="cardHeadig">Colour</p>
                                          <p>{modalDetails.colour}</p>
                                        </div>
                                      </div>
                                      <div className="col-lg-4 col-md-6 col-sm-6 detailsCard">
                                        <div>
                                          <BsFillFuelPumpFill className='modalIcons' />
                                          <p className="cardHeadig">Fuel Type</p>
                                          {modalDetails.type === 'bike' ? <p>Petrol</p> : <p>{modalDetails.fuel_type}</p>}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row caardsMain">
                                      <div className="col-lg-4 col-md-6 col-sm-6 detailsCard">
                                        <div>
                                          <GiCarSeat className='modalIcons' />
                                          <p className="cardHeadig">Seat Capacity</p>
                                          {modalDetails.type === 'bike' ? <p>2 Persons</p> : <p>{modalDetails.seatCapacity} Persons</p>}
                                        </div>
                                      </div>
                                      <div className="col-lg-4 col-md-6 col-sm-6 detailsCard">
                                        <div>
                                          <TbBrandCashapp className='modalIcons' />
                                          <p className="cardHeadig">Rent / Day</p>
                                          <p>₹ {modalDetails.rentPerDay}</p>
                                          <p></p>
                                        </div>
                                      </div>
                                      <div className="col-lg-4 col-md-6 col-sm-6 detailsCard">
                                        <div>
                                          <TbBrandCashapp className='modalIcons' />
                                          <p className="cardHeadig">Rent / Month</p>
                                          <p> ₹ {modalDetails.rentPerMonth}</p>
                                          <p></p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                              {/* <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              </div> */}
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
