import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import './IndexPage.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FaUsers } from "react-icons/fa6";
import { LuFuel } from "react-icons/lu";
import { GiGearStickPattern } from "react-icons/gi";
import { IoMdColorFill } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";

const IndexPage = () => {
  const [vehicle,setVehicle]=useState([])
  const [searchQuery, setSearchQuery] = useState('');

  const getVehicle=async()=>{
    const carRes = await axios.get(`http://localhost:7000/rentelCar/getAllVehicle/car`);
    const bikeRes = await axios.get(`http://localhost:7000/rentelCar/getAllVehicle/bike`);
    setVehicle([...carRes.data, ...bikeRes.data]);
    console.log(vehicle);
  }


  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(()=>{
    getVehicle()
  },[])

  const filteredVehicle = vehicle.filter(item =>
    item.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

 
  return (
    <div className='IndexMainDiv'>
        <Navbar/>
        <div className="hero">
            <div className="hero-left">
              <h1>Easy And Fast<div>Way To <span>Rent</span> Your</div> Car.</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit alias iure molestias quod quos soluta amet quam! Non qui distinctio.</p>
              <div className='RentCarBtnDiv'>
                <Link className='RenrCarBtn'>Rent Car</Link>
              </div>
            </div>
            <div className="hero-right">
              <img src="./bmw.png" alt="" />
            </div>
        </div>
        <div className="ul-big"></div>
        <div className="itemList">
          
          <div className="itemListHeading">
            <h1>Letest <span>Inventory</span></h1>
          </div>
          <div className="searchBar">
            <input type="search" placeholder='Search item..' value={searchQuery}
                  onChange={handleSearchInputChange}  />
          </div>
          <div className="card-main">
         {
          filteredVehicle.length===0?(
            <span className='noItemFound'>No item found</span>
          ):(
            filteredVehicle.map((dt,index)=>
          <div className="carCard" key={index}>
            {dt.isActive==false?( <Link className='cardLink'>
            <div className="image"><img src={dt.photo} alt="" /><span>In Rent</span></div>
            <div className="nameAndYear">
              <div className="name">{dt.model}</div>
              <div className="year"><span>{dt.yearOfRegistration}</span></div>
            </div>
           <div className="detailsMain">
           <div className="details">
              {/* <div className="detailsLeft"><p><FaUsers className='detailsIcon' /> {dt.seatCapacity} People</p></div> */}
              <div className="detailsLeft"><p><FaUsers className='detailsIcon' />{dt.type=='bike'?(<span>2 People</span>):(<span>{dt.seatCapacity} People</span>)}</p></div>

              <div className="detailsRight"><p><LuFuel className='detailsIcon'/> {dt.type=='bike'?(<span>Petrol</span>):(<span>{dt.fuel_type}</span>)}</p></div>
            </div>
            <div className="details">
              <div className="detailsLeft"><p><GiGearStickPattern className='detailsIcon' />{dt.type=='bike'?(<span>Manual</span>):(<span>{dt.transmision}</span>)}</p></div>
              <div className="detailsRight"><p><IoMdColorFill className='detailsIcon'/> {dt.colour}</p></div>
            </div>
           </div>
           <div className="prising">
            <div className="price">₹ {dt.rentPerDay}<span> / Day</span></div>
            <div className="btns">
              <FaRegHeart className='favIcon' />
              {/* <button>Not Available</button> */}
            </div>

           </div>
          </Link>):(<Link className='cardLink' to={`/vehicleDetails/${dt.type}/${dt._id}`}>
            <div className="image"><img src={dt.photo} alt="" /></div>
            <div className="nameAndYear">
              <div className="name">{dt.model}</div>
              <div className="year"><span>{dt.yearOfRegistration}</span></div>
            </div>
           <div className="detailsMain">
           <div className="details">
              {/* <div className="detailsLeft"><p><FaUsers className='detailsIcon' /> {dt.seatCapacity} People</p></div> */}
              <div className="detailsLeft"><p><FaUsers className='detailsIcon' />{dt.type=='bike'?(<span>2 People</span>):(<span>{dt.seatCapacity} People</span>)}</p></div>

              <div className="detailsRight"><p><LuFuel className='detailsIcon'/> {dt.type=='bike'?(<span>Petrol</span>):(<span>{dt.fuel_type}</span>)}</p></div>
            </div>
            <div className="details">
              <div className="detailsLeft"><p><GiGearStickPattern className='detailsIcon' />{dt.type=='bike'?(<span>Manual</span>):(<span>{dt.transmision}</span>)}</p></div>
              <div className="detailsRight"><p><IoMdColorFill className='detailsIcon'/> {dt.colour}</p></div>
            </div>
           </div>
           <div className="prising">
            <div className="price">₹ {dt.rentPerDay}<span> / Day</span></div>
            <div className="btns">
              <FaRegHeart className='favIcon' />
              <button>Rent Now</button>
            </div>

           </div>
          </Link>)}
          
        </div>)
          )
         }

             


          </div>
        </div>
    </div>
  )
}

export default IndexPage
