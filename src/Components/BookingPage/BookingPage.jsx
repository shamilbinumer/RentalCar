import React, { useEffect, useState } from 'react'
import './BookingPage.scss'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

const BookingPage = () => {
    const {type,prod_id}=useParams()
    const [vehicle,setVehicle]=useState({})

    const Details=async()=>{
        const res=await axios.get(`http://localhost:7000/rentelCar/getFullBikeDetails/${type}/${prod_id}`)
        // console.log(res.data);
        setVehicle(res.data)
        console.log(vehicle);
    }
    useEffect(()=>{
        Details()
    },[])

    
  return (
    <div className='BookingPageMainDiv'>
      <Navbar/>
      <div className="MainCard">
        <div className="MainCardLeft">
           <div className="contents">
           <h2><div>BOOK</div>YOUR SLOT</h2>
           <div className="ul"></div>
           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias ex, et possimus reprehenderit assumenda tempora, culpa eius qui alias fugit, sequi enim neque nostrum dolor? Ab tenetur magni cumque deleniti.</p>
           <div className="home">
            <Link className='homeBtn' to='/'>Back to Home</Link>
           </div>
           </div>
        </div>
        <div className="MainCardRight">
            <div className="formData">
                <h3>BOOK YOUR CAR</h3>
               <div className="input">
                <div className="vehicleImg">
                    <img src={vehicle.photo} alt="" />
                </div>
              <form action="">
              <div className="dropdown">
      <div className="control">
        <div className="selected-value">
          <input
            ref={inputRef}
            type="text"
            value={getDisplayValue()}
            name="searchTerm"
            onChange={(e) => {
              setQuery(e.target.value);
              handleChange(null);
            }}
            onClick={toggle}
          />
        </div>
        <div className={`arrow ${isOpen ? "open" : ""}`}></div>
      </div>

      <div className={`options ${isOpen ? "open" : ""}`}>
        {filter(options).map((option, index) => {
          return (
            <div
              onClick={() => selectOption(option)}
              className={`option ${
                option[label] === selectedVal ? "selected" : ""
              }`}
              key={`${id}-${index}`}
            >
              {option[label]}
            </div>
          );
        })}
      </div>
    </div>
              <div><input type="text" placeholder='Full Name' name='fullName' /></div>
                <div><input type="email" placeholder='Email' name='email'  /></div>
                <div><input type="text" placeholder='Phone' name='phone'  /></div>
                <div><input type="file" className='file' placeholder='image' /></div>
                <div className="sgnBtn">
                    <button>Book Now</button>
                 
                </div>
              </form>
               </div>




            </div>
        </div>


      </div>
    </div>
  )
}

export default BookingPage
