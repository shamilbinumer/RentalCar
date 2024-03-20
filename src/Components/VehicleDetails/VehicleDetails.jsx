import React, { useEffect, useState } from 'react'
import './Vehicledetails.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { FaArrowCircleLeft } from "react-icons/fa";
import Navbar from '../Navbar/Navbar'

const VehicleDetails = () => {
  const nav=useNavigate()
    const {type,id}=useParams()
    console.log(type,id);
    const [vehicle,setVehicle]=useState({})

    const Details=async()=>{
        const res=await axios.get(`http://localhost:7000/rentelCar/getFullBikeDetails/${type}/${id}`)
        console.log(res.data);
        setVehicle(res.data)
    }
    useEffect(()=>{
        Details()
    },[])
  return (
    <div className='vehicleDetailsMain'>
      <Navbar/>
      <div className="detailsMain">
        <div className="detailsMainLeft">
          <div className="backBtn"> 
          <Link  to='/'><FaArrowCircleLeft className='Back' /></Link>
          </div>
          <div className="img">
            <img src={vehicle.photo} alt="" />
          </div>
        </div>
        <div className="detailsMainRight">
          <h3>{vehicle.type=="car"?"Car Details":"Bike Details"}</h3>
          <div className="tablee">
            <table className='table'>
              <tr>
                <td className='td'>Brand</td>
                <td className='td'>{vehicle.brand}</td>
              </tr>
              <tr>
                <td>Model</td>
                <td>{vehicle.model}</td>
              </tr>
              <tr>
                <td className='td'>Year Of Registration</td>
                <td className='td'>{vehicle.yearOfRegistration}</td>
              </tr>
              <tr>
                <td>Transmision</td>
                <td>{vehicle.type=="car"?(<>{vehicle.transmision}</>):("Manuel")}</td>
              </tr>
              <tr>
                <td className='td'>colour</td>
                <td className='td'>{vehicle.colour}</td>
              </tr>
              <tr>
                <td>Fuel Type</td>
                <td>{vehicle.type=="car"?(<>{vehicle.fuel_type}</>):("Petrol")}</td>
              </tr>
              <tr>
                <td className='td'>Seat Capacity</td>
                <td className='td'>{vehicle.type=="car"?(<>{vehicle.seatCapacity}Person</>):("2 Person")}</td>
              </tr>
              <tr>
                <td>Rent/Day</td>
                <td>Rs {vehicle.rentPerDay}</td>
              </tr>
              <tr>
                <td className='td'>Rent/Month</td>
                <td className='td'>Rs {vehicle.rentPerMonth}</td>
              </tr>
            </table>
           {vehicle.isActive==true?( <button onClick={()=>nav(`/BookingPage/${vehicle.type}/${vehicle._id}`)}>Book Now</button>):( <button className='isInRenr'>Not Available</button>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehicleDetails
