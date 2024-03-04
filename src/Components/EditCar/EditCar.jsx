import React, { useEffect, useState } from 'react'
import './EditCar.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TbSquareRoundedArrowLeftFilled } from "react-icons/tb";

import axios from 'axios'

const EditCar = () => {
    const {type,id} = useParams()
    console.log(type,id);
    const navigate=useNavigate()
    const [val,setVal]=useState({
        type:"",
        brand:"",
        model:"",
        yearOfRegistration:"",
        colour:"",
        isActive:"",
        fuel_type:"",
        transmision:"",
        seatCapacity:"",
        rentPerDay:"",
        rentPerMonth:"",
        photo:""
    })

     ////////////////// base64 /////////////////

     function convertToBase64Banner(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
      
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
      }

        ////////////////// base64 /////////////////

    const getData=(e)=>{
        setVal((pre)=>({...pre,[e.target.name]:e.target.value}))
        console.log(val);
    }

    const getImage=async(e)=>{
        const file = e.target.files[0];
        if (file) {
            const base64Image = await convertToBase64Banner(file);
            setVal({ ...val, photo: base64Image });
            console.log(val.photo);
        }
    }

    const getDetailsOfVehicle = async () => {
        try {
          const res = await axios.get(`http://localhost:7000/rentelCar/getFullBikeDetails/${type}/${id}`);
          console.log(res.data);
          setVal(res.data); 
        } catch (error) {
          console.error('Error fetching bike details:', error);
        }
      }


    const addVehicle = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:7000/rentelCar/addvehicle", {...val,type:"car",isActive:true});
            console.log(res.data);
            alert("Car Added SuccessFully")
            navigate("/admin")
        } catch (error) {
            console.error("Error adding vehicle:", error);
           alert("Adding Failed,Please Try Again")
        }
    };

    useEffect(()=>{
        getDetailsOfVehicle()
    },[])
  return (
    <div className='editCarMainDiv'>
       <div className="back_btn">
        <Link to='/admin'><TbSquareRoundedArrowLeftFilled className='backBtn' /></Link>
      </div>
      <div className="form">
        <div className="main_card">
            <h2>Edit Car Details</h2>
            <div className="inputs">
                <form action="" onSubmit={addVehicle}>
                    <div>
                        <input type="text" placeholder='Brand' name='brand' onChange={getData} required value={val.brand} />
                        <input type="text" placeholder='Model Name' name='model' onChange={getData} required value={val.model} />
                    </div>
                    <div>
                    <input type="text" placeholder='Seat Capacity' name='seatCapacity' onChange={getData} required value={val.seatCapacity} />
                        <input type="text" placeholder='colour of Vehicle' name='colour' onChange={getData} required value={val.colour} />
                    </div>
                    <div>
                        <input type="text" placeholder='Year of Registration' name='yearOfRegistration' onChange={getData} required value={val.yearOfRegistration}/>
                        <select onChange={getData} name='transmision' required value={val.transmision} >
                            <option >Gear Transmision</option>
                            <option value="Manual">Manual</option>
                            <option value="AutoMatic">AutoMatic</option>
                        </select>
                       
                    </div>
                    <div>
                        <input type="text" placeholder='Rent / Day' name='rentPerDay' onChange={getData} required value={val.rentPerDay} />
                        <input type="text" placeholder='Rent / Month' name='rentPerMonth' onChange={getData} required value={val.rentPerMonth} />
                    </div>
                    <div>
                    <select onChange={getData} name='fuel_type' required value={val.fuel_type}>
                        <option >Fuel Type</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                        </select>
                        <input type="file" placeholder='photo' onChange={getImage} className='file_input' required/>
                        <div className="photo"><img src={val.photo} alt="" /></div>
                    </div>
                    <div className="submit_btn">
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default EditCar
