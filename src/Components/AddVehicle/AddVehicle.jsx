import React, { useState } from 'react'
import './AddVehicle.scss'
import { Link } from 'react-router-dom'
import { TbSquareRoundedArrowLeftFilled } from "react-icons/tb";
import axios from 'axios';

const AddVehicle = () => {
    // let Photo=""
    const [val,setVal]=useState({
        type:"",
        brand:"",
        model:"",
        yearOfRegistration:"",
        colour:"",
        fuel_type:"",
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


    const addVehicle = async (e) => {
        e.preventDefault();
        if (Object.values(val).some(value => value === "")) {
            alert("Please enter all details");
            return;
        }
        try {
            const res = await axios.post("http://localhost:7000/rentelCar/addvehicle", {...val});
            console.log(res.data);
        } catch (error) {
            console.error("Error adding vehicle:", error);
           alert("Adding Failed,Please Try Again")
        }
    };
    

  return (
    <div className='addVehicleMain'>
      <div className="back_btn">
        <Link to='/admin'><TbSquareRoundedArrowLeftFilled className='backBtn' /></Link>
      </div>
      <div className="form">
        <div className="main_card">
            <h2>Add New Vehicle</h2>
            <div className="inputs">
                <form action="" onSubmit={addVehicle}>
                    <div>
                        <input type="text" placeholder='Vehicle Type' name='type' onChange={getData} />
                        <input type="text" placeholder='Brand' name='brand' onChange={getData} />
                    </div>
                    <div>
                        <input type="text" placeholder='Model Name' name='model' onChange={getData} />
                        <input type="text" placeholder='colour of Vehicle' name='colour' onChange={getData} />
                    </div>
                    <div>
                        <input type="text" placeholder='Year of Registration' name='yearOfRegistration' onChange={getData} />
                       <select onChange={getData} name='fuel_type'>
                        <option >Fuel Type</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                        </select>
                    </div>
                    <div>
                        <input type="text" placeholder='Rent / Day' name='rentPerDay' onChange={getData} />
                        <input type="text" placeholder='Rent / Month' name='rentPerMonth' onChange={getData} />
                    </div>
                    <div className='file-input'>
                        <input type="file" placeholder='photo' onChange={getImage} />
                    </div>
                    <div className="submit_btn">
                        <button>Add Vehicle</button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AddVehicle
