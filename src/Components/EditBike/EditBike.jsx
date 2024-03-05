import React, { useEffect, useState } from 'react'
import { TbSquareRoundedArrowLeftFilled } from "react-icons/tb";
import './EditBike.scss'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditBike = () => {

  const {type,id} = useParams()
  
  const navigate=useNavigate()
  const [val,setVal]=useState({
      type:"",
      brand:"",
      model:"",
      isActive:"",
      yearOfRegistration:"",
      colour:"",
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


const editBike = async (e) => {
  e.preventDefault();
  try {
      const res = await axios.patch(`http://localhost:7000/rentelCar/editItem/${type}/${id}`, {...val});
      console.log(res.data);
      alert("Details Edited SuccessFully")
      navigate("/admin")
  } catch (error) {
      console.error("Error adding vehicle:", error);
     alert("Editing Failed,Please Try Again")
  }
};

useEffect(()=>{
  getDetailsOfVehicle()
},[])


  

  return (
    <div className='editBikeMain'>
      <div className="back_btn">
      <Link to='/admin'><TbSquareRoundedArrowLeftFilled className='backBtn' /></Link>
    </div>
    <div className="form">
      <div className="main_card">
          <h2>Edit Bike Details</h2>
          <div className="inputs">
              <form action="" onSubmit={editBike}>
                  <div>
                      <input type="text" placeholder='Brand' name='brand' onChange={getData} required value={val.brand} />
                      <input type="text" placeholder='Model Name' name='model' onChange={getData} required value={val.model}/>
                  </div>
                  <div>
                      <input type="text" placeholder='colour of Vehicle' name='colour' onChange={getData} required value={val.colour}/>
                      <input type="text" placeholder='Year of Registration' name='yearOfRegistration' onChange={getData} required value={val.yearOfRegistration}/>
                  </div>
                  <div>
                      <input type="text" placeholder='Rent / Day' name='rentPerDay' onChange={getData} required value={val.rentPerDay}/>
                      <input type="text" placeholder='Rent / Month' name='rentPerMonth' onChange={getData} required value={val.rentPerMonth}/>
                  </div>
                  <div>
                      <input type="file" placeholder='photo' onChange={getImage} className='file_input'  />
                      <div className="picture"><img src={val.photo} alt="" /></div>
                  </div>
                  <div className="submit_btn">
                      <button>SUBMIT</button>
                  </div>
              </form>
          </div>
      </div>
    </div>
    </div>
  )
}

export default EditBike
