import React, { useEffect, useState } from 'react'
import './BookingPage.scss'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

const BookingPage = () => {
    const {type,prod_id}=useParams()
    const value = JSON.parse(localStorage.getItem('cust_token'));
    const [custId,setCustId]=useState('')
    const [val,setVal]=useState({})
    const [vehicle,setVehicle]=useState({})

    const getName = async () => {
        try {
          const res = await axios.get('http://localhost:7000/rentelCar/custAuth', {
            headers: { Authorization: `Bearer ${value}` },
          });
          setCustId(res.data.id)
          console.log(custId);
        } catch (error) {
          console.error('Error fetching user name:', error);
        }
      };

      
  const getCust=async()=>{
    const res=await axios.get(`http://localhost:7000/rentelCar/getOneCust/${custId}`)
   console.log(res.data,"dhvsnhfvsdhvhfv");
   setVal(res.data)
   console.log(customer.fullName);
  }
    

    const Details=async()=>{
        const res=await axios.get(`http://localhost:7000/rentelCar/getFullBikeDetails/${type}/${prod_id}`)
        // console.log(res.data);
        setVehicle(res.data)
        console.log(vehicle);
    }
    useEffect(()=>{
        getName()
        getCust()
        Details(custId)
    },[custId])

    
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
                <h3>{vehicle.type=="car"?"BOOK YOUR CAR":"BOOK YOUR BIKE"}</h3>
               <div className="input">
                <div className="vehicleImg">
                    <img src={vehicle.photo} alt=""/>
                </div>
              <form action="">
                <div>
                  <select name="" id="" className='PickupLocation' >
                    <option value="">Select Pickup Location</option>
                    <option value="Perinthalmanna">Perinthalmanna</option>
                    <option value="Thootha">Thootha</option>
                    <option value="Melatur">Melatur</option>
                    <option value="Chemmaniyode">Chemmaniyode</option>
                  </select>
                </div>
                <div>
                    <p>*Date Booking for</p>
                    <input type="date" className='PickupForDate'/>
                </div>
              <div>
                <input type="text" placeholder='Full Name' name='fullName' value={val.fullName} />
                <input type="email" placeholder='Email' name='email' value={val.email} />
              </div>
                <div>
                    <input type="text" placeholder='Phone Number' name='phone' value={val.phone}  />
                    <input type="text" placeholder='Alternate Phone Number (Optional)' name='phone'  />
                </div>
                <p>*Upload your id proof(Adhar,Liscence like this..)</p>
                <div className='IdProofAndPayment'>
                   <div> <input type="file" className='file' placeholder='image' /></div>
                   <div> <input type="radio" className='radio' name='payment' value='Pay using upi'/>
                    <span>Pay using Upi</span></div>
                   <div> <input type="radio" className='radio' name='payment' value='Pay later'/>
                    <span>Pay later</span><br></br></div>
                </div>
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
