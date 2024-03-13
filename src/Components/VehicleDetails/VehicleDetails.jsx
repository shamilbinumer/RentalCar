import React, { useEffect } from 'react'
import './Vehicledetails.scss'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const VehicleDetails = () => {
    const {type,id}=useParams()
    console.log(type,id);

    const Details=async()=>{
        const res=await axios.get(`http://localhost:7000/rentelCar/getFullBikeDetails/${type}/${id}`)
        console.log(res.data);
    }
    useEffect(()=>{
        Details()
    },[])
  return (
    <div className='vehicleDetailsMain'>
      
    </div>
  )
}

export default VehicleDetails
