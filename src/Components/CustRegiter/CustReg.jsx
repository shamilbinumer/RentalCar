import React, { useState } from 'react'
import './CustReg.scss'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowRoundForward } from "react-icons/io";
import axios from 'axios';

const CustReg = () => {
    const nav=useNavigate()
    const [val,setVal]=useState({
        fullName:"",
        email:"",
        phone:"",
        password:"",
        image:""
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
            setVal({ ...val, image: base64Image });
            console.log(val.image);
        }
    }

    const AddCustomer = async (e) => {
        e.preventDefault();
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const { password } = val;
      
        if (!passwordRegex.test(password)) {
          alert("Password must have at least 8 characters with both letters and numbers.");
          return;
        }
      
        const res = await axios.post("http://localhost:7000/rentelCar/addcust", { ...val });
        if(res){
            alert("Successfully Registered")
            nav('/custLogin')
        }
      }
  return (
    <div className='custRegMainDiv'>
      <div className="MainCard">
        <div className="MainCardLeft">
           <div className="contents">
           <h2><div>WELCOME TO</div> MYCAR.COM</h2>
           <div className="ul"></div>
           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias ex, et possimus reprehenderit assumenda tempora, culpa eius qui alias fugit, sequi enim neque nostrum dolor? Ab tenetur magni cumque deleniti.</p>
           <div className="home">
            <Link className='homeBtn' to='/'>Back to Home</Link>
           </div>
           </div>
        </div>
        <div className="MainCardRight">
            <div className="formData">
                <h3>Sign Up</h3>
               <div className="input">
              <form action="" onSubmit={AddCustomer}>
              <div><input type="text" placeholder='Full Name' name='fullName' onChange={getData} /></div>
                <div><input type="email" placeholder='Email' name='email' onChange={getData} /></div>
                <div><input type="text" placeholder='Phone' name='phone' onChange={getData} /></div>
                <div><input type="password" placeholder='Password' name='password' onChange={getData} /></div>
                <p>*Password must have 8 cahracters,Must have letters and numbers</p>
                <div><input type="file" className='file' placeholder='image' onChange={getImage} /></div>
                <div className="sgnBtn">
                    <button>Sign Up</button>
                   <div> <Link className='goToLogin' to='/custLogin'>Login <IoIosArrowRoundForward /></Link></div>
                </div>
              </form>
               </div>




            </div>
        </div>


      </div>
    </div>
  )
}

export default CustReg
