import React, { useEffect, useState } from 'react'
import './FavouratePage.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar';
import axios from 'axios';

const FavouratePage = () => {
    const navToDetails=useNavigate()
    const {id}=useParams()
    const [products,setProducts]=useState([])
   
    const FavProducts=async()=>{
        const res=await axios.get(`http://localhost:7000/rentelCar/getFavourateVehicle/${id}`)
        setProducts(res.data)
        // console.log(products[0]);
    }

    const DeleteItem=async(id)=>{
      const res=await axios.delete(`http://localhost:7000/rentelCar/deleteFavProduct/${id}`)
      if(res){
        alert("Data removed from favourates")
        FavProducts()
      }
    }

    useEffect(()=>{
        FavProducts()
    },[])
  return (
    <div className='FavouratePageMain'>
      <Navbar/>
      <div className="itemListMain">
    {
      products.length===0?(<div className='NoItemMainDiv'>
      <div className='noItems'>No Items is Favourate</div>
      <Link className='GoHome' to='/'>Go to Home</Link>
      </div>):(
        
          products.map((dt,index)=>
          <div className="OneItemCard" key={index}>
          <div className="OneCardLeft">
            <img src={dt.photo} alt="" />
          </div>
          <div className="OneCardRight">
            <h4>{dt.brand} {dt.model}</h4>
            <div className="rent">
              <table>
                <tr>
                  <th>Rent <span>/Day</span></th>
                  <td>Rs {dt.rentPerDay}</td>
                </tr>
                <tr>
                  <th>Rent <span>/Month</span></th>
                  <td>Rs {dt.rentPerMonth}</td>
                </tr>
              </table>
            </div>
            <div className="btns">
              <button onClick={()=>navToDetails(`/vehicleDetails/${dt.type}/${dt.Product_id}`)} className='view'>View Details</button>
              <button className='bookNow'>Book Now</button>
              <button className='Delete' onClick={()=>DeleteItem(dt._id)}>Remove</button>
            </div>
          </div>
        </div>)
         
      )
    }

      
      </div>
    </div>
  )
}

export default FavouratePage
